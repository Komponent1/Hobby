import type { Stage } from "../scene/rock-breaker.scene.stage";
import { Rock } from "./rock-breaker.object.rock";

export class RockPool {
  private _pool: Rock[];

  constructor(initialSize: number) {
    this._pool = [];
    for (let i = 0; i < initialSize; i += 1) {
      const rock = new Rock();
      this.pool.push(rock);
    }
  }
  get pool() {
    return this._pool;
  }

  create(scene: Stage) {
    this.pool.forEach((rock) => {
      rock.create(scene);
    });
  }

  update() {
    this.pool.forEach((rock) => {
      rock.update();
    });
  }

  spawnRock(scene: Stage) {
    for (let i = 0; i < this.pool.length; i += 1) {
      if (this.pool[i] && !this.pool[i].isActive) {
        this.pool[i].spawn(scene);
        break;
      }
    }
  }
}
