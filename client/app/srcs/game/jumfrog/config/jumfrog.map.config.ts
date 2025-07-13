export const SCREEN_WIDTH = 1920;
export const SCREEN_HEIGHT = 800;

export const MAP_H = 8000;
export const MAP_W = 800;
export const X = SCREEN_WIDTH / 2 - MAP_W / 2;
export const BOTTOM = 32; // Height of the ground layer

export const mapConfig = {
  width: MAP_W,
  height: MAP_H,
  scaffoldings: [
    {
      x: X + 200,
      y: MAP_H - 100,
      len: 1,
      movable: false,
    },
    {
      x: X + 400,
      y: MAP_H - 200,
      len: 2,
      movable: false,
    },
    {
      x: X + 600,
      y: MAP_H - 300,
      len: 3,
      movable: false,
    },
    {
      x: X + 400,
      y: MAP_H - 400,
      len: 4,
      movable: false,
    },
    {
      x: X + 200,
      y: MAP_H - 500,
      len: 5,
      movable: false,
    },
    {
      x: X + 400,
      y: MAP_H - 600,
      len: 6,
      movable: false,
    },
    {
      x: X + 600,
      y: MAP_H - 700,
      len: 7,
      movable: false,
    },
    {
      x: X + 400,
      y: MAP_H - 800,
      len: 6,
      movable: false,
    },
    {
      x: X + 200,
      y: MAP_H - 900,
      len: 1,
      movable: false,
    },
    {
      x: X + 600,
      y: MAP_H - 1000,
      len: 2,
      movable: false,
    },
    {
      x: X + 400,
      y: MAP_H - 1100,
      len: 1,
      movable: false,
    },
    {
      x: X + 200,
      y: MAP_H - 1200,
      len: 1,
      movable: false,
    },
  ],
};
