import React, { useEffect, useState } from 'react';
import { AutoChipsInput, useFormControl } from '@seolim/react-ui/form';
import { Grid } from '@seolim/react-ui';
import { Article, Tag } from 'Data';
import * as S from '../styles/main.style';
import { ArticleCard } from '../srcs';

type MainProps = {
  tags: Tag[];
  articles: Article[];
};
function Main({
  articles,
  tags,
}: MainProps) {
  const control = useFormControl<string[], HTMLInputElement>({
    initValue: [],
  });
  const [filterArticle, setFilterArticle] = useState<any[]>(articles);

  useEffect(() => {
    if (!control.value || control.value.length === 0) return;
    const changes = articles.filter(
      (article) => {
        const item = article.tag.filter(
          (tag) => (control.value as string[]).includes(tag.name),
        );
        return item.length !== 0;
      },
    );
    setFilterArticle(changes);
  }, [control.value, articles]);

  return (
    <S.main>
      <AutoChipsInput
        design="underline"
        control={control}
        controlValue={tags.map((tag: any) => tag.name)}
        placeholder="태그로 검색해주세요"
      />
      <Grid
        breakPoint={[1024, 768, 512]}
        columns={3}
        gap={30}
        style={{ marginTop: '30px' }}
      >
        {filterArticle.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </Grid>
    </S.main>
  );
}
/**
 * 최초 데이터 가져오기
 * 1. 모든 게시글 파일 가져오기
 */
export async function getServerSideProps() {
  try {
    const { articles } = await fetch('https://gitblogserver.cf/api/articles').then((res) => res.json());
    const { tags } = await fetch('https://gitblogserver.cf/api/tags').then((res) => res.json());

    return ({
      props: {
        articles, tags,
      },
    });
  } catch (err) {
    return ({
      redirect: {
        destination: '/error',
        permanent: false,
      },
    });
  }
}

export default Main;
