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
import { useLoading } from '../../hooks';

const NUM = 6;


const useArticles = (category_id?: string) => {
  const { data } = useSelector((state: rootState) => state.articles);
  const [idx, setIdx] = useState<number>(0);
  const dispatch = useDispatch();
  const { loading } = useLoading('articles');

  useEffect(() => {
    dispatch(getArticles(BASENAME, idx, NUM, category_id, loading));
  }, [ idx ])
  useEffect(() => {
    setIdx(0);
    if (category_id) {
      dispatch(getArticles(BASENAME, 0, NUM, category_id, loading));
    } else {
      dispatch(getArticles(BASENAME, 0, NUM, undefined, loading));
    }
  }, [ category_id ]);

  return { data, idx, setIdx };
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
  category_id?: string
}
const ArticlesBoard: React.FC<Prop> = ({ category_id }) => {
  const { data, idx, setIdx } = useArticles(category_id);
  const { onClickArticle } = useArticle(data)  

  return (
    <style.div>
      <ArticleGrid articles={data ? data.articles : []} onClickArticle={onClickArticle}/>
      {data?.count && data.count >= NUM ?
        <Pagination
          sx={style.pagination_ul}
          count={Math.floor(data.count / NUM) + 1} page={idx + 1} onChange={(e: React.ChangeEvent<unknown>, page) => setIdx(page - 1)}/>
        : null
      }
    </style.div>

  )
};

export default ArticlesBoard;
