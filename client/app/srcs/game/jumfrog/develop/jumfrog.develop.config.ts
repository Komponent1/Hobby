import type { Stage } from '../scene/jumfrog.scene.stage';
import { DevelopPlayer } from './jumfrog.develop.player';

export class DevelopConfig {
  static create(scene: Stage) {
    DevelopPlayer.create(scene);
  }
}
