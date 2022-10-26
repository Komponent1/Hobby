/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { GetServerSidePropsContext } from 'next';

function Redirect() {
  return (<div />);
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const code = context.query.code as string;
  const { access_token } = await fetch('https://github.com/login/oauth/access_token', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GIT_CLIENT,
      client_secret: process.env.GIT_SECRET,
      code,
    }),
  }).then((res) => res.json());
  const { login, avatar_url, html_url } = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/vnd.github+json',
    },
  }).then((res) => res.json());

  try {
    await fetch(`${process.env.BASEURL}/sign/git`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ login, avatar_url, html_url }),
    }).then((res) => {
      const setCookie = (res.headers.get('set-cookie') as string).split('GMT, ').map((s) => `${s} GMT`);
      context.res.setHeader('set-cookie', setCookie);
    });

    return ({
      redirect: {
        destination: '/',
        permanent: false,
      },
    });
  } catch (err) {
    return ({
      redirect: '/error',
      permanent: false,
    });
  }
}

export default Redirect;
