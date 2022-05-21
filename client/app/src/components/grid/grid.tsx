import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { ArticleCard } from '../';

const useWindowWidth = () => {
  const getWidth = () => {
    return window.innerWidth; 
  }
  const [width, setWidth] = useState<number>(getWidth());

  useEffect(() => {
    const handle = () => setWidth(getWidth());

    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  return { width };
}

type Prop = {
  articles: any[]
  onClickArticle: (idx: number) => void
};
const ArticleGrid: React.FC<Prop>= ({ articles, onClickArticle }) => {
  const { width } = useWindowWidth();

  return (
    <Grid container spacing={4}>
      {articles.map((art: any, i: number) => (
        <Grid key={i} item xs={width < 900? 6 : 4}>
          <ArticleCard article={art} onClick={() => onClickArticle(i)}/>
        </Grid>
      ))}
    </Grid>
  )
};

export default ArticleGrid;
