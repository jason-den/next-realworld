/*
Sign in/Sign up pages (URL: /#/login, /#/register )

- Uses JWT (store the token in localStorage)
- Authentication can be easily switched to session/cookie based
*/
import Router from 'next/router';
import { Auth } from 'lib/api';
import { useState } from 'react';
import { trigger } from 'swr';

export default function Page() {
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
    <div>
      <label>
        username
        <input name="username" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
      </label>
      <label>
        Email
        <input name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password
        <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={(e) => onSubmit()}>Register</button>
    </div>
  );
}
