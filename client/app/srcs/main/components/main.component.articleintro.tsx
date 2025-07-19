import React, { useMemo } from 'react';
import ArticleJson from '../../article/posts/articles.json';
import { Article } from '../../article/dto/article';
import FlipCard from './main.components.flipcard';

type Props = {
  onLink: (path: string) => void;
};
const ArticleIntro: React.FC<Props> = ({ onLink }) => {
  const latestArticles: Article[] = useMemo(
    () => Object.values(ArticleJson as { [key: string]: Article }).slice(-4).reverse(),
    [],
  );

  return (
    <div className="flex">
      <FlipCard
        front={(
          <div className="flex flex-col items-center h-full justify-center">
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-white">
              블로그
            </h1>
          </div>
        )}
        back={(
          <div className="flex flex-col items-center h-full justify-center">
            <p className="font-normal text-gray-400">
              게시글 저장소
            </p>
          </div>
        )}
        onClick={() => onLink('/article')}
      />
      <div className="flex-col items-start ml-4 hidden lg:flex">
        <h2 className="mb-4 text-xl font-bold tracking-tight text-white">
          최신 게시글
        </h2>
        <ul>
          {latestArticles.map((article) => (
            <li key={article.id} className="mb-2">
              <a
                href={`/article/${article.id}`}
                className="text-gray-400 hover:text-white"
              >
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticleIntro;
