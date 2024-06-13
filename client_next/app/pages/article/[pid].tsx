import React from 'react';
import Head from 'next/head';
import { Chip } from '@seolim/react-ui/chips';
import { Avatar, Button } from '@seolim/react-ui';
import { useRouter } from 'next/router';
import { Article as tArticle, User } from 'Data';
import Image from 'next/image';
import { useModal } from '@seolim/react-ui/modal';
import { useLayout } from '@seolim/react-ui/layout';
import { Markdown, Comment } from '../../srcs/components';
import * as S from '../../styles/article.style';
import { useArticle } from '../../srcs/hook';
import {getArticlePropsFromLocal} from '../../srcs/props/article.local.props';

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
  const { del } = useArticle();
  const { openModal } = useModal('정말로 삭제하시겠습니까?', {
    header: '경고!',
    onAction: () => del(article.id),
  });

  return (
    <S.main>
      <Head>
        <title>{article.title}</title>
        <meta name="description" content={content.substring(0, 20)} />
        <meta name="keyword" content={article.tag.map((t) => t.name).join(', ')} />
        <meta name="og:type" content="article" />
        <meta name="og:title" content={article.title} />
        <meta name="og:url" content={`https://blog-sage-pi.vercel.app/article/${article.id}`} />
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
              <S.ButtonGroup>
                <Button
                  design="outline"
                  corner="round"
                  onClick={() => router.push(`/post?article_id=${article.id}`)}
                >
                  수정하기
                </Button>
                <Button
                  design="outline"
                  corner="round"
                  onClick={() => openModal()}
                >
                  삭제하기
                </Button>
              </S.ButtonGroup>

            ) : null}
        </S.wrapper>
      </S.Content>
      <br />
      <S.title>{article.title}</S.title>
      <S.Content>
        <S.chips>
          {article.tag.map(({ name }) => (
            <Chip
              key={name}
              style={{}}
            >
              {name}
            </Chip>
          ))}
        </S.chips>
      </S.Content>
      <br />
      <S.Content>
        <S.imageWrapper>
          <Image
            className="autoImage"
            src={article.src}
            layout="fill"
            alt=""
          />
        </S.imageWrapper>
      </S.Content>
      <br />
      <S.Content>
        <Markdown mdString={content} renderBookmark />
      </S.Content>
      <Comment id={article.id} />
    </S.main>
  );
}
export async function getServerSideProps() {
  return getArticlePropsFromLocal();
}

export default Article;
