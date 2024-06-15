import React from 'react';
import Head from 'next/head';
import {Article} from 'Data';
import * as S from '../styles/main.style';
import {getMainPropsFromLocal} from '../srcs/props/main.local.props';

type MainProps = {
  articles: Article[];
};
function Main({
  articles,
}: MainProps) {
  return (
    <S.main>
      <Head>
        <meta name="description" content="blog article list" />
        <meta name="keyword" content={`blog, ${articles.map((article) => article.title).join(', ')}`} />
        <meta name="og:type" content="website" />
        <meta name="og:title" content="모두의 개발" />
        <meta name="og:url" content="https://blog-sage-pi.vercel.app" />
        <meta name="og:description" content="모두의 개발은 개발자의 블로그입니다." />
        <meta name="og:image" content="https://blog-sage-pi.vercel.app/logo.png" />
      </Head>
    </S.main>
  );
}
export async function getServerSideProps() {
  return getMainPropsFromLocal();
}

export default Main;
