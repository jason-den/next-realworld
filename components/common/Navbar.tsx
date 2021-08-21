import React from 'react';
import useSWR from 'swr';
import { Maybe } from 'components/common/Maybe';
import { storage } from 'lib/utils/storage';
import { checkLogin } from 'lib/utils/checkLogin';
import { NavItem } from './NavItem';
import { UserInfo } from 'types';

export const Navbar = () => {
  const { data } = useSWR('user', storage);
  const currentUser: UserInfo = data;
  const isLoggedIn = checkLogin(currentUser);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/" children="conduit" />
        <ul className="nav navbar-nav pull-xs-right">
          <NavItem href="/" text="Home" />
          <Maybe test={isLoggedIn}>
            <NavItem href="" icon={<i className="ion-compose" />} text="New Article" />
            <NavItem href="/settings" icon={<i className="ion-gear-a" />} text="Settings" />
            <NavItem href={`/profile/${encodeURIComponent(currentUser?.username)}`} text={currentUser?.username} />
          </Maybe>
          <Maybe test={!isLoggedIn}>
            <NavItem href="/login" text="Sign in" />
            <NavItem href="/register" text="Sign up" />
          </Maybe>
        </ul>
      </div>
    </nav>
  );
};
