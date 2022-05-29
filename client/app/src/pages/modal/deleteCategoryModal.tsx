import React from 'react';
import { SimpleButton } from '../../components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Card } from '@mui/material';
import queryString from 'query-string';
import { rootState } from '../../store';
import { BASENAME } from '../../env';
import { deleteCategory } from '../../store/category';

type Prop = {
  
}
const DeleteCategoryModal = React.forwardRef<HTMLDivElement, Prop>((prop, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const category_id = queryString.parse(search).category_id as string;
  const { data } = useSelector((state: rootState) => state.auth);

  const click = () => {
    if (!data) {
      alert('로그인 다시 해야함');
      return navigate('/login');
    }
    dispatch(deleteCategory(data.access_token, BASENAME, category_id));
    navigate(-1);
  }

  return (
    <Card ref={ref} sx={{ width: '40rem', margin: 'auto', padding: '3rem', marginTop: 'calc(50vh - 10rem)' }}>
      <Typography variant='h5' component='h5'>정말 삭제하시겠습니까?</Typography>
      <SimpleButton label={'삭제'} onClick={() => click()} />
    </Card>
  );
});

export default DeleteCategoryModal;