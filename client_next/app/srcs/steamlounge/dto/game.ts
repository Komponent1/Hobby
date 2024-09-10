export type GameData = {
  appid: string;
  categories: Category[];
  tags: string[];
  name: string;
  photoUrl: string;
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
