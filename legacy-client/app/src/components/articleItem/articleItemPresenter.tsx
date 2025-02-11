import React from 'react';
import { ListItem, Avatar, ListItemText, ListItemAvatar } from '@mui/material'
import * as style from './style';
import { LOGO } from '../../env';

type Prop = {
  hover: boolean
  checkHover: {
    onMouseOver: () => void
    onMouseOut: () => void
  },
  move2Article: () => void
  title: string
  date: string
}
const ArticleItemPresenter: React.FC<Prop> = ({ hover, checkHover, move2Article, title, date }) => {
  return (
    <ListItem
        sx={style.item}
        {...checkHover}
        onClick={move2Article}>
      <ListItemText
        primary={title}
        primaryTypographyProps={{
          variant: 'h4',
          sx: style.itemText(hover)
        }}
        secondary={date}/>
      <ListItemAvatar>
        <Avatar alt='logo' src={LOGO}/>
      </ListItemAvatar>
    </ListItem>
  )
};

export default ArticleItemPresenter;