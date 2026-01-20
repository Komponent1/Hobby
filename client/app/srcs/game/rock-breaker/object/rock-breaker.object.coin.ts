import { genTestCircle } from "../../utils/dummyObjectGenerator";
import { Stage } from "../scene/rock-breaker.scene.stage";

export class Coin {
  private _object: Phaser.Physics.Arcade.Sprite;

  constructor() {
    this._object = null as unknown as Phaser.Physics.Arcade.Sprite;
  }

  get object() {
    return this._object;
  }

  create(scene: Phaser.Scene) {
    this._object = genTestCircle({
      scene,
      radius: 10,
      x: -100,
      y: -100,
      color: 0xffff00,
    });
  }

  spawn(x: number, y: number) {
    if (this._object) {
      this._object.setPosition(x, y);
    }
  }

  collect(scene: Stage) {
    scene.config.addScore(1);
    scene.shareConfig.addCoin(1);
    this.destory();
  }

  destory() {
    if (this._object) {
      this._object.setPosition(-100, -100);
    }
  }
}
