import Phaser from 'phaser';

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
  scene: [
    /** Add Scenes */
  ],
};
