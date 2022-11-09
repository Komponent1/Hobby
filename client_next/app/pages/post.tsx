import React, { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useLayout } from '@seolim/react-ui/layout';
import { Markdown, Editor } from '../srcs/components';
import * as S from '../styles/post.style';
import { ArticleAPI, TagAPI } from '../srcs/api';

type PostProps = {
  tags: any[];
  article?: any;
};
function Post({
  tags, article,
}: PostProps) {
  useLayout(false, false);
  const [md, setMd] = useState<string>(
    article ? article.content : '',
  );
  const onChange = (text: string) => {
    setMd(text);
  };

  return (
    <S.postboard>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Editor
        onChange={onChange}
        tags={tags}
        raw={article ? ({
          id: article.article.id,
          title: article.article.title,
          tag: article.article.tag.map((tag: any) => tag.name),
          content: article.content,
        }) : undefined}
      />
      <Markdown mdString={md} scroll />
    </S.postboard>
  );
}
Post.defaultProps = {
  article: undefined,
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookie = context.req.cookies;
  if (!cookie.seolim_blog_user) {
    return ({
      redirect: {
        destination: '/login',
        permanent: false,
      },
    });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { article_id } = context.query;
    const articleAPI = new ArticleAPI();
    const tagAPI = new TagAPI();
    let article;
    if (article_id) article = await articleAPI.get(parseInt(article_id as string, 10));
    const tags = await tagAPI.getAll();

    if (article) {
      return ({
        props: { tags, article },
      });
    }
    return ({
      props: { tags },
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
export default Post;
