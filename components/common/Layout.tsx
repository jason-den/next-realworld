import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div style={{ paddingBottom: '40px' }}>
    <Navbar />
    {children}
    <Footer />
  </div>
);

export default Layout;
