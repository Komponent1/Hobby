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

const useSubInformation = () => {
  const { data } = useSelector((state: rootState) => state.category);
  const [title, setTitle] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');

  const setCategory = (e: SelectChangeEvent) => {
    setCategoryId(e.target.value as string);
  }

  return { categories: data ? data.categories : [], title, setTitle, categoryId, setCategory };
}
const useEditor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [ editor, setEditor ] = useState<any>(null);
  useEffect(() => {
    if (!ref) return;

    const saved = window.localStorage.getItem('blog_content_temp_save');
    // if (saved && saved !== '') {
    //   alert('불러올지 확인 후 setVale(saved)');
    // }

    const id = setInterval(() => {
      window.localStorage.setItem('blog_content_temp_save', editor?.getMarkdown());
    }, 60 * 1000);

    setEditor(new Editor({
      el: ref.current as HTMLElement,
      previewStyle: 'vertical',
      height: '700px',
      initialValue: saved ? saved : ''
    }));

    return () => clearInterval(id);
  }, [ ref ]);

  return { ref, editor };
}
const useSubmit = (navigate: NavigateFunction, title: string, categoryId: string) => {
  const { data } = useSelector((state: rootState) => state.auth);
  const changefile = (md: string) => {
    const file = new Blob([md], { type: 'text/plain' });
    return file;
  }
  const postfile = async (md: string, category_id: string) => {
    if (!data) navigate('/login');
    const file = changefile(md);
    const formData = new FormData();
    formData.append('file', file, title);
    const response = await postArticle(data.access_token, BASENAME, category_id, formData);

    if (response.code === 500) {

    } else if (response.code === 401) {
      navigate('/login');
    } else {
      window.localStorage.removeItem('blog_content_temp_save');
      navigate(`/article?article_id=${response.data.article.id}`)
    }
  }
  const submit = (editor: any) => {
    postfile(editor.getMarkdown(), categoryId);
  }

  return { submit };
}

const PostContainer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categories, title, setTitle, categoryId, setCategory } = useSubInformation();
  const { ref, editor } = useEditor();
  const { submit } = useSubmit(navigate, title, categoryId);
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getCategory(BASENAME))
  }, [])

  const openModal = () => {
    navigate('/modal/test', { state: { backgroundLocation: location }});
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