import Router from 'next/router';
import React from 'react';
import useSWR, { mutate, trigger } from 'swr';

export default function Page() {
  const logout = async () => {
    window.localStorage.removeItem('user');
    mutate('user', null);
    Router.push(`/`).then(() => trigger('user'));
  };

  return (
    <div>
      This is Settings page
      <button onClick={logout}>log out</button>
    </div>
  );
}
