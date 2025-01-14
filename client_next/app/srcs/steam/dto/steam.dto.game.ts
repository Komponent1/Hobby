import { GameDetail, OwnedGames } from "./steam.dto.api";

export type CrawlingData = {
  appid: number;
  categories: Category[];
  tags: string[];
  name: string;
  photoUrl: string;
  playtime: number;
};
export type GameData = {
  personal_data: OwnedGames;
  system_data: GameDetail;
  crawling_data: CrawlingData | undefined;
};
export type GameAnalysticData = GameData & {
  tagVector: number[];
};
export type Category = {
  tagid: number;
  name: string;
  count: number;
  browseable: boolean;
};
export type TagPercentage = {
  tag: string;
  count: number;
  percent: number;
};
export type Genre = {
  id: number;
  description: string;
};
export type GenrePercentage = Genre & {
  count: number;
  percent: number;
};
