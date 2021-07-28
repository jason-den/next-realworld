import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import useSWR, { mutate, trigger } from 'swr';
import { SettingsForm } from '../components/user/SettingsForm';


export default function Page() {
  const logout = async () => {
    window.localStorage.removeItem('user');
    mutate('user', null);
    Router.push(`/`).then(() => trigger('user'));
  };

  return (
    <>
      <Head>
        <title>Settings | Next Realworld</title>
        <meta name="description" content="Settings" />
      </Head>
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-center">Your Settings</h1>
            <SettingsForm />
            <hr />
            <button className="btn btn-outline-danger" onClick={logout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
