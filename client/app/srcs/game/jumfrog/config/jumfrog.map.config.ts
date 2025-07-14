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
      len: 11,
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
      x: X,
      y: MAP_H - 600,
      len: 6,
      movable: false,
    },
    {
      x: X + 400,
      y: MAP_H - 800,
      len: 12,
      movable: false,
    },
    {
      x: X + 400,
      y: MAP_H - 950,
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
    {
      x: X + 600,
      y: MAP_H - 1300,
      len: 1,
      movable: false,
    },
    {
      x: X + 400,
      y: MAP_H - 1400,
      len: 1,
      movable: false,
    },
    {
      x: X + 200,
      y: MAP_H - 1500,
      len: 1,
      movable: false,
    },
    {
      x: X + 600,
      y: MAP_H - 1600,
      len: 1,
      movable: false,
    },
    {
      x: X + 400,
      y: MAP_H - 1700,
      len: 1,
      movable: false,
    },
    {
      x: X + 250,
      y: MAP_H - 1760,
      len: 1,
      movable: false,
    },
    {
      x: X + 150,
      y: MAP_H - 1800,
      len: 2,
      movable: false,
    },
    {
      x: X,
      y: MAP_H - 1900,
      len: 5,
      movable: false,
    },
    {
      x: X + 220,
      y: MAP_H - 1900,
      len: 12,
      movable: false,
    },
    {
      x: X + 400,
      y: MAP_H - 2100,
      len: 6,
      movable: true,
    },
    {
      x: X + 200,
      y: MAP_H - 2250,
      len: 3,
      module: false,
    },
    {
      x: X + 200,
      y: MAP_H - 2350,
      len: 3,
      movable: true,
    },
    {
      x: X + 700,
      y: MAP_H - 2500,
      len: 3,
      movable: true,
    },
    {
      x: X + 450,
      y: MAP_H - 2600,
      len: 1,
      movable: false,
    },
    {
      x: X + 200,
      y: MAP_H - 2750,
      len: 2,
      movable: true,
    },
    {
      x: X + 800,
      y: MAP_H - 2900,
      len: 1,
      movable: true,
    },
    {
      x: X + 420,
      y: MAP_H - 3020,
      len: 2,
      movable: true,
    },
    {
      x: X + 400,
      y: MAP_H - 3100,
      len: 1,
      movable: true,
    },
    {
      x: X + 200,
      y: MAP_H - 3200,
      len: 17,
      movable: false,
    },
    {
      x: X + 400,
      y: MAP_H - 3300,
      len: 12,
      movable: false,
      etc: 'ice',
    },
  ],
};
