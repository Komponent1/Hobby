import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { rootState } from '../../store';
import { getArticles } from '../../store/articles';
import { getArticle } from '../../store/article';

const NUM = 5;

type Prop = {
  category_id: string
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

  const onClickIdx = (idx: number) => {
    setIdx(idx);
  };
  const onClickArticle = (idx: number) => {
    dispatch(getArticle(data[idx].article_id, navigate, location, 'article'))
  }

  return (
    <>Test</>
  )
};

export default ArticlesBoard;
