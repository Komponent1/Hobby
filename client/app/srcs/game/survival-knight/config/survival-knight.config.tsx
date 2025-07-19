import Phaser from 'phaser';
import {Stage} from '../scenes/survival-knight.scene.stage';
import { Main } from "../scenes/survival-knight.scene.main";
import { Shop } from "../scenes/survival-knight.scene.shop";
import {RetryCheck} from '../scenes/survival-knight.scene.retryCheck';
import { Clear } from "../scenes/survival-knight.scene.clear";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constant/survival-knight.constant.config';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  parent: 'game-container',
  scale: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  physics: {
    default: 'matter',
    matter: {
      debug: false,
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
  scene: [Main, Stage, Shop, RetryCheck, Clear],
};
