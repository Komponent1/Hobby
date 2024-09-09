import articlesJson from './posts/articles.json';

export function getArticlePropsFromLocal() {
  const articles = articlesJson;

  return ({
    props: {
      articles,
    },
  });
}
