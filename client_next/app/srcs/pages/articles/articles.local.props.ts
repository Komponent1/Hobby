import articlesJson from '../../articles/articles.json';

export function getArticlePropsFromLocal() {
  const articles = articlesJson;

  return ({
    props: {
      articles,
    },
  });
}
