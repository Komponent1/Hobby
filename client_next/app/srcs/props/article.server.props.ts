import {GetServerSidePropsContext} from 'next';
import {date2string} from '../../lib';
import {ArticleAPI} from '../api';

export async function getArticlePropsFromServer(context: GetServerSidePropsContext) {
  const login = context.req.cookies.seolim_blog_user || '';
  const { pid } = context.query;
  try {
    const articleAPI = new ArticleAPI();
    const { article, content, user } = await articleAPI.get(parseInt(pid as string, 10));
    const date = date2string(article.update_date as string);

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
