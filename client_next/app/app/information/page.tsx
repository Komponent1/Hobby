import fs from 'fs';
import path from 'path';
import "highlight.js/styles/a11y-dark.css";
import { md2html } from "../common/common.utils";
import InformationContainer from "./information.container";
import informationJson from './__posts__/informations.json';
import { Information } from "./dto/informations";

const getInformationMd2Html = async (id: number): Promise<string> => {
  const filePath = path.join(
    process.cwd(),
    'app/information/__posts__',
    ((informationJson as {[key: string]: any})[id].path),
  );
  const file = fs.readFileSync(filePath, 'utf-8');
  const html = await md2html(file);

  return html;
};
const Page = async () => {
  const list = (Object.values(informationJson) as Information[]).reverse();
  const informations = await Promise.all(
    list.map(
      async (info) => {
        const content = await getInformationMd2Html(info.id);
        return {information: info, content};
      },
    ),
  );

  return (
    <InformationContainer informations={informations} />
  );
};
export default Page;
