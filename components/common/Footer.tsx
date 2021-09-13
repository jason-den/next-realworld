import React from 'react';
import Link from 'next/link';
export const Footer = () => (
  <footer>
    <div className="container">
      <Link href="/" passHref>
        <a className="logo-font" children="conduit" />
      </Link>
      <span className="attribution">
        An interactive learning project from <a>Thinkster</a>. Code &amp; design licensed under MIT. Check out the{' '}
        <a href="https://github.com/jason-den/next-realworld">implementation with Next.js and TypeScript</a> .
      </span>
    </div>
  </footer>
);
