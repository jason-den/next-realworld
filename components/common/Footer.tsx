import React from 'react';
import Link from 'next/link';
// TODO: issue - footer covers some content
export const Footer = () => (
  <footer>
    <div className="container">
      <Link href="/" passHref>
        <a className="logo-font" children="conduit" />
      </Link>
      <span className="attribution">
        An interactive learning project from <a>Thinkster</a>. Code &amp; design licensed under MIT.
      </span>
    </div>
  </footer>
);
