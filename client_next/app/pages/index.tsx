import React from 'react';
import Head from 'next/head';
import {Article} from 'Data';
import {getMainPropsFromLocal} from '../srcs/pages/main/main.local.props';
import MainPage from '../srcs/pages/main/main.page';

type MainProps = {
  articles: Article[];
};
function Main({
  articles,
}: MainProps) {
  return (
    <div>
      <Head>
        <meta name="description" content="blog article list" />
        <meta name="keyword" content={`blog, ${articles.map((article) => article.title).join(', ')}`} />
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
