import { genTestRectangle } from "../../utils/dummyObjectGenerator";
import type { Stage } from "../scene/rock-breaker.scene.stage";
import type { Rock } from "./rock-breaker.object.rock";

export class Ship {
  private _object: Phaser.Physics.Arcade.Sprite;
  private _speed: number;
  private _stopDistance: number;
  private _fireTimer: number;
  private _fireInterval: number;
  private _isActive: boolean;

  constructor() {
    this._object = null as unknown as Phaser.Physics.Arcade.Sprite;
    this._speed = 300;
    this._stopDistance = 30;
    this._fireTimer = 0;
    this._fireInterval = 3000; // 1초 (밀리초 단위)
    this._isActive = true;
  }
  get object() {
    return this._object;
  }
  get isActive() {
    return this._isActive;
  }

  create(scene: Stage) {
    this._object = genTestRectangle({
      scene,
      w: 50,
      h: 20,
      x: 375,
      y: 550,
    }) as Phaser.Physics.Arcade.Sprite;
  }

  reset() {
    this._object.setPosition(375, 550);
    this._isActive = true;
  }

  update(scene: Stage) {
    if (!this._object) return;
    if (!this._isActive) return;

    const pointer = scene.input.activePointer;

    const dx = pointer.x - this._object.x;
    const dy = pointer.y - this._object.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // 일정 범위 안에 들어오면 멈춤
    if (distance < this._stopDistance) {
      this._object.setVelocity(0, 0);
    } else if (distance > 0) {
      this._object.setVelocity(
        (dx / distance) * this._speed,
        (dy / distance) * this._speed,
      );

      const angle = Math.atan2(dy, dx);
      this._object.setRotation(angle);
    } else {
      this._object.setVelocity(0, 0);
    }

    // 1초마다 총알 발사
    this._fireTimer += scene.game.loop.delta;
    if (this._fireTimer >= this._fireInterval) {
      this.fire(scene);
      this._fireTimer = 0;
    }
  }

  fire(scene: Stage) {
    if (this._object === null) return;
    if (this._isActive === false) return;
    let dir: Phaser.Math.Vector2;

    // 가장 가까운 rock 찾기
    let closestRock: Rock | null = null;
    let minDistance = Infinity;

    scene.rockPool.pool.forEach((rock) => {
      if (rock.isActive) {
        const dx = rock.object.x - this._object.x;
        const dy = rock.object.y - this._object.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < minDistance) {
          minDistance = distance;
          closestRock = rock;
        }
      }
    });

    // 가장 가까운 rock 방향으로 발사, 없으면 ship 회전 방향으로 발사
    if (closestRock) {
      const dx = (closestRock as Rock).object.x - this._object.x;
      const dy = (closestRock as Rock).object.y - this._object.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      dir = new Phaser.Math.Vector2(dx / length, dy / length);
      scene.bulletPool.fireBullet(this._object.x, this._object.y, dir, 1);
    }
  }

  destroy() {
    this._object.setVelocity(0, 0);
    this._isActive = false;
  }
}
