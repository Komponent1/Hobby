import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import { SimpleButton } from '../../components';
import * as style from './style';

type Prop = {
  categories: any[]
  openNewCategory: () => void
  openUpdateCategory: (category_id: string) => void
  openDeleteCategory: (category_id: string) => void
}
const MypagePresenter: React.FC<Prop> = ({ categories, openNewCategory, openUpdateCategory, openDeleteCategory }) => {
  return (
    <style.div width={window.screen.width}>
      <Typography sx={{ fontWeight: 'bold', marginBottom: '2rem' }}  variant='h5' component='div'>
        Category 관리
        <SimpleButton
          sx={{ marginLeft: '2rem' }}
          label='추가' onClick={() => openNewCategory()} />
      </Typography>
      <List sx={{ boxShadow: '0 0 1px 1px grey', padding: '1rem' }}>
      {categories.map((category, i) => (
        <ListItem key={i}
          sx={{ borderBottom: '1px solid grey' }}
          secondaryAction={
            <div>
              <SimpleButton sx={{ marginRight: '2rem' }} label={'수정'} onClick={() => openUpdateCategory(category.id)}/>
              <SimpleButton label={'삭제'} onClick={() => openDeleteCategory(category.id)}/>
            </div>
          }>
          <ListItemText>{category.name}</ListItemText>
        </ListItem>
      ))}
      </List>
    </style.div>
  );
};

export default MypagePresenter;
