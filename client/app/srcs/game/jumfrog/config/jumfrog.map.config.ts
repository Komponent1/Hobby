export const SCREEN_WIDTH = 1920;
export const SCREEN_HEIGHT = 800;

export const MAP_H = 8000;
export const MAP_W = 800;
export const X = SCREEN_WIDTH / 2 - MAP_W / 2;
export const BOTTOM = 10; // Height of the ground layer

export const mapConfig = {
  width: MAP_W,
  height: MAP_H,
  scaffoldings: [
    {
      x: X + 200,
      y: MAP_H - 100,
      movable: false,
    },
    {
      x: X + 400,
      y: MAP_H - 200,
      movable: false,
    },
    {
      x: X + 600,
      y: MAP_H - 300,
      movable: false,
    },
    {
      x: X + 400,
      y: MAP_H - 400,
      movable: false,
    },
    {
      x: X + 200,
      y: MAP_H - 500,
      movable: false,
    },
    {
      x: X + 400,
      y: MAP_H - 600,
      movable: false,
    },
    {
      x: X + 600,
      y: MAP_H - 700,
      movable: false,
    },
    {
      x: X + 400,
      y: MAP_H - 800,
      movable: false,
    },
    {
      x: X + 200,
      y: MAP_H - 900,
      movable: false,
    },
    {
      x: X + 600,
      y: MAP_H - 1000,
      movable: false,
    },
    {
      x: X + 400,
      y: MAP_H - 1100,
      movable: false,
    },
    {
      x: X + 200,
      y: MAP_H - 1200,
      movable: false,
    },
  ],
};
