export type GameData = {
  appid: string;
  tags: string[];
  name: string;
  photoUrl: string;
};
export type GameAnalysticData = GameData & {
  tagVector: number[];
};
