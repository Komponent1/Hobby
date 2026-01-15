import type { NextApiRequest, NextApiResponse } from "next";
import parse, { HTMLElement } from "node-html-parser";
import {
  GetStoreHtmlException,
  TagParsingException,
} from "../../../srcs/steam/serviceV2/steam.apiv2/steam.exception";

const getTags = (categories: any) => {
  const tags = categories.map((category: any) => category.name);
  return tags;
};

const getCategories = (dom: HTMLElement) => {
  try {
    const div = dom.querySelector("#responsive_page_template_content");
    const scripts = div?.querySelectorAll("script");
    const tagScript = scripts?.find((script) =>
      script.rawText.includes("InitAppTagModal")
    );
    if (tagScript === undefined) throw new Error();

    const tagsText = tagScript?.rawText.match(/\[[^\]]+\]/g);
    if (tagScript === undefined || tagsText === null) throw new Error();

    const categories = JSON.parse(tagsText[0]);
    return categories;
  } catch (err) {
    throw new TagParsingException();
  }
};

const getRating = (dom: HTMLElement) => {
  const div = dom.querySelector("#review_histogram_rollup_section");
  if (div === null) return "";
  const rating = div.querySelector(".game_review_summary");
  if (rating === null) return "";
  const ratingText = rating.textContent;
  return ratingText || "";
};

const getAppName = (dom: HTMLElement) => {
  const div = dom.querySelector("#appHubAppName");
  const name = div?.textContent;
  return name;
};

const getAppPhoto = (appid: number) =>
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`;

const crawlAppDetails = async (appid: number) => {
  try {
    const cookieHeader = `wants_mature_content=1; birthtime=-157798799; lastagecheckage=1-January-1965`;

    const response = await fetch(
      `https://store.steampowered.com/app/${appid}`,
      {
        method: "GET",
        redirect: "follow",
        headers: {
          Cookie: cookieHeader,
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      }
    );

    const text = await response.text();
    const dom = parse(text);
    const categories = getCategories(dom);
    const tags = getTags(categories);
    const name = getAppName(dom) as string;
    const photoUrl = getAppPhoto(appid) as string;
    const rating = getRating(dom) as string;

    return {
      appid,
      categories,
      tags,
      name,
      photoUrl,
      rating,
    };
  } catch (err) {
    throw new GetStoreHtmlException();
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { appid } = req.query;

  if (!appid || typeof appid !== "string") {
    return res.status(400).json({ error: "appid is required" });
  }

  try {
    const data = await crawlAppDetails(Number(appid));
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to crawl app details" });
  }
}
