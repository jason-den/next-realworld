import Router from 'next/router';
import { Auth } from 'lib/api';
import { useState } from 'react';

export function RegisterForm() {
  // TODO: disable button during loading
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = async () => {
    const { user, errors } = await Auth.signup(userName, email, password);
    if (errors) {
      console.log(errors);
    } else {
      console.log('successfully registered', { user });
      Router.push('/');
    }
  };

  return (
    <>
      <div className="form-group">
        <input
          className="form-control form-control-lg"
          name="username"
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          className="form-control form-control-lg"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          className="form-control form-control-lg"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="my-2 btn btn-lg btn-primary pull-xs-right" onClick={(e) => onSubmit()}>
        Register
      </button>
    </>
  );
}
