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

export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = async () => {
    const { user, status, error } = await Auth.login(email, password);
    if (error) {
      alert(error);
    } else {
      Router.push('/');
    }
  };

  return (
    <>
      <Head>
        <title>Login | Next Realworld</title>
        <meta name="description" content="Welcome back" />
      </Head>
      <div className="container page">
        <h1 className="text-xs-center">Sign in</h1>
        <div className="w-100 text-center">
          <Link href="/register" as="/register">
            <a className={styles.link}>Need an account?</a>
          </Link>
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
        <div className={styles.item}>
          <button className="my-2 btn btn-lg btn-primary pull-xs-right" onClick={(e) => onSubmit()}>
            Sign in
          </button>
        </div>
      </div>
    </>
  );
}
