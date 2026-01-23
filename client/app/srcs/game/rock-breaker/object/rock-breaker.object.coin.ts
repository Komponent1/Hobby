import { genTestCircle } from "../../utils/dummyObjectGenerator";
import type { Stage } from "../scene/rock-breaker.scene.stage";
import { stateShare } from "../share/rock-breaker.share.state";

export class Coin {
  private _object: Phaser.Physics.Arcade.Sprite;
  private _isSpawned: boolean;

  constructor() {
    this._object = null as unknown as Phaser.Physics.Arcade.Sprite;
    this._isSpawned = false;
  }

  get object() {
    return this._object;
  }
  get isSpawned() {
    return this._isSpawned;
  }

  create(scene: Phaser.Scene) {
    this._object = genTestCircle({
      scene,
      radius: 10,
      x: -100,
      y: -100,
      color: 0xffff00,
    }) as Phaser.Physics.Arcade.Sprite;
  }

  reset() {
    if (this._object) {
      this._object.setPosition(-100, -100);
    }
  }

  spawn(x: number, y: number) {
    if (this._object) {
      this._isSpawned = true;
      this._object.setPosition(x, y);
    }
  }

  collect(scene: Stage) {
    scene.config.addScore(1);
    stateShare.addCoin(1);
    this.destroy();
  }

  destroy() {
    if (this._object) {
      this._isSpawned = false;
      this._object.setPosition(-100, -100);
    }
  }
}
