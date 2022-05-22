import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { postArticle } from '../../api';
import { rootState } from '../../store';
import { Editor } from '@toast-ui/editor';
import { SelectChangeEvent } from '@mui/material/Select';
import PostPresenter from './postPresenter';
import { category } from '../../mockserver/data';

const useSubInformation = () => {
  const { data } = useSelector((state: rootState) => state.category);
  const [title, setTitle] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');

  const setCategory = (e: SelectChangeEvent) => {
    console.log(e.target.value)
    setCategoryId(e.target.value);
  }

  return { categories: data.categories, title, setTitle, categoryId, setCategory };
}
const useEditor = () => {
  const ref = useRef<HTMLDivElement>(null);
  let editor: any = null;
  useEffect(() => {
    if (!ref) return;

    const saved = window.localStorage.getItem('blog_content_temp_save');
    // if (saved && saved !== '') {
    //   alert('불러올지 확인 후 setVale(saved)');
    // }

    const id = setInterval(() => {
      window.localStorage.setItem('blog_content_temp_save', editor?.getMarkdown());
    }, 60 * 1000);

    editor = new Editor({
      el: ref.current as HTMLElement,
      previewStyle: 'vertical',
      height: '500px',
      initialValue: saved ? saved : ''
    });

    return () => clearInterval(id);
  }, [ ref ]);

  return { ref, editor };
}
const useSubmit = (title: string, categoryId: string, editor: any) => {
  const { data } = useSelector((state: rootState) => state.auth);
  const navigate = useNavigate();
  const changefile = (md: string) => {
    const file = new Blob([md], { type: 'text/plain' });
    return file;
  }
  const postfile = async (md: string) => {
    if (!data) navigate('/login');
    const file = changefile(md);
    const formData = new FormData();
    formData.append('file', file, 'test.md');
    const response = await postArticle(data.access_token, 'test_email', 'test_category', formData);

    if (response.code === 500) {

    } else if (response.code === 401) {
      navigate('/login');
    } else {
      window.localStorage.removeItem('blog_content_temp_save');
      navigate(`/article?article_id=${response.data}`)
    }
  }
  const submit = () => {
    postfile(editor?.getMarkdown());
  }

  return { submit };
}

const PostContainer: React.FC = () => {
  const { categories, title, setTitle, categoryId, setCategory } = useSubInformation();
  const { ref, editor } = useEditor();
  const { submit } = useSubmit(title, categoryId, editor);

  return ( 
    <PostPresenter
      ref={ref} submit={submit}
      title={title} setTitle={setTitle}
      categories={categories}
      category_id={categoryId} setCategory={setCategory}
    />
  );
};

export default PostContainer;