import React from 'react';
import Link from 'next/link';
export const Footer = () => (
  <footer style={{ position: 'relative' }}>
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
