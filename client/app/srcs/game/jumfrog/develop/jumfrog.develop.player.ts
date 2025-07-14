import { BOTTOM, mapConfig, X } from '../config/jumfrog.map.config';
import type { Stage } from '../scene/jumfrog.scene.stage';

export const PLAYER_POSITION_X = X + 450;
export const PLAYER_POSITION_Y = mapConfig.height - BOTTOM - 3250;

export class DevelopPlayer {
  constructor(scene: Stage) {
    scene.input.keyboard?.on('keydown-C', () => {
      if (scene.player) {
        scene.player.setPosition(PLAYER_POSITION_X, PLAYER_POSITION_Y);
      }
    });
  }

  static create(scene: Stage) {
    const developPlayer = new DevelopPlayer(scene);
    return developPlayer;
  }
}
