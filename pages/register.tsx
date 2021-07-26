/*
Sign in/Sign up pages (URL: /#/login, /#/register )

- Uses JWT (store the token in localStorage)
- Authentication can be easily switched to session/cookie based
*/
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { Auth } from 'lib/api';
import { useState } from 'react';

import styles from 'styles/Login.module.css';

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
    <>
      <Head>
        <title>Register | Next Realworld</title>
        <meta name="description" content="Welcome!" />
      </Head>
      <div className="container page">
        <h1 className="text-xs-center">Sign up</h1>
        <div className="w-100 text-center">
          <Link href="/register" as="/register">
            <a className={styles.link}>Have an account?</a>
          </Link>
        </div>

        <div className="mt-2 mt-lg-2">
          <input
            className="form-control form-control-lg"
            name="username"
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mt-2 mt-lg-2">
          <input
            className="form-control form-control-lg"
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-2 mt-lg-2">
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
      </div>
    </>
  );
}
