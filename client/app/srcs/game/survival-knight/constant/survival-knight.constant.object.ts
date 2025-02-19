export const FRAME = {
  player: {
    IDLE: [0, 5],
    WALK: [6, 11],
    ATTACK: [12, 17],
  },
  goblin_torch: {
    IDLE: [0, 6],
    WALK: [7, 12],
    ATTACK: [13, 17],
  },
  fire: {
    IDLE: [0, 5],
    WALK: [0, 5],
    ATTACK: [0, 5],
  },
  boss: {
    IDLE: [0, 5],
    WALK: [7, 12],
    ATTACK: [13, 17],
  },
};
export const GOBLIN_TORCH = {
  SPEED: 7,
  HP: 10,
  ATTACK: 10,
  EXP: 10,
  GEN_TIME: 2000,
  W: 80,
  H: 80,
};
export const FIRE = {
  SPEED: 7,
  HP: 10,
  ATTACK: 10,
  EXP: 10,
  GEN_TIME: 2000,
  W: 80,
  H: 80,
  SHOOT_INTERVAL: 1000,
};
export const BOSS = {
  SPEED: 6,
  HP: 100,
  ATTACK: 50,
  EXP: 100,
  SHOOT_INTERVAL: 1000,
  GEN_TIME: 30000,
  W: 80,
  H: 80,
};
