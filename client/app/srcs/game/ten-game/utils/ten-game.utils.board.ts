/**
 * 배열 내 랜덤 인덱스 반환 함수
 * @param array 배열
 * @returns number
 */
export const getRandomIndex = (array: any[]) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return randomIndex;
};
/**
 * 원 내부 포함 검사 함수
 * @param point: 마우스 위치, x: 원의 x좌표, y: 원의 y좌표, r: 원의 반지름
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
