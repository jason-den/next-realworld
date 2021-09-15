/*
Profile page (URL: /#/profile/:username)
- Show basic user info
- List of articles populated from user's created articles 

// improvement: better UX on handle error
*/

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { API } from 'lib/api';
import { storage } from 'lib/utils/storage';
import { checkLogin } from 'lib/utils/checkLogin';
import { Maybe } from 'components/common/Maybe';
import { Profile } from 'types';

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
  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                src={profile?.image ?? 'https://static.productionready.io/images/smiley-cyrus.jpg'}
                className="user-img"
              />
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
    </div>
  );
}
