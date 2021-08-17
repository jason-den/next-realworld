import React from 'react';
import useSWR from 'swr';
import { Maybe } from 'components/common/Maybe';
import styles from 'styles/Home.module.css';
import { storage } from 'lib/utils/storage';
import Link from 'next/link';
import { checkLogin } from 'lib/utils/checkLogin';
import { useRouter } from 'next/router';
import { NavItem } from './NavItem';

export const Navbar = () => {
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/" children="conduit" />
        <ul className="nav navbar-nav pull-xs-right">
          <NavItem href="/" text="Home" />
          <Maybe test={isLoggedIn}>
            <NavItem href="" icon={<i className="ion-compose" />} text="New Post" />
            <NavItem href="/settings" icon={<i className="ion-gear-a" />} text="Settings" />
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
