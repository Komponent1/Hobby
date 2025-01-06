import remarkParse from "remark-parse";
import {unified} from "unified";
import rehypeHighlight from "rehype-highlight";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import fs from 'fs';
import path from 'path';
import articlesJson from './posts/articles.json';
import { Article } from "./dto/article";

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
  const parsed = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument)
    .use(rehypeFormat)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(file);

  return {
    props: {
      article: (articlesJson as {[key: string]: any})[pid] as Article,
      content: parsed.toString(),
    },
  };
}
