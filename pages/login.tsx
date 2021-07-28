import Head from 'next/head';
import Link from 'next/link';
import styles from 'styles/Login.module.css';
import { SignInForm } from '../components/user/SignInForm';

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
