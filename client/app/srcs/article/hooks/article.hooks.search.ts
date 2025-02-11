import {useCallback, useEffect, useState} from 'react';
import {Article} from '../dto/article';

export const useSearch = (articles: Article[]) => {
  const [filteredArticle, setFilteredArticle] = useState<Article[]>([]);
  useEffect(() => {
    setFilteredArticle(articles);
  }, [articles]);
  const search = useCallback((text: string) => {
    const regex = new RegExp(text.split(' ').join("|"), 'i');
    const filtered = articles.filter((article) => regex.test(article.title));
    setFilteredArticle(filtered);
  }, [articles]);

  return {
    search,
    filteredArticle,
  };
};
