import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postArticle } from '../../api';
import { rootState } from '../../store';
import { Editor } from '../../components';

const Post: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const { data } = useSelector((state: rootState) => state.auth);
  const navigate = useNavigate();
  const changefile = () => {
    const file = new Blob([value], { type: 'text/plain' });
    return file;
  }
  const postfile = async () => {
    if (!data) navigate('/login');
    const file = changefile();
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

  useEffect(() => {
    const saved = window.localStorage.getItem('blog_content_temp_save');
    if (saved && saved !== '') {
      alert('불러올지 확인 후 setVale(saved)');
    }

    const id = setInterval(() => {
      window.localStorage.setItem('blog_content_temp_save', value);
    }, 60 * 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <Editor />
      <button onClick={() => postfile()}>submit</button>
    </div>
  )
};

export default Post;
