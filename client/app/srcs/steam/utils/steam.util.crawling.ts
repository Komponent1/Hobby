import { GetStoreHtmlException } from "../serviceV2/steam.apiv2/steam.exception";

export const getAppPhoto = (appid: number) =>
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`;
export const getGameHtmlDOM = async (
  appid: number
): Promise<{
  appid: number;
  name: string;
  rating: string;
  categories: any[];
  tags: any[];
  photoUrl: string;
}> => {
  try {
    // 서버 API 엔드포인트를 통해 요청 (서버 사이드에서 쿠키 처리)
    const response = await fetch(`/api/steam/crawl-app-details?appid=${appid}`);

    if (!response.ok) {
      throw new GetStoreHtmlException();
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new GetStoreHtmlException();
  }
};
