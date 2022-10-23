import React from 'react';
import { useRouter } from 'next/router';
import {
  Card, CardContent, CardHeader,
} from '@seolim/react-ui/card';
import Image from 'next/image';
import { Chip } from '@seolim/react-ui/chips';
import { Article } from 'Data';

type ArticleCardProps = {
  article: Article
};
function ArticleCard({
  article,
}: ArticleCardProps) {
  const router = useRouter();

  return (
    <Card
      action={() => router.push(`/article/${article.id}`)}
      design="shadow"
    >
      <Image src={article.src} alt="" width="100%" layout="responsive" objectFit="contain" height="100%" />
      <CardHeader title={article.title} />
      <CardContent>
        {article.tag.map((tag) => (
          <Chip
            key={article.title + tag.name}
            color={tag.color}
            scale="small"
          >
            {tag.name}
          </Chip>
        ))}
      </CardContent>
      <CardContent>
        {article.user_email}
      </CardContent>
    </Card>
  );
}

export default ArticleCard;
