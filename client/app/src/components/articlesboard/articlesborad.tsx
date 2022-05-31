import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { rootState } from '../../store';
import { getArticles } from '../../store/articles';
import { getArticle } from '../../store/article';
import { Articlelist } from '..';
import * as style from './style';
import { EMAIL } from '../../env';
import { useLoading } from '../../hooks';
import queryString from 'query-string';

const NUM = 6;

const useArticles = () => {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const category_id = queryString.parse(location.search).category_id as string|undefined;
  const { data } = useSelector((state: rootState) => state.articles);
  const dispatch = useDispatch();

  /* For redirect(새로고침) */
  const loadArticles = (idx: number) => {
    if (category_id) {
      dispatch(getArticles(EMAIL, idx, NUM, category_id));
    } else {
      dispatch(getArticles(EMAIL, idx, NUM, undefined));
    }
  };
  const observer = new IntersectionObserver(async ([entry], observer) => {
    if (entry.isIntersecting) {
      const idx = !data ? 0 : (
        data.articles.length / NUM < 1 ? Math.floor(data.articles.length / NUM) + 1 : Math.floor(data.articles.length / NUM)
      );
      console.log(idx);
      loadArticles(idx);
      console.log('intersect')
      observer.disconnect();
      
    }
  }, { threshold: 0.5 });
  useEffect(() => {
    if (!ref?.current) return;
    if (!data) return;
    if (data && data.count === data.articles.length) return;

    observer.observe(ref.current);
  }, [ data ])
  useEffect(() => {
    loadArticles(0);
  }, [ category_id ]);

  return { data, ref };
}
const useArticle = (data: any) => {
  const dispatch = useDispatch();
  const { loading } = useLoading('article');

  const onClickArticle = (idx: number) => {
    dispatch(getArticle(data.articles[idx].id, loading))
  }

  return { onClickArticle };
}
type Prop = {

}
const ArticlesBoard: React.FC<Prop> = () => {
  const { data, ref } = useArticles();
  const { onClickArticle } = useArticle(data)  

  return (
    <style.div>
      <Articlelist
        ref={ref}
        articles={data ? data.articles : []}
        onClickArticle={onClickArticle}
      />
    </style.div>

  )
};

export default ArticlesBoard;
