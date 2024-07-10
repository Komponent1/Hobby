import {remark} from 'remark';
import html from 'remark-html';
import fs from 'fs';
import path from 'path';
import informationsJson from '../../informations/informations.json';

export function getInformationsListPath() {
  const informationsPaths = informationsJson.map((information) => ({
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
  const filePath = path.join(process.cwd(), 'srcs/informations', `informations${pid}.md`);
  const file = fs.readFileSync(filePath, 'utf-8');

  const result = await remark().use(html).process(file);
  const paredHtml = result.toString();

  return {
    props: {
      informations: paredHtml,
    },
  };
}
