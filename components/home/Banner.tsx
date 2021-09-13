import React from 'react';
import styles from 'styles/Home.module.css';
//TODO: remove tailwind css
export const Banner = () => (
  <div className={`banner ${styles.banner}`}>
    <div className={`container ${styles.container}`}>
      <h1 className="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>
);
