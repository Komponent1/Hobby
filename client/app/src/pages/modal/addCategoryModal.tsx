import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Input, SimpleButton } from '../../components';
import { Typography, Card } from '@mui/material';
import { postCategory } from '../../store/category';
import { rootState } from '../../store';
import { BASENAME } from '../../env';
import { patchCategory } from '../../store/category';


type Prop = {

};
const useCategory = () => {
  const [name, setName] = useState<string>('');
  const { data } = useSelector((state: rootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateCategory = (category_id: string) => {
    if (!data) {
      alert('로그인 다시 해야함');
      return navigate('/login');
    }
    dispatch(patchCategory(data.access_token, BASENAME, category_id, name));
    navigate(-1);
  }

  const addCategory = () => {
    if (!data) {
      alert('로그인 다시 해야함');
      return navigate('/login');
    }
    dispatch(postCategory(data.access_token, BASENAME, name));
    navigate(-1);
  }

  return { name, setName, updateCategory, addCategory };
};

const AddCategoryModal = React.forwardRef<HTMLDivElement, Prop>((prop, ref) => {
  const { search } = useLocation();
  const { type, category_id } = queryString.parse(search) as { type: string, category_id?: string };
  const { name, setName, updateCategory, addCategory } = useCategory();
  
  return (
    <Card ref={ref} sx={{ width: '40rem', margin: 'auto', padding: '3rem', marginTop: 'calc(50vh - 10rem)' }}>
      <Typography variant='h5' component='h5'>카테고리 {type === 'post' ? '추가' : '수정'}</Typography>
      <Input label='category name' value={name} onChange={(e: any) => setName(e.target.value) }/>
      <SimpleButton label={type === 'post' ? '추가' : '수정'} onClick={() => type === 'post' ? addCategory() : updateCategory(category_id as string)}/>
    </Card>
  )
});

export default AddCategoryModal;
