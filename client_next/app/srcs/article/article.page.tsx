import React from 'react';
import { Article } from './dto/article';
import Card from './components/article.components.card';
import Navbar from "../common/common.components/common.components.navbar";
import {SearchInput} from './components';
import {useSearch} from './hooks/article.hooks.search';

type Props = {
  articles: Article[];
};
const ArticlePage: React.FC<Props> = ({ articles }) => {
  const {filteredArticle, search} = useSearch(articles);
  console.log('1', filteredArticle);
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-32 px-4">
        <div className="mb-4">
          <SearchInput search={search} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticle.map((article) => (
            <Card
              key={article.id}
              id={article.id}
              title={article.title}
              photo={article.photo}
              tags={article.tags}
            />
          ))}
        </div>
      </div>
    </div>

  );
};

export default ArticlePage;
