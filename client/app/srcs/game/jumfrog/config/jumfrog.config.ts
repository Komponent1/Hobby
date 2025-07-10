import Phaser from 'phaser';
import { Stage } from '../scene/jumfrog.scene.stage';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  parent: 'game-container',
  scale: {
    width: 800,
    height: 600,
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
  backgroundColor: '#00ffff',
  scene: [
    Stage,
  ],
};
