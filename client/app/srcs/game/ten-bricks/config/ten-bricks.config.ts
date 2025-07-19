import Phaser from 'phaser';
import { Stage } from "../scene/ten-bricks.scene.stage";
import { Main } from "../scene/ten-bricks.scene.main";
import { Result } from "../scene/ten-bricks.scene.result";
import { MAP_HEIGHT, MAP_WIDTH } from '../constant/ten-bricks.constant.stage';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  parent: 'game-container',
  scale: {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
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
