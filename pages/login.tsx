/*
Sign in/Sign up pages (URL: /#/login, /#/register )

- Uses JWT (store the token in localStorage)
- Authentication can be easily switched to session/cookie based
*/
import Router from 'next/router';
import { Auth } from 'lib/api';
import { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = async () => {
    console.log('sign in clicked');
    const { user, status, error } = await Auth.login(email, password);
    if (error) {
      alert(error);
    } else {
      Router.push('/');
    }
  };

  return (
    <div>
      <label>
        Email
        <input name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password
        <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={(e) => onSubmit()}>Sign in</button>
    </div>
  );
}
