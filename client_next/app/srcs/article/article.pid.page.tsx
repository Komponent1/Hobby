/* eslint-disable react/no-danger */
import React from 'react';

type Props = {
  content: string;
};
const ArticlesPidPage: React.FC<Props> = ({ content}) => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);
export default ArticlesPidPage;
