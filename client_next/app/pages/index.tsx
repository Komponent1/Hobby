import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { AutoChipsInput, useFormControl } from '@seolim/react-ui/form';
import { Grid } from '@seolim/react-ui';
import { useLayout } from '@seolim/react-ui/layout';
import { Article, Tag } from 'Data';
import * as S from '../styles/main.style';
import { ArticleCard } from '../srcs';

type MainProps = {
  tags: Tag[];
  articles: Article[];
};
function Main({
  articles,
  tags,
}: MainProps) {
  useLayout(true, true);
  const control = useFormControl<string[], HTMLInputElement>({
    initValue: [],
  });
  const [filterArticle, setFilterArticle] = useState<any[]>(articles);

  useEffect(() => {
    if (!control.value) return;
    const changes = control.value.length !== 0
      ? articles.filter(
        (article) => {
          const item = article.tag.filter(
            (tag) => (control.value as string[]).includes(tag.name),
          );
          return item.length !== 0;
        },
      ) : articles;
    setFilterArticle(changes);
  }, [control.value, articles]);

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
      <AutoChipsInput
        design="underline"
        control={control}
        controlValue={tags.map((tag: any) => tag.name)}
        placeholder="태그로 검색해주세요"
      />
      <Grid
        breakPoint={[1024, 768, 512]}
        columns={3}
        gap={30}
        style={{ marginTop: '30px' }}
      >
        {filterArticle.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </Grid>
    </S.main>
  );
}
/**
 * 최초 데이터 가져오기
 * 1. 모든 게시글 파일 가져오기
 */
export async function getServerSideProps() {
  try {
    const { articles } = await fetch(`${process.env.BASEURL}/api/articles`).then((res) => res.json()) as { articles: Article[] };
    const { tags } = await fetch(`${process.env.BASEURL}/api/tags`).then((res) => res.json());
    articles.sort(
      (a, b) => (
        new Date(b.publish_date).getTime()
        - new Date(a.publish_date).getTime()
      ),
    );

    return ({
      props: {
        articles, tags,
      },
    });
  } catch (err) {
    return ({
      redirect: {
        destination: '/error',
        permanent: false,
      },
    });
  }
}

export default Main;
