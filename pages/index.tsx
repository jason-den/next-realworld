/*
Home page (URL: /#/ )

- List of tags
- List of articles pulled from either Feed, Global, or by Tag
- Pagination for list of articles
*/

import Head from 'next/head';
import { storage } from 'lib/utils/storage';
import useSWR, { trigger } from 'swr';
import { Banner } from 'components/home/Banner';
import { checkLogin } from 'lib/utils/checkLogin';

import { Feed } from 'components/home/Feed';

export default function Home() {
  const { data: user } = useSWR('user', storage);
  const isLogin = checkLogin(user);

  // TODO: get tags from server

  const head = (
    <Head>
      <title>Next Realworld</title>
      <meta name="description" content="Welcome!" />
    </Head>
  );

  return (
    <div className="">
      {head}
      {!isLogin && <Banner />}
      <div className="container page">
        <Feed />
      </div>
    </div>
  );
}
