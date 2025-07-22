import React, { useMemo } from 'react';
import { Article } from '../../article/dto/article';
import ArticleJson from '../../article/posts/articles.json';

type Props = {
  backgroundUrl?: string;
};
const Area: React.FC<Props> = ({ backgroundUrl }) => {
  const latestArticles: Article[] = useMemo(
    () => Object.values(ArticleJson as { [key: string]: Article }).slice(-4).reverse(),
    [],
  );
  return (
    <div
      className="shadow-[2px_2px_15px_rgba(0,0,0,0.8)] rounded-xl w-full h-72 overflow-hidden"
    >
      <div
        className="w-full h-full bg-radial-[182.31%_199.89%_at_90.99%_107.25%,_rgb(1,162,171)_10%,_rgb(204,102,112)_70%,_rgb(1,162,171)_120%] relative"
      >
        {backgroundUrl && (
        <div
          className="w-full h-full absolute opacity-30 bg-cover bg-center mask-radial-[100%_100%_at_50%_55%,_black_8%,_rgba(0,0,0,0)_75%] z-0"
          style={{ backgroundImage: `url(${backgroundUrl})`, mixBlendMode: 'unset' }}
        />
        )}
        <div className="flex items-center justify-center">
          <h1
            className="text-white font-extrabold text-4xl text-center text-shadow z-1"
          >
            Blog
          </h1>
        </div>
        <div className="flex-col items-start ml-4 lg:flex">
          <h2 className="text-white font-extrabold text-4xl text-center text-shadow z-1">
            최신 게시글
          </h2>
          <ul className="z-1">
            {latestArticles.map((article) => (
              <li key={article.id} className="mb-2">
                <a
                  href={`/article/${article.id}`}
                  className="text-white font-extrabold text-md text-center text-shadow"
                >
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Area;
