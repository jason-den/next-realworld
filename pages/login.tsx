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
  return (
    <>
      <Head>
        <title>Login | Next Realworld</title>
        <meta name="description" content="Welcome back" />
      </Head>
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link href="/register" as="/register">
                <a className={styles.link}>Need an account?</a>
              </Link>
            </p>
            <SignInForm />
          </div>
        </div>
      </div>
    </>
  );
}
function SignInForm() {
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
        Sign in
      </button>
    </>
  );
}
