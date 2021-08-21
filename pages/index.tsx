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
import { TagsView } from '../components/home/TagsView';
import { Feed } from 'components/home/Feed';
import { Pagination } from 'components/home/Pagination';

export default function Home() {
  const { data: user } = useSWR('user', storage);
  const isLogin = checkLogin(user);

  // TODO: get tags from server
  let tags = ['programming', 'javascript', 'emberjs', 'angularjs', 'react', 'mean', 'node', 'rails'];

  return (
    <div className="">
      <Head>
        <title>Next Realworld</title>
        <meta name="description" content="Welcome!" />
      </Head>
      {!isLogin && <Banner />}
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <Feed />
            <Pagination />
          </div>
          <div className="col-md-3">
            <TagsView tags={tags} />
          </div>
        </div>
      </div>
    </div>
  );
}
