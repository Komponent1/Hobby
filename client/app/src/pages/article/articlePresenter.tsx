import React from 'react';
import { Banner } from '../../components';

type Prop = {
  content: string|undefined
}

const ArticlePresenter: React.FC<Prop> = ({ content }) => {
  return (
    <div>
      <Banner />
      <p>{content}</p>
    </div>
  )
};

export default ArticlePresenter;
