import React, { useState } from 'react';
import { Input, SimpleButton } from '../../components';
import { Typography, Card } from '@mui/material';
import { postCategory } from '../../store/category';
import { rootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASENAME } from '../../env';

type Prop = {

};
const AddCategoryModal: React.FC<Prop> = () => {
  const [name, setName] = useState<string>('');
  const { data } = useSelector((state: rootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addCategory = () => {
    if (!data) {
      alert('로그인 다시 해야함');
      return navigate('/login');
    }
    dispatch(postCategory(data.access_token, BASENAME, name));
    navigate(-1);
  }
  
  
  return (
    <Card sx={{ width: '40rem', margin: 'auto', padding: '3rem', marginTop: 'calc(50vh - 10rem)' }}>
      <Typography variant='h5' component='h5'>카테고리 추가</Typography>
      <Input label='category name' value={name} onChange={(e: any) => setName(e.target.value) }/>
      <SimpleButton label='추가' onClick={() => addCategory()}/>
    </Card>
  )
};

export default AddCategoryModal;
