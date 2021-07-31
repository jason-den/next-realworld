import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { Maybe } from 'components/common/Maybe';
import { NavLink } from './NavLink';

import { storage } from 'lib/utils/storage';
import Link from 'next/link';
import { checkLogin } from 'lib/utils/checkLogin';

const NavbarContainer = styled.nav`
  position: relative;
  padding: 0.5rem 1rem;
  &::after {
    content: '';
    display: table;
    clear: both;
  }

  @media (min-width: 544px) {
    border-radius: 0.25rem;
  }
`;
const NavbarPresenter = styled('div')`
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;

  @media (min-width: 544px) {
    max-width: 576px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 940px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

const Logo = styled.a`
  float: left;
  font-family: titillium web, sans-serif !important;
  font-size: 1.5rem !important;
  margin-right: 2rem !important;
  padding-top: 0 !important;
  padding-bottom: 0.25rem;
  color: #5cb85c !important;
  text-decoration: none !important;
`;

const NavbarList = styled.ul`
  float: right !important;
  list-style: none;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
`;

const NavbarItem = styled.li`
  float: left;
  & + & {
    margin-left: 1rem;
  }
`;

export const Navbar = () => {
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);

  return (
    <NavbarContainer>
      <NavbarPresenter>
        <Link href="/" children={<Logo href="/" children={'conduit'} />} />

        <NavbarList>
          <NavbarItem>
            <NavLink href="/" as="/" children="Home" />
          </NavbarItem>
          <Maybe test={isLoggedIn}>
            <NavbarItem>
              <NavLink href="/editor/new" as="/editor/new">
                <i className="ion-compose" />
                &nbsp;New Article
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink href="/settings" as="/settings">
                <i className="ion-gear-a" />
                &nbsp;Settings
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink href={`/profile/${currentUser?.username}`} as={`/profile/${currentUser?.username}`}>
                {currentUser?.username}
              </NavLink>
            </NavbarItem>
          </Maybe>
          <Maybe test={!isLoggedIn}>
            <NavbarItem>
              <NavLink href="/login" as="/login" children="Sign in" />
            </NavbarItem>
            <NavbarItem>
              <NavLink href="/register" as="/register" children="Sign up" />
            </NavbarItem>
          </Maybe>
        </NavbarList>
      </NavbarPresenter>
    </NavbarContainer>
  );
};
