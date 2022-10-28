import React from 'react';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { Chip } from '@seolim/react-ui/chips';
import { Avatar, Button } from '@seolim/react-ui';
import { useRouter } from 'next/router';
import { Article as tArticle, User } from 'Data';
import Image from 'next/image';
import { useLayout } from '@seolim/react-ui/layout';
import { Markdown } from '../../srcs';
import * as S from '../../styles/article.style';

const date2string = (datestring: string) => {
  const date = new Date(datestring);

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};
type ArticleProps = {
  article: tArticle;
  content: string;
  user: User;
  login: string;
  date: string;
};
function Article({
  article, content, user, login, date,
}: ArticleProps) {
  useLayout(true, true);
  const router = useRouter();

  return (
    <S.main>
      <Head>
        <meta name="description" content={content.substring(0, 20)} />
        <meta name="keyword" content={article.tag.map((t) => t.name).join(', ')} />
        <meta name="og:type" content="article" />
        <meta name="og:title" content={article.title} />
        <meta name="og:url" content={`https://blog-seolim.vercel.app/article/${article.id}`} />
        <meta name="og:image" content={article.src} />
        <meta name="og:description" content={`${content.substring(0, 30)}...`} />
      </Head>
      <S.Content>
        <S.wrapper>
          <S.userBox>
            <Avatar
              src={user.src}
              alt=""
              color="rgba(0,0,0,0)"
            />
            <S.box>
              <S.p>{article.user_id}</S.p>
              <S.p>{date}</S.p>
            </S.box>
          </S.userBox>
          {login === article.user_id
            ? (
              <Button
                design="outline"
                corner="round"
                onClick={() => router.push(`/post?article_id=${article.id}`)}
              >
                수정하기
              </Button>
            ) : null}
        </S.wrapper>
      </S.Content>
      <br />
      <S.title>{article.title}</S.title>
      <S.Content>
        <S.chips>
          {article.tag.map(({ name, color }) => (
            <Chip key={name} color={color}>{name}</Chip>
          ))}
        </S.chips>
      </S.Content>
      <br />
      <S.Content>
        <Image src={article.src} alt="" width="100%" height="100%" layout="responsive" objectFit="contain" />
      </S.Content>
      <br />
      <S.Content>
        <Markdown mdString={content} renderBookmark />
      </S.Content>
    </S.main>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const login = context.req.cookies.seolim_blog_user || '';
  const { pid } = context.query;
  try {
    const { article, content, user } = await fetch(`${process.env.BASEURL}/api/article?article_id=${pid}`).then((res) => res.json());

    const date = date2string(article.update_date);

    return ({
      props: {
        article, content, user, login, date,
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

export default Article;
