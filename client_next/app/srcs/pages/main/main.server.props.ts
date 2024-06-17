import {ArticleAPI, TagAPI} from '../../../legacy/api';

export async function getMainPropsFromServer() {
  try {
    const articleAPI = new ArticleAPI();
    const tagAPI = new TagAPI();
    const articles = await articleAPI.getAll();
    const tags = await tagAPI.getAll();

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
