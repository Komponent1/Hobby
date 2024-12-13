export type GameData = {
  appid: number;
  categories: Category[];
  tags: string[];
  name: string;
  photoUrl: string;
  playtime: number;
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
