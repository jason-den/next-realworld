import React from 'react';
import styles from 'styles/Home.module.css';
export const Banner = () => (
  <div className={'w-full text-center ' + styles.banner}>
    <h1 className="font-bold text-white mb-2" style={{ fontSize: '3.5rem' }}>
      conduit
    </h1>
    <p className="text-2xl font-light text-white">A place to share your knowledge.</p>
  </div>
);
