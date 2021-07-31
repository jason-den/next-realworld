import React from 'react';
export const Maybe = ({ test, children }: { test: boolean; children: JSX.Element | JSX.Element[] }) => (
  <>{test && children}</>
);
