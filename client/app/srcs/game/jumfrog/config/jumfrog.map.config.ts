export const MAP_H = 8000;
export const MAP_W = 800;

export const mapConfig = {
  width: MAP_W,
  height: MAP_H,
  scaffoldings: [
    {
      x: 200,
      y: MAP_H - 100,
      movable: false,
    },
    {
      x: 400,
      y: MAP_H - 200,
      movable: true,
    },
    {
      x: 600,
      y: MAP_H - 300,
      movable: true,
    },
    {
      x: 400,
      y: MAP_H - 400,
      movable: false,
    },
    {
      x: 200,
      y: MAP_H - 500,
      movable: false,
    },
  ],
};
