import React from 'react';
import { Card, CardContent, CardActionArea, Typography } from '@mui/material'

type Prop = {
  article: any
};
const ArticleCard: React.FC<Prop> = ({ article }) => {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {article.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {article.publish_date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
};

export default ArticleCard;
