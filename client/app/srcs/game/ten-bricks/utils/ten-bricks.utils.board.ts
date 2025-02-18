import { BlockType } from "../constant/ten-bricks.constant.stage";
import { Block } from "../dto/ten-bricks.dto.ref";

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
/** 배경인 둥근 모서리 사각형을 그리는 함수 */
export const drawRoundRect = (
  scene: Phaser.Scene,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  stroke: number,
) => {
  const graphics = scene.add.graphics();

  graphics.lineStyle(stroke, 0xff0000, 1); // 테두리 두께, 색상, 투명도 설정
  graphics.fillStyle(0x000000, 1); // 채우기 색상 및 투명도 설정
  // 둥근 모서리를 가진 사각형 그리기
  graphics.beginPath();
  graphics.moveTo(x + radius, y);
  graphics.lineTo(x + width - radius, y);
  graphics.arc(
    x + width - radius,
    y + radius,
    radius,
    Phaser.Math.DegToRad(270),
    Phaser.Math.DegToRad(360),
    false,
  );
  graphics.lineTo(x + width, y + height - radius);
  graphics.arc(
    x + width - radius,
    y + height - radius,
    radius,
    Phaser.Math.DegToRad(0),
    Phaser.Math.DegToRad(90),
    false,
  );
  graphics.lineTo(x + radius, y + height);
  graphics.arc(
    x + radius,
    y + height - radius,
    radius,
    Phaser.Math.DegToRad(90),
    Phaser.Math.DegToRad(180),
    false,
  );
  graphics.lineTo(x, y + radius);
  graphics.arc(
    x + radius,
    y + radius,
    radius,
    Phaser.Math.DegToRad(180),
    Phaser.Math.DegToRad(270),
    false,
  );
  graphics.closePath();
  graphics.strokePath();
  graphics.fillPath();

  return graphics;
};
