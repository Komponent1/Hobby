export enum HPbarType {
  MONSTER = 'monster',
  PLAYER = 'player',
  BOSS = 'boss',
}
export type HpLayout = {
  bgW: number;
  bgH: number;
  barW: number;
  barH: number;
  marginX: number;
  marginY: number;
};
export const MONSTER_HP = {
  bgW: 100,
  bgH: 10,
  barW: 95,
  barH: 6,
  marginX: 2.3,
  marginY: 2,
};
export const PLAYER_HP = {
  bgW: 320,
  bgH: 16,
  barW: 305,
  barH: 10,
  marginX: 8,
  marginY: 3,
};
export const BOSS_HP = {
  bgW: 200,
  bgH: 16,
  barW: 190,
  barH: 10,
  marginX: 5,
  marginY: 2,
};
export const HP_LAYOUT: {[key in HPbarType]: HpLayout} = {
  [HPbarType.MONSTER]: MONSTER_HP,
  [HPbarType.PLAYER]: PLAYER_HP,
  [HPbarType.BOSS]: BOSS_HP,
};
