import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { UserInfo } from 'types';
import { Auth } from 'lib/api';
import { ErrorsList } from 'components/common/ErrorsList';
import { Errors } from 'types';

export function SettingsForm() {
  const [userInfo, setUserInfo] = React.useState<UserInfo>({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: ''
  });
  const updateUserInfo = (field: string, newValue: string) => setUserInfo({ ...userInfo, [field]: newValue });
  useEffect(() => {
    const user: any = JSON.parse(window.localStorage.getItem('user') as string);
    if (!user || Object.keys(user).length === 0) return;
    setUserInfo({ ...userInfo, ...user });
  }, []);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = React.useState<Errors>({});

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const user = { ...userInfo };
    if (!user.password) delete user.password;

    const { errors, status } = await Auth.save(user);
    if (status != 200) {
      setErrors(errors);
    } else {
      Router.push(`/`);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="form-group">
        <ErrorsList errors={errors} />
        <input
          className="form-control form-control-lg"
          name="image"
          type="url"
          placeholder="URL of profile picture"
          value={userInfo.image || ''}
          onChange={(e) => updateUserInfo('image', e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          className="form-control form-control-lg"
          name="username"
          type="text"
          placeholder="Username"
          value={userInfo.username}
          onChange={(e) => updateUserInfo('username', e.target.value)}
        />
      </div>
      <div className="form-group">
        <textarea
          className="form-control form-control-lg"
          rows={8}
          placeholder="Short bio about you"
          value={userInfo.bio || ''}
          onChange={(e) => updateUserInfo('bio', e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          className="form-control form-control-lg"
          name="email"
          type="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={(e) => updateUserInfo('email', e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          className="form-control form-control-lg"
          name="password"
          type="password"
          placeholder="New Password"
          value={userInfo.password || ''}
          onChange={(e) => updateUserInfo('password', e.target.value)}
        />
      </div>
      <button className="btn btn-primary btn-lg ml-auto d-block mr-0" onClick={onSubmit} disabled={loading}>
        Update Settings
      </button>
    </>
  );
}
