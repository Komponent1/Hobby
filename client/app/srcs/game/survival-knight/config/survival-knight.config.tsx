import Phaser from 'phaser';
import {Stage} from '../scenes/survival-knight.scene.stage';
import { Main } from "../scenes/survival-knight.scene.main";
import { Shop } from "../scenes/survival-knight.scene.shop";
import {RetryCheck} from '../scenes/survival-knight.scene.retryCheck';
import { Clear } from "../scenes/survival-knight.scene.clear";

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  parent: 'game-container',
  scale: {
    width: 1920,
    height: 1080,
    mode: Phaser.Scale.FIT,
  },
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      gravity: { x: 0, y: 0 },
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
  scene: [Stage, Shop, RetryCheck, Clear],
};
