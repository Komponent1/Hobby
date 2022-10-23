import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { Chip } from '@seolim/react-ui/chips';
import { Avatar } from '@seolim/react-ui';
import { Article as tArticle, User } from 'Data';
import Image from 'next/image';
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
};
function Article({
  article, content, user,
}: ArticleProps) {
  return (
    <S.main>
      <S.Content>
        <S.wrapper>
          <Avatar src={user.src} alt="" />
          <S.box>
            <S.p>{article.user_id}</S.p>
            <S.p>{date2string(article.update_date)}</S.p>
          </S.box>
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
        <Markdown mdString={content} />
      </S.Content>
    </S.main>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { pid } = context.query;
  const { article, content, user } = await fetch(`${process.env.BASEURL}/api/article?article_id=${pid}`).then((res) => res.json());

  return ({
    props: {
      article, content, user,
    },
  });
}

export default Article;
