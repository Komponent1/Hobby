import React from 'react';
import { Article } from './dto/article';
import Card from './components/article.components.card';
import Navbar from "../common/common.components/common.components.navbar";

type Props = {
  articles: Article[];
};
const ArticlePage: React.FC<Props> = ({ articles }) => (
  <div>
    <Navbar />
    <div className="max-w-5xl mx-auto mt-32">
      <div className="grid grid-cols-3">
        {articles.map((article) => (
          <Card
            key={article.id}
            id={article.id}
            title={article.title}
            photo={article.photo}
            description={article.title}
          />
        ))}
      </div>
    </div>
  </div>

);

export default ArticlePage;
