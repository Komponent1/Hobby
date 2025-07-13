import { mapConfig, X } from '../config/jumfrog.map.config';
import type { Stage } from '../scene/jumfrog.scene.stage';

export class Background extends Phaser.GameObjects.Container {
  constructor(scene: Stage, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.objLayer.add(this);
    for (let i = mapConfig.height - 500; i >= 0; i -= 485) {
      this.add(scene.add.image(
        X,
        i,
        'background',
      ).setOrigin(0, 0).setScale(1.5));
    }
  }

  static create(scene: Stage): Background {
    const background = new Background(scene, 0, 0);
    return background;
  }
}
