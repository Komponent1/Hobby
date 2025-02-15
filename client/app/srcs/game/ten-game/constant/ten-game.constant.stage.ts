/** 사과 크기 */
export const BASE_W = 64;
export const BASE_H = 64;
/** 사과 사이 마진 */
export const MARGIN = 16;
/** 게임 보드 가로 세로 개수 */
export const ROW = 10;
export const COL = 17;
/** 게임 플레이 시간 120초 */
export const GAME_TIME = 120 * 1000;
/** 스테이지 상태 */
export enum StageState {
  Playing = "Playing",
  GameOver = "GameOver",
}
/** 블록의 타입(apple = 일반 블록, boom = 폭탄, empty = 빈공간) */
export enum BlockType {
  Apple = "apple",
  Boom = "boom",
  Empty = "empty",
}
/** 폭탄 변환 주기 */
export const BOOM_GEN_TIME = 5000;
/** 사과 젠 주기 */
export const APPLE_GEN_TIME = 5000;
/** 사과 젠 시작 비율 */
export const APPLE_GEN_RATE = 0.7;
/** 시작 폭탄 개수 */
export const BOOM_COUNT = 5;
