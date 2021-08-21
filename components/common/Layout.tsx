import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

export default Layout;
