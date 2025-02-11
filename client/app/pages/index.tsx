import React from 'react';
import Head from 'next/head';
import {getMainPropsFromLocal} from '../srcs/main/main.local.props';
import MainPage from '../srcs/main/main.page';

function Main() {
  return (
    <div>
      <Head>
        <meta name="description" content="blog article list" />
        <meta name="og:type" content="website" />
        <meta name="og:title" content="모두의 개발" />
        <meta name="og:url" content="https://blog-sage-pi.vercel.app" />
        <meta name="og:description" content="모두의 개발은 개발자의 블로그입니다." />
        <meta name="og:image" content="https://blog-sage-pi.vercel.app/logo.png" />
      </Head>
      <MainPage />
    </div>
  );
}
export async function getServerSideProps() {
  return getMainPropsFromLocal();
}

export default Main;
