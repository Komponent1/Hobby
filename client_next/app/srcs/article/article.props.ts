import articlesJson from './posts/articles.json';

export function getArticlePropsFromLocal() {
  const articles = articlesJson;
  const articleList = Object.values(articles);

  return ({
    props: {
      articles: articleList.reverse(),
    },
  });
}
