import React, { useState } from 'react';
import { ListItem, Avatar, ListItemText, ListItemAvatar } from '@mui/material'
import * as style from './style';
import { LOGO } from '../../env';


const date2string = (datestring: string) => {
  const date = new Date(datestring);

  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

type Prop = {
  article: any,
  onClick: (e: React.MouseEvent) => void
};
const ArticleCard: React.FC<Prop> = ({ article, onClick }) => {
  const [ hover, setHover ] = useState<boolean>(false);

  return (
    <ListItem
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onClick={onClick} sx={style.item}>
      <ListItemText
        primary={article.title}
        primaryTypographyProps={{
          variant: 'h4',
          sx: style.itemText(hover)
        }}
        secondary={date2string(article.publish_date)}
      />
      <ListItemAvatar>
        <Avatar alt='logo' src={LOGO}/>
      </ListItemAvatar>
    </ListItem>
  )
};

export default ArticleCard;
