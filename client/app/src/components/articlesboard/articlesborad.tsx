import React, { useEffect } from 'react';
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
  const location = useLocation();
  const category_id = queryString.parse(location.search).category_id as string|undefined;
  const { data } = useSelector((state: rootState) => state.articles);
  const dispatch = useDispatch();
  const { loading } = useLoading('articles');

  /* For redirect(새로고침) */
  useEffect(() => {
    if (category_id) {
      dispatch(getArticles(EMAIL, 0, NUM, category_id, loading));
    } else {
      dispatch(getArticles(EMAIL, 0, NUM, undefined, loading));
    }
  }, []);

  return { data };
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
  
  
  
  const { data } = useArticles();
  const { onClickArticle } = useArticle(data)  

  return (
    <style.div>
      <Articlelist
        articles={data ? data.articles : []}
        onClickArticle={onClickArticle}
      />
    </style.div>

  )
};

export default ArticlesBoard;
