import React, { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useLayout } from '@seolim/react-ui/layout';
import { Markdown, Editor } from '../srcs';
import * as S from '../styles/post.style';

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

  return (
    <S.postboard>
      <Editor
        onChange={setMd}
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
  if (!cookie.seolim_blog_access_token) {
    return ({
      redirect: {
        destination: '/login',
        permanent: false,
      },
    });
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { article_id } = context.query;

  try {
    /** next서버에서 보내는 값은 어자피 처리 불가 */
    // if (article_id) await fetch(`http://gateway:80/auth?article_id=${article_id}`);
    // else await fetch('http://gateway:80/auth');
  } catch (err) {
    return ({
      redirect: {
        destination: '/main',
        permanent: false,
      },
    });
  }
  try {
    let article;
    if (article_id) article = await fetch(`http://gateway:80/api/article?article_id=${article_id}`).then((res) => res.json());
    const { tags } = await fetch('http://gateway:80/api/tags').then((res) => res.json());

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
