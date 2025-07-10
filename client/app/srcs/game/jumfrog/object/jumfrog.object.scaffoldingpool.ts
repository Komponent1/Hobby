import { mapConfig } from '../config/jumfrog.map.config';
import { Scaffolding } from './jumfrog.object.scaffolding';

export class ScaffoldingPool {
  private _scaffoldings: Scaffolding[] = [];
  private _scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this._scene = scene;
  }

  add(scaffolding: Scaffolding) {
    this._scaffoldings.push(scaffolding);
    this._scene.add.existing(scaffolding.container);
    this._scene.physics.add.existing(scaffolding.container);
  }

  getAll(): Scaffolding[] {
    return this._scaffoldings;
  }

  clear() {
    this._scaffoldings.forEach((scaffolding) => scaffolding.container.destroy());
    this._scaffoldings = [];
  }

  static create(scene: Phaser.Scene): ScaffoldingPool {
    const pool = new ScaffoldingPool(scene);
    mapConfig.scaffoldings.forEach((scaffoldingConfig) => {
      const scaffolding = Scaffolding.create(
        scene,
        scaffoldingConfig.x,
        scaffoldingConfig.y,
      );
      pool.add(scaffolding);
    });

    return pool;
  }
}
