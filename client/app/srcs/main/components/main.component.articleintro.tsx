import React, { useMemo } from 'react';
import Image from 'next/image';
import {Typography} from '@seolim/designsystem';
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
          <div className="z-10">
            <Typography element="p" type="primary" size="xl" weight="bold">
              최신 게시글
            </Typography>
            <ul>
              {latestArticle.map((article) => (
                <li key={article.id}>
                  <Typography element="span" type="tertiary" size="md">
                    <a href={`/article/${article.id}`}>
                      {article.title}
                    </a>
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    />
  );
};

export default ArticleIntro;
