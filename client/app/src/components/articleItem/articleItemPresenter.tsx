import React from 'react';
import { ListItem, Avatar, ListItemText, ListItemAvatar } from '@mui/material'
import * as style from './style';
import { LOGO } from '../../env';

type Prop = {
  hover: boolean
  setHover: {
    onMouseOver: () => void
    onMouseOut: () => void
  },
  onClick: (e: React.MouseEvent) => void
  title: string
  date: string
}
const ArticleItemPresenter: React.FC<Prop> = ({ hover, setHover, onClick, title, date }) => {
  return (
    <ListItem
        {...setHover}
        onClick={onClick} sx={style.item}>
      <ListItemText
        primary={title}
        primaryTypographyProps={{
          variant: 'h4',
          sx: style.itemText(hover)
        }}
        secondary={date}
      />
      <ListItemAvatar>
        <Avatar alt='logo' src={LOGO}/>
      </ListItemAvatar>
    </ListItem>
  )
};

export default ArticleItemPresenter;