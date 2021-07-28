import React, { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import useSWR, { mutate, trigger } from 'swr';

export default function Page() {
  const logout = async () => {
    window.localStorage.removeItem('user');
    mutate('user', null);
    Router.push(`/`).then(() => trigger('user'));
  };

  return (
    <>
      <Head>
        <title>Settings | Next Realworld</title>
        <meta name="description" content="Settings" />
      </Head>
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-center">Your Settings</h1>
            <SettingsForm />
            <hr />
            <button className="btn btn-outline-danger" onClick={logout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

type UserInfo = {
  avatarURL: string;
  username: string;
  bio: string;
  email: string;
  password?: string;
};
function SettingsForm() {
  const [userInfo, setUserInfo] = React.useState<UserInfo>({
    avatarURL: '',
    username: '',
    bio: '',
    email: '',
    password: ''
  });
  const updateUserInfo = (field: string, newValue: string) => setUserInfo({ ...userInfo, [field]: newValue });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const user = { ...userInfo };
    if (!user.password) {
      delete user.password;
    }
    // 1 TODO call UserAPI.update
    // 2 handle error
    // 3 set new state
    setLoading(false);
  };

  return (
    <>
      <div className="form-group">
        <input
          className="form-control form-control-lg"
          name="avatarURL"
          type="url"
          placeholder="URL of profile picture"
          value={userInfo.avatarURL}
          onChange={(e) => updateUserInfo('avatarURL', e.target.value)}
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
        <textarea
          className="form-control form-control-lg"
          rows={8}
          placeholder="Short bio about you"
          value={userInfo.bio}
          onChange={(e) => updateUserInfo('bio', e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          className="form-control form-control-lg"
          name="password"
          type="password"
          placeholder="New Password"
          value={userInfo.password}
          onChange={(e) => updateUserInfo('password', e.target.value)}
        />
      </div>
      <button className="btn btn-primary btn-lg ml-auto d-block mr-0" onClick={onSubmit} disabled={loading}>
        Update Settings
      </button>
    </>
  );
}
