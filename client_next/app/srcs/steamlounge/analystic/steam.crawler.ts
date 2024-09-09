import axios from 'axios';
import { parse } from 'node-html-parser';
import { GetStoreHtmlException, TagParsingException } from '../steam.api/steam.exception';

export const getTags = (dom: HTMLElement) => {
  try {
    const div = dom.querySelector('#responsive_page_template_content');
    const scripts = div?.querySelectorAll('script');
    const tagScript = scripts?.find((script) => script.rawText.includes('InitAppTagModal'));
    if (tagScript === undefined) throw new Error();

    const tagsText = tagScript?.rawText.match(/\[[^\]]+\]/g);
    if (tagScript === undefined || tagsText === null) throw new Error();

    const tags = JSON.parse(tagsText[0]);
    return tags;
  } catch (err) {
    throw new TagParsingException();
  }
};
export const getAppName = (dom: HTMLElement) => {
  const div = dom.querySelector('#appHubAppName');
  const name = div?.textContent;
  return name;
};
export const getAppPhoto = (dom: HTMLElement) => {
  const img = dom.querySelector('.game_header_image_full');
  const photoUrl = img?.getAttribute('src');
  return photoUrl;
};
export const getGameHtmlDOM = async (appid: string) => {
  try {
    const html = await axios.get(`https://store.steampowered.com/app/${appid}`);
    return parse(html.data);
  } catch (err) {
    throw new GetStoreHtmlException();
  }
};
