import Phaser from 'phaser';
import {Stage} from '../scenes/game.scene.stage';
import { Main } from "../scenes/game.scene.main";
import { Shop } from "../scenes/game.scene.shop";

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
      debug: true,
    },
  },
  input: {
    keyboard: true,
    mouse: true,
  },
  dom: {
    createContainer: true,
  },
  backgroundColor: '#028af8',
  scene: [Main, Stage, Shop],
};
