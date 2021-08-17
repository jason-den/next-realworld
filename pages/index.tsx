/*
Home page (URL: /#/ )

- List of tags
- List of articles pulled from either Feed, Global, or by Tag
- Pagination for list of articles
*/

import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { storage } from 'lib/utils/storage';
import useSWR, { trigger } from 'swr';
import { Banner } from 'components/home/Banner';
import { checkLogin } from 'lib/utils/checkLogin';

export default function Home() {
  const urls = [
    'login',
    'register',
    'settings',
    'profile/aDummyUserName',
    'profile/aDummyUserName/favorites',
    'article/aDummyArticleSlug'
  ];
  const { data: user } = useSWR('user', storage);
  const isLogin = checkLogin(user);

  return (
    <div className={styles.container}>
      <Head>
        <title>Register | Next Realworld</title>
        <meta name="description" content="Welcome!" />
      </Head>
      {isLogin ? 'user already login' : <Banner />}
      <hr />
      {urls.map((url, idx) => (
        <Link href={`/${url}`} key={idx}>
          {url}
        </Link>
      ))}
    </div>
  );
}
