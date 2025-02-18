import Phaser from 'phaser';
import { Stage } from "../scene/ten-bricks.scene.stage";
import { Main } from "../scene/ten-bricks.scene.main";
import { Result } from "../scene/ten-bricks.scene.result";

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  parent: 'game-container',
  scale: {
    width: 1920,
    height: 1080,
    mode: Phaser.Scale.FIT,
  },
  input: {
    mouse: true,
  },
  dom: {
    createContainer: true,
  },
  backgroundColor: '#000000',
  scene: [
    Main, Stage, Result,
  ],
};
