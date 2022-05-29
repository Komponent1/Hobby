import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavigateFunction, useLocation } from 'react-router-dom';
import { postArticle } from '../../api';
import { rootState } from '../../store';
import { Editor } from '@toast-ui/editor';
import { SelectChangeEvent } from '@mui/material/Select';
import PostPresenter from './postPresenter';
import { getCategory } from '../../store/category';
import { BASENAME } from '../../env';
import queryString from 'query-string';
import { getArticle, patchArticle } from '../../store/article';

const useSubInformation = (article: any) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: rootState) => state.category);
  const [title, setTitle] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');

  useEffect(() => {
    dispatch(getCategory(BASENAME));
  }, []);

  const setCategory = (e: SelectChangeEvent) => {
    setCategoryId(e.target.value as string);
  }

  useEffect(() => {
    if (!article) return;
    setCategoryId(article.category_id as string);
    setTitle(article.title as string);
  }, [ article ]);

  return { categories: data ? data.categories : [], title, setTitle, categoryId, setCategory };
}
const useEditor = (article_id: string|undefined) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: rootState) => state.article);
  const ref = useRef<HTMLDivElement>(null);
  const [ editor, setEditor ] = useState<any>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (article_id) {
      dispatch(getArticle(parseInt(article_id)));
    }

    const saved = window.localStorage.getItem(`blog_content_temp_save${article_id}`);
    let html = new Editor({
      el: ref.current as HTMLElement,
      previewStyle: 'vertical',
      height: '700px',
      initialValue: saved ? saved : ''
    })
    setEditor(html);
    
    if (saved && saved !== '') {
      alert('이전 내용을 불러옵니다')
    }

    const id = setInterval(() => {
      console.log('auto saved', html.getMarkdown())
      window.localStorage.setItem(`blog_content_temp_save${article_id}`, html.getMarkdown());
    }, 60 * 1000);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!article_id || !data || !editor) return;
    editor.setMarkdown(data.article.content);
  }, [data]);

  return { ref, editor, article: data?.article };
}
const useSubmit = (navigate: NavigateFunction, title: string, categoryId: string, article_id?: string) => {
  const { data } = useSelector((state: rootState) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const changefile = (md: string) => {
    const file = new Blob([md], { type: 'text/plain' });
    return file;
  }
  const postfile = async (md: string, category_id: string, article_id?: string) => {
    if (!data) {
      alert('로그아웃되었습니다. 재 로그인이 요구됩니다');
      navigate('/login');
    }
    const file = changefile(md);
    const formData = new FormData();
    formData.append('file', file, title);

    let response: any = null;
    if (article_id) {
      return dispatch(patchArticle(
        parseInt(article_id), data.access_token, BASENAME, formData,
        navigate, location, 'article'
      ));
    } else {
      response = await postArticle(data.access_token, BASENAME, category_id, formData);
    }

    if (response.code === 500) {

    } else if (response.code === 401) {
      alert('로그아웃되었습니다. 재 로그인이 요구됩니다');
      navigate('/login');
    } else {
      window.localStorage.removeItem(`blog_content_temp_save${article_id}`);
      navigate(`/article?article_id=${response.data.article.id}`)
    }
  }
  const submit = (editor: any) => {
    postfile(editor.getMarkdown(), categoryId, article_id);
  }

  return { submit };
}

const PostContainer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { article_id } = queryString.parse(location.search) as { article_id: string|undefined };
  const { ref, editor, article } = useEditor(article_id);
  const { categories, title, setTitle, categoryId, setCategory } = useSubInformation(article);
  const { submit } = useSubmit(navigate, title, categoryId, article_id);

  const openModal = () => {
    navigate('/modal/category?type=post', { state: { backgroundLocation: location }});
  }

  return ( 
    <PostPresenter
      ref={ref} submit={() => submit(editor)}
      title={title} setTitle={setTitle}
      categories={categories}
      category_id={categoryId} setCategory={setCategory}
      openModal={openModal}
    />
  );
};

export default PostContainer;