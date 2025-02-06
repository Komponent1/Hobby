import {Stage} from '../scenes/game.scene.stage';
import { Main } from "../scenes/game.scene.main";
import { Shop } from "../scenes/game.scene.shop";
import {RetryCheck} from '../scenes/game.scene.retryCheck';
import { Clear } from "../scenes/game.scene.clear";

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  parent: 'game-container',
  scale: {
    width: 1920,
    height: 1080,
    mode: Phaser.Scale.FIT,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  input: {
    keyboard: true,
    mouse: true,
  },
  dom: {
    createContainer: true,
  },
  backgroundColor: '#ffffff',
  scene: [Main, Stage, Shop, RetryCheck, Clear],
};
