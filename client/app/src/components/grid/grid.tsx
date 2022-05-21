import React from 'react';
import { Grid, Card } from '@mui/material';
import { ArticleCard } from '../';

type Prop = {
  articles: any[]
};
const ArticleGrid: React.FC<Prop>= ({ articles }) => {
  return (
    <Grid container spacing={4}>
      {articles.map((art: any, i: number) => (
        <Grid key={i} item xs={4}>
          <ArticleCard article={art} />
        </Grid>
      ))}
    </Grid>
  )
};

export default ArticleGrid;
