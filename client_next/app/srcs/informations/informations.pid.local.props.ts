import fs from 'fs';
import path from 'path';
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import { Information } from "./dto/informations";
import informationsJson from './posts/informations.json';

export function getInformationsListPath() {
  const informationsPaths = Object.values(informationsJson).map((information) => ({
    params: {
      pid: String(information.id),
    },
  }));

  return {
    paths: informationsPaths,
    fallback: false,
  };
}
type Property = {
  pid: string;
};
export async function getInformationsProps({pid}: Property) {
  const filePath = path.join(process.cwd(), 'srcs/informations/posts', ((informationsJson as {[key: string]: any})[pid].path));
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
      information: (informationsJson as {[key: string]: any})[pid] as Information,
      content: parsed.toString(),
    },
  };
}
