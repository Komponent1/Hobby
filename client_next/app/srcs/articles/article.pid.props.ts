import {remark} from 'remark';
import html from 'remark-html';
import fs from 'fs';
import path from 'path';
import articlesJson from './posts/articles.json';

export function getArticlesListPath() {
  const articlePaths = articlesJson.map((article) => ({
    params: {
      pid: String(article.id),
    },
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
  const filePath = path.join(process.cwd(), 'srcs/articles/posts', `article${pid}.md`);
  const file = fs.readFileSync(filePath, 'utf-8');

  const result = await remark().use(html).process(file);
  const paredHtml = result.toString();

  return {
    props: {
      article: {title: `Article ${pid}`, id: pid, path: `/articles/${pid}`},
      content: paredHtml,
    },
  };
}
