import fs from 'fs';
import path from 'path';
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import informationsJson from './posts/informations.json';
import { Information, InformationList } from "./dto/informations";

const infoparsed = async (id: number): Promise<InformationList> => {
  const filePath = path.join(process.cwd(), 'srcs/informations/posts', ((informationsJson as {[key: string]: any})[id].path));
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
    information: (informationsJson as {[key: string]: any})[id] as Information,
    content: parsed.toString(),
  };
};

export async function getInformationsPropsFromLoacl() {
  const list = Object.values(informationsJson);
  const informations = await Promise.all(list.map(({id}) => infoparsed(id)));

  return ({
    props: {
      informations: informations.reverse(),
    },
  });
}
