import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { rootState } from '../../store';
import { getArticles } from '../../store/articles';
import { getArticle } from '../../store/article';
import { Pagination } from '@mui/material';
import { ArticleGrid } from '..';
import * as style from './style';
import { BASENAME } from '../../env';

const NUM = 6;

type Prop = {
  category_id?: string|null
}
const ArticlesBoard: React.FC<Prop> = ({ category_id }) => {
  const [idx, setIdx] = useState<number>(0);
  const { data } = useSelector((state: rootState) => state.articles);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles(BASENAME, idx, NUM, category_id))
  }, [ idx ])
  useEffect(() => {
    setIdx(0);
    if (category_id) {
      dispatch(getArticles(BASENAME, 0, NUM, category_id));
    } else {
      dispatch(getArticles(BASENAME, 0, NUM));
    }
  }, [ category_id ])

  const onClickArticle = (idx: number) => {
    dispatch(getArticle(data.articles[idx].id, navigate, location, 'article'))
  }

  return (
    <style.div>
      <ArticleGrid articles={data ? data.articles : []} onClickArticle={onClickArticle}/>
      <Pagination
        sx={style.pagination_ul}
        count={10} page={idx + 1} onChange={(e: React.ChangeEvent<unknown>, page) => setIdx(page - 1)}/>
    </style.div>

  )
};

export default ArticlesBoard;
