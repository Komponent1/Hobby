import Phaser from 'phaser';
import { Stage } from '../scene/jumfrog.scene.stage';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './jumfrog.map.config';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  parent: 'game-container',
  scale: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { x: 0, y: 980 },
    },
  },
  input: {
    keyboard: true,
    mouse: true,
  },
  dom: {
    createContainer: true,
  },
  backgroundColor: '#515151',
  scene: [
    Stage,
  ],
};
