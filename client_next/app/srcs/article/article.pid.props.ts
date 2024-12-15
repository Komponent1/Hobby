import {remark} from 'remark';
import html from 'remark-html';
import fs from 'fs';
import path from 'path';
import articlesJson from './posts/articles.json';

export function getArticlesListPath() {
  const articlePaths = Object.keys(articlesJson).map((article) => ({
    params: {pid: article},
  }));

  return {
    paths: articlePaths,
    fallback: false,
  };
}
type Property = {
  pid: string;
};
export async function getArticleProps({pid}: Property) {
  if (!(articlesJson as {[key: string]: any})[pid]) {
    return ({
      redirect: {
        destination: '/error',
        permanent: false,
      },
    });
  }

  const filePath = path.join(process.cwd(), 'srcs/article/posts', (articlesJson as {[key: string]: any})[pid].path);
  const file = fs.readFileSync(filePath, 'utf-8');
  const result = await remark().use(html).process(file);
  const paredHtml = result.toString();

  return {
    props: {
      content: paredHtml,
    },
  };
}
