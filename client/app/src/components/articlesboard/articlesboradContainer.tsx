import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { rootState } from '../../store';
import { getArticles } from '../../store/articles';
import ArticleboardPresenter from './articlesboardPresenter';
import { EMAIL } from '../../env';
import queryString from 'query-string';

const NUM = 6;

const useArticles = () => {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const category_id = queryString.parse(location.search).category_id as string|undefined;
  const { data } = useSelector((state: rootState) => state.articles);
  const dispatch = useDispatch();
  const [observer, setObserver] = useState<any>(null);

  /* For redirect(새로고침) */
  const loadArticles = useCallback((idx: number) => {
    if (category_id) {
      dispatch(getArticles(EMAIL, idx, NUM, category_id));
    } else {
      dispatch(getArticles(EMAIL, idx, NUM, undefined));
    }
  }, [ category_id, dispatch ]);
  
  useEffect(() => {
    if (!data) return;
    if (data && data.count === data.articles.length) return;
    setObserver(new IntersectionObserver(async ([entry], observer) => {
      if (entry.isIntersecting) {
        const idx = !data ? 0 : (
          data.articles.length / NUM < 1 ? Math.floor(data.articles.length / NUM) + 1 : Math.floor(data.articles.length / NUM)
        );
        loadArticles(idx);
        observer.disconnect();
      }
    }, { threshold: 0.5 }));
  }, [ data, loadArticles ])
  useEffect(() => {
    if (!observer) return;
    if(!ref?.current) return;
    observer.observe(ref.current);
  }, [ observer ])
  useEffect(() => {
    if (observer) observer.disconnect();
    loadArticles(0);
  }, [ category_id, loadArticles ]);

  return { data, ref };
}
const useArticle = (data: any) => {
  const navigate = useNavigate();

  const onClickArticle = (idx: number) => {
    navigate(`/article?article_id=${data.articles[idx].id}`);
  }

  return { onClickArticle };
}
type Prop = {

}
const ArticlesBoard: React.FC<Prop> = () => {
  const { data, ref } = useArticles();
  const { onClickArticle } = useArticle(data)  

  return (  
    <ArticleboardPresenter
      ref={ref}
      articles={data ? data.articles : []}
      onClickArticle={onClickArticle}
    />
  )
};

export default ArticlesBoard;
