import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { rootState } from '../../store';
import { getArticle } from '../../store/article';
import { deleteArticle } from '../../store/article';
import ArticlePresenter from './articlePresenter';
import { EMAIL } from '../../env';
import { useLoading } from '../../hooks';
import { Loading } from '../../components';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

const usePagemove = (article_id: string) => {
  const dispatch = useDispatch();
  const { loading, navigate } = useLoading('deletearticle', '/');
  const { data } = useSelector((state: rootState) => state.auth);

  const openEditor = () => navigate(`/post?article_id=${article_id}`);
  
  const openDel = () => {
    if (!data) {
      alert('로그인이 필요합니다');
      navigate('/login');
    }

    dispatch(deleteArticle(
      article_id, data.access_token, EMAIL,
      loading
    ));
  }

  return { openEditor, openDel };
}
const useArticle = (article_id: string) => {
  const { loading, data, error } = useSelector((state: rootState) => state.article);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getArticle(article_id));
  }, [ article_id ]);

  return { loading, data, error };
}
const useViewer = (data: any) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref) return;
    if (!data) return;

    new Viewer({
      el: ref.current as HTMLElement,
      initialValue: data ? data.article.content : '',
      plugins: [[ codeSyntaxHighlight, { highlighter: Prism } ]]
    });
  }, [ data ]);

  return { ref };
}
const ArticleContainer = () => {
  const mediaMatch = window.matchMedia('(max-width: 1200px)');
  const location = useLocation();
  const matches = useRef<boolean>(mediaMatch.matches);
  const { article_id } = queryString.parse(location.search) as { article_id: string };
  const { loading, data, error } = useArticle(article_id);
  const { openEditor, openDel } = usePagemove(article_id);
  const { ref } = useViewer(data);

  if (loading) return <Loading />
  return (
    <ArticlePresenter
      openEditor={openEditor}
      openDel={openDel}
      matches={matches}
      ref={ref}
    />
  )
};

export default ArticleContainer;
