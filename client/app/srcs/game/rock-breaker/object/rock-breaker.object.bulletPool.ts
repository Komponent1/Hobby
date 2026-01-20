import type { Stage } from "../scene/rock-breaker.scene.stage";
import { Bullet } from "./rock-breaker.object.bullet";

export class BulletPool {
  private _pool: Bullet[];

  constructor(initialSize: number) {
    this._pool = [];
    for (let i = 0; i < initialSize; i += 1) {
      const bullet = new Bullet();
      this._pool.push(bullet);
    }
  }

  get pool() {
    return this._pool;
  }

  create(scene: Stage) {
    this.pool.forEach((bullet) => {
      bullet.create(scene);
    });
  }

  update() {
    this.pool.forEach((bullet) => {
      bullet.update();
    });
  }

  fireBullet(x: number, y: number, dir: Phaser.Math.Vector2, damage: number) {
    for (let i = 0; i < this.pool.length; i += 1) {
      if (this.pool[i] && !this.pool[i].isActive) {
        this.pool[i].fire(x, y, dir, damage);
        break;
      }
    }
  }
}
