import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import { SimpleButton } from '../../components';

type Prop = {
  categories: any[]
  openNewCategory: () => void
  openUpdateCategory: (category_id: string) => void
  openDeleteCategory: (category_id: string) => void
}
const MypagePresenter: React.FC<Prop> = ({ categories, openNewCategory, openUpdateCategory, openDeleteCategory }) => {
  return (
    <div>
      <Typography variant='h5' component='div'>Category</Typography>
      <SimpleButton label='추가' onClick={() => openNewCategory()} />
      <List>
      {categories.map((category, i) => (
        <ListItem key={i}
          secondaryAction={
            <div>
              <SimpleButton label={'수정'} onClick={() => openUpdateCategory(category.id)}/>
              <SimpleButton label={'삭제'} onClick={() => openDeleteCategory(category.id)}/>
            </div>
          }>
          <ListItemText>{category.name}</ListItemText>
        </ListItem>
      ))}
      </List>
    </div>
  );
};

export default MypagePresenter;
