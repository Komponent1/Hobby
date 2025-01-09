import {LoadingRange} from './steam.enum';

export const LoadingText = {
  [LoadingRange.PLAYER_SUMMARIES]: '유저 정보를 불러오는 중입니다',
  [LoadingRange.OWNED_GAMES]: '소유한 게임 정보를 불러오는 중입니다',
  [LoadingRange.GAME_DATA]: '게임 정보를 불러오는 중입니다',
  [LoadingRange.COMPLETE]: '완료!',
};
