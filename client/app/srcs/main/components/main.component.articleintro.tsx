import React, { useMemo } from 'react';
import Image from 'next/image';
import ArticleJson from '../../article/posts/articles.json';
import { Article } from '../../article/dto/article';
import { SimpleCard } from './main.component.simplecard';

type Props = {
  onLink: (path: string) => void;
};
const ArticleIntro: React.FC<Props> = ({ onLink }) => {
  const latestArticle: Article[] = useMemo(
    () => Object.values(ArticleJson as { [key: string]: Article }).slice(-2).reverse(),
    [],
  );

  return (
    <SimpleCard
      icon="file_earmark_fill"
      title="개발 로그"
      description="개발 게시글 저장소"
      onLink={() => onLink('/article')}
      etc={(
        <div className="flex-col items-start lg:flex relative">
          <Image
            src="/main/blog.png"
            alt="Blog Logo"
            width={350}
            height={350}
            className="absolute -bottom-24 -right-24 opacity-15 -z-0 rounded-2xl"
          />
          <h2 className="mb-4 text-xl font-bold tracking-tight text-white">
            최신 게시글
          </h2>
          <ul>
            {latestArticle.map((article) => (
              <li key={article.id} className="mb-2 z-10">
                <a
                  href={`/article/${article.id}`}
                  className="text-gray-400 hover:text-white z-10"
                >
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    />
  );
};

export default ArticleIntro;
