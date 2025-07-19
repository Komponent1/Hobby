import { MAP_H, X } from '../config/jumfrog.map.config';
import type { Stage } from '../scene/jumfrog.scene.stage';

export const PLAYER_POSITION_X = X + 50;
export const PLAYER_POSITION_Y = MAP_H - 6060;

export class DevelopPlayer {
  constructor(scene: Stage) {
    scene.input.keyboard?.on('keydown-C', () => {
      if (scene.player) {
        scene.player.setPosition(PLAYER_POSITION_X, PLAYER_POSITION_Y);
        scene.player.setVelocity(0);
        scene.player.setAccelerationX(0);
      }
    });
  }

  static create(scene: Stage) {
    const developPlayer = new DevelopPlayer(scene);
    return developPlayer;
  }
}
