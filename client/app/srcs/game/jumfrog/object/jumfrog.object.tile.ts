import { mapConfig, SCREEN_HEIGHT, X } from '../config/jumfrog.map.config';
import type { Stage } from '../scene/jumfrog.scene.stage';

export class Tile extends Phaser.GameObjects.Container {
  constructor(scene: Stage, x: number, y: number) {
    super(scene, x, y);
    scene.uiLayer.add(this);
    for (let i = 0; i < SCREEN_HEIGHT; i += 32) {
      this.add(scene.add.image(X - 32, i, 'tile_l').setOrigin(0, 0));
      this.add(scene.add.image(X + mapConfig.width, i, 'tile_r').setOrigin(0, 0));
      for (let j = 0; j < X - 32; j += 32) {
        this.add(scene.add.image(j, i, 'tile').setOrigin(0, 0));
        this.add(scene.add.image(j + X + mapConfig.width + 32, i, 'tile').setOrigin(0, 0));
      }
    }
    this.add(scene.add.image(X - 32, SCREEN_HEIGHT - 32, 'tile_lb').setOrigin(0, 0));
    this.add(scene.add.image(X + mapConfig.width, SCREEN_HEIGHT - 32, 'tile_rb').setOrigin(0, 0));
    for (let i = X; i < X + mapConfig.width; i += 32) {
      this.add(scene.add.image(i, SCREEN_HEIGHT - 32, 'tile_b').setOrigin(0, 0));
    }
    scene.add.existing(this);
  }

  static create(scene: Stage): Tile {
    const tile = new Tile(scene, 0, 0);
    return tile;
  }
}
