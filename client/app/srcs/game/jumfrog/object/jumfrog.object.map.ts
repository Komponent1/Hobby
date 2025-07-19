import { mapConfig, X } from '../config/jumfrog.map.config';
import type { Stage } from '../scene/jumfrog.scene.stage';

export class Map extends Phaser.GameObjects.Container {
  constructor(scene: Stage, x: number, y: number) {
    super(scene, x, y);

    for (let i = X; i < X + mapConfig.width; i += 32) {
      this.add(scene.add.image(i, mapConfig.height - 32, 'tile_b').setOrigin(0, 0));
    }

    scene.add.existing(this);
    scene.objLayer.add(this);
  }

  static create(scene: Stage): Map {
    const map = new Map(scene, 0, 0);
    return map;
  }
}
