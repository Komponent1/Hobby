import axios from 'axios';
import { parse } from 'node-html-parser';
import { GetStoreHtmlException, TagParsingException } from '../steam.api/steam.exception';

export const getTags = (categories: any) => {
  const tags = categories.map((category: any) => category.name);
  return tags;
};
export const getCategories = (dom: HTMLElement) => {
  try {
    const div = dom.querySelector('#responsive_page_template_content');
    const scripts = div?.querySelectorAll('script');
    const tagScript = scripts?.find((script) => script.rawText.includes('InitAppTagModal'));
    if (tagScript === undefined) throw new Error();

    const tagsText = tagScript?.rawText.match(/\[[^\]]+\]/g);
    if (tagScript === undefined || tagsText === null) throw new Error();

    const categories = JSON.parse(tagsText[0]);
    return categories;
  } catch (err) {
    throw new TagParsingException();
  }
};
export const getAppName = (dom: HTMLElement) => {
  const div = dom.querySelector('#appHubAppName');
  const name = div?.textContent;
  return name;
};
export const getAppPhoto = (appid: number) => `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`;
export const getGameHtmlDOM = async (appid: number) => {
  try {
    const html = await axios.get(`https://store.steampowered.com/app/${appid}`);
    return parse(html.data);
  } catch (err) {
    throw new GetStoreHtmlException();
  }
};
