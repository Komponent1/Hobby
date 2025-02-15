import { BlockType } from "../constant/ten-game.constant.stage";
import { Block } from "../dto/ten-game.dto.ref";

/**
 * 배열 내 랜덤 인덱스 반환 함수
 * @param board: 보드, type: 블록 타입
 * @returns number
 */
export const getRandomIndex = (board: Block[][], type: BlockType) => {
  const emptyBlocks = board.reduce((acc, row, i) => {
    row.forEach((col, j) => {
      if (col.type === type) {
        acc.push({ i, j });
      }
    });
    return acc;
  }, [] as {i: number; j: number}[]);
  const randomIndex = Math.floor(Math.random() * emptyBlocks.length);
  return emptyBlocks[randomIndex];
};
/**
 * 원 내부 포함 검사 함수
 * @param point: 마우스 위치,x: 원의 x좌표, y: 원의 y좌표, r: 원의 반지름
 * @returns boolean
 */
export const isInAppleCircle = ({
  point,
  x,
  y,
  r,
}: {
  point: { x: number; y: number };
  x: number;
  y: number;
  r: number;
}) => (point.x - x) ** 2 + (point.y - y) ** 2 <= r ** 2;
/**
 * 현재 보드판 달성률 반환 함수
 * @param board: 보드
 */
export const checkBoardRate = (board: Block[][]) => {
  const appleCount = board.reduce(
    (acc, row) => acc + row.filter((col) => col.type === BlockType.Apple).length,
    0,
  );
  return appleCount / (board.length * board[0].length);
};
