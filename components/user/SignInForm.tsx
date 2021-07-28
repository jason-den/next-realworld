import Router from 'next/router';
import { Auth } from 'lib/api';
import { useState } from 'react';

export function SignInForm() {
  // TODO: disable button during loading 
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = async () => {
    const { error } = await Auth.login(email, password);
    if (error) {
      alert(error);
    } else {
      Router.push('/');
    }
  };

  return (
    <>
      <div className="form-group">
        <input
          className="form-control form-control-lg"
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <input
          className="form-control form-control-lg"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button className="my-2 btn btn-lg btn-primary pull-xs-right" onClick={(e) => onSubmit()}>
        Sign in
      </button>
    </>
  );
}
