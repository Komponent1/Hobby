import React, { useState } from 'react';
import { ListItem, Avatar, ListItemText, ListItemAvatar } from '@mui/material'
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
        onClick={onClick} sx={{ cursor: 'pointer', borderBottom: '1px solid black', padding: '1.5rem 0' }}>
      <ListItemText
        primary={article.title}
        primaryTypographyProps={{
          variant: 'h4', sx: { textDecoration: hover ? 'underline' : 'none', marginBottom: '4rem' }
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
