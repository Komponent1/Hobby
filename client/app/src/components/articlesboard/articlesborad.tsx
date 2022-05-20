import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { rootState } from '../../store';
import { getArticles } from '../../store/articles';
import { getArticle } from '../../store/article';
import { Pagination } from '@mui/material'

const NUM = 5;

type Prop = {
  category_id?: string|null
}
const ArticlesBoard: React.FC<Prop> = ({ category_id }) => {
  const [idx, setIdx] = useState<number>(0);
  const { loading, data, error } = useSelector((state: rootState) => state.articles);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles('email', idx, NUM, category_id))
  }, [ idx ])
  useEffect(() => {
    console.log(loading, data, error);
  }, [ loading ])


  const onClickArticle = (idx: number) => {
    console.log(data.articles[idx].ID);
    dispatch(getArticle(data.articles[idx].ID, navigate, location, 'article'))
  }

  return (
    <div>
      <ul>
        {data?.articles.map((e: any, i: number) => (
          <li onClick={() => onClickArticle(i)}>{e.title}</li>
        ))}
      </ul>
      <Pagination count={10} onChange={(e: React.ChangeEvent<unknown>, page) => setIdx(page - 1)}/>
    </div>

  )
};

export default ArticlesBoard;
