import { BOSS, FIRE, GOBLIN_TORCH } from './survival-knight.constant.object';

export enum MonsterPreloadNum {
  goblin_torch = 20,
  fire = 20,
  boss = 2,
}
export const MONSTER_GEN_TIME = {
  goblin_torch: GOBLIN_TORCH.GEN_TIME,
  fire: FIRE.GEN_TIME,
  boss: BOSS.GEN_TIME * 3,
};
export const CLEAR_TIME = 30 * 1000;
