import React from 'react';
import { Card, CardContent, CardActionArea, Typography } from '@mui/material'

type Prop = {
  article: any,
  onClick: (e: React.MouseEvent) => void
};
const ArticleCard: React.FC<Prop> = ({ article, onClick }) => {
  return (
    <Card onClick={onClick}>
      <CardActionArea>
        <CardContent sx={{ height: '10rem', postion: 'relative'}}>
          <Typography sx={{ fontWeight: 'bold'}}  gutterBottom variant='h5' component='div'>
            {article.title}
          </Typography>
          <Typography sx={{ position: 'absolute', bottom: '1rem', right: '1rem' }}
            variant='body2' color='text.secondary'>
            {article.publish_date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
};

export default ArticleCard;
