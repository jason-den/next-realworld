import Head from 'next/head';
import Link from 'next/link';

import styles from 'styles/Login.module.css';
import { RegisterForm } from '../components/user/RegisterForm';

export default function Page() {
  return (
    <>
      <Head>
        <title>Register | Next Realworld</title>
        <meta name="description" content="Welcome!" />
      </Head>
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-center">
              <Link href="/register" as="/register">
                <a className={styles.link}>Have an account?</a>
              </Link>
            </p>
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
}
