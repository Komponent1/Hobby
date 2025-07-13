import { mapConfig } from '../config/jumfrog.map.config';
import { Scaffolding } from './jumfrog.object.scaffolding';
import type { Stage } from '../scene/jumfrog.scene.stage';

export class ScaffoldingPool {
  private _scaffoldings: Scaffolding[] = [];
  private _scene: Stage;

  constructor(scene: Stage) {
    this._scene = scene;
  }

  add(scaffolding: Scaffolding) {
    this._scaffoldings.push(scaffolding);
    this._scene.add.existing(scaffolding);
    this._scene.physics.add.existing(scaffolding);
  }

  getAll(): Scaffolding[] {
    return this._scaffoldings;
  }

  clear() {
    this._scaffoldings.forEach((scaffolding) => scaffolding.destroy());
    this._scaffoldings = [];
  }

  static create(scene: Stage): ScaffoldingPool {
    const pool = new ScaffoldingPool(scene);
    mapConfig.scaffoldings.forEach((scaffoldingConfig) => {
      const scaffolding = Scaffolding.create(
        scene,
        scaffoldingConfig.x,
        scaffoldingConfig.y,
        scaffoldingConfig.len,
        scaffoldingConfig.movable,
      );
      pool.add(scaffolding);
    });

    return pool;
  }
}
