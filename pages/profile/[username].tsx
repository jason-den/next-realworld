/*
Profile page (URL: /#/profile/:username)
- Show basic user info
- List of articles populated from user's created articles 

// improvement: better UX on handle error
*/

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';

import { API } from 'lib/api';
import { storage } from 'lib/utils/storage';
import { checkLogin } from 'lib/utils/checkLogin';
import { DEFAULT_AVATAR_URL } from 'lib/utils/constants';

import { Profile, Article } from 'types';

type ProfileFeedType = 'user' | 'favorited';

export default function Page() {
  const router = useRouter();
  const username = router.query['username'];

  const { data } = useSWR('user', storage);
  const isLoggedIn = checkLogin(data);

  const [profile, setProfile] = useState<Profile | undefined>(undefined);

  const fetchProfile = () => {
    if (typeof username != 'string' || username.length == 0) return;
    API.getProfile(username).then(({ profile, errors, status, data }) => {
      console.log({ profile, errors, status, data });
      if (status == 200) setProfile(profile);
      else console.log({ errors, status, data });
    });
  };
  useEffect(fetchProfile, [username]);

  // follow / unfollow
  const [loadingFollow, setLoadingFollow] = useState<boolean>(false);

  const onFollowUnfollowButtonClicked = async () => {
    if (profile == undefined) return;

    // 0. if not login, pop for login
    if (!isLoggedIn) alert('please login to follow author');
    // 1. toggle follow status
    const toggleFollowStatus = profile?.following ? API.unfollowUser : API.followUser;
    setLoadingFollow(true);
    const response = await toggleFollowStatus(profile.username);
    if (response.profile) setProfile(response.profile);
    if (response.errors) console.log(response.errors);
    setLoadingFollow(false);
  };

  // feed
  const [feedType, setFeedType] = useState<ProfileFeedType>('user');
  const [articles, setArticles] = useState<Article[]>([]);
  const fetchArticles = () => {
    if (typeof username != 'string' || username.length == 0) return;

    const params = {
      limit: 5,
      offset: 0,
      author: feedType == 'user' ? username : undefined,
      favorited: feedType == 'favorited' ? username : undefined,
    };

    API.getArticles(params).then(({ articleCollection, errors, status, data }) => {
      if (status == 200 && articleCollection) setArticles(articleCollection.articles);
      else console.log({ msg: 'API.getArticles error', errors, status, data });
    });
  };
  useEffect(fetchArticles, [username, feedType]);

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={profile?.image ?? DEFAULT_AVATAR_URL} className="user-img" />
              <h4>{profile?.username ?? 'user'}</h4>
              <p>{profile?.bio ?? ''} </p>

              <button
                disabled={loadingFollow}
                onClick={onFollowUnfollowButtonClicked}
                className="btn btn-sm btn-outline-secondary action-btn"
              >
                <i className="ion-plus-round"></i>
                &nbsp; {profile?.following ? 'Unfollow' : 'Follow'} {profile?.username ?? 'user'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a
                    onClick={() => setFeedType('user')}
                    children="My Articles"
                    className={'nav-link ' + (feedType == 'user' && 'active')}
                  />
                </li>
                <li className="nav-item">
                  <a
                    onClick={() => setFeedType('favorited')}
                    children="Favorited Articles"
                    className={'nav-link ' + (feedType == 'favorited' && 'active')}
                  />
                </li>
              </ul>
            </div>

            {articles.map((article, idx) => (
              <div key={idx} className="article-preview">
                <div className="article-meta">
                  <Link href={`/profile/${article.author.username}`} passHref>
                    <a>
                      <img src={article.author.image ?? DEFAULT_AVATAR_URL} />
                    </a>
                  </Link>
                  <div className="info">
                    <Link href={`/profile/${article.author.username}`} passHref>
                      <a className="author">{article.author.username}</a>
                    </Link>
                    <span className="date">January 20th</span>
                  </div>
                  <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> {article.favoritesCount}
                  </button>
                </div>
                <Link href={`/article/${article.slug}`} passHref>
                  <a className="preview-link">
                    <h1>{article.title}</h1>
                    <p>{article.description}</p>
                    <span>Read more...</span>
                  </a>
                </Link>
              </div>
            ))}
            {articles.length == 0 && (
              <div className="article-preview" ng-show="!$ctrl.loading &amp;&amp; !$ctrl.list.length">
                No articles are here... yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
