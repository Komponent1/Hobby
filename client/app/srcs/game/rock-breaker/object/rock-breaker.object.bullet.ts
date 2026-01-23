import { genTestRectangle } from "../../utils/dummyObjectGenerator";

export class Bullet {
  private _object: Phaser.Physics.Arcade.Sprite;
  private _isActive: boolean;
  private _speed: number;
  private _damage: number;

  get damage() {
    return this._damage;
  }

  constructor() {
    this._object = null as unknown as Phaser.Physics.Arcade.Sprite;
    this._isActive = false;
    this._speed = 600;
    this._damage = 1;
  }

  get object() {
    return this._object;
  }

  get isActive() {
    return this._isActive;
  }

  create(scene: Phaser.Scene) {
    this._object = genTestRectangle({
      scene,
      w: 10,
      h: 4,
      x: -100,
      y: -200,
      color: 0xff0000,
    }) as Phaser.Physics.Arcade.Sprite;
    if (this._object.body) {
      (this._object.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(
        false,
      );
    }
  }

  reset() {
    this._object.setPosition(-100, -200);
    this._object.setVelocity(0, 0);
    this._isActive = false;
  }

  fire(x: number, y: number, direction: Phaser.Math.Vector2, damage = 1) {
    this._damage = damage;
    const angle = Math.atan2(direction.y, direction.x);
    this._object.setRotation(angle);
    this._object.setPosition(x, y);
    this._object.setVelocity(
      direction.x * this._speed,
      direction.y * this._speed,
    );
    this._isActive = true;
  }

  update() {
    if (!this._object) return;
    if (!this._isActive) return;

    const { bounds } = this._object.scene.physics.world;
    const isInsideWorld =
      this._object.x >= bounds.x &&
      this._object.x <= bounds.x + bounds.width &&
      this._object.y >= bounds.y &&
      this._object.y <= bounds.y + bounds.height;

    if (!isInsideWorld) {
      this.destroy();
    }
  }

  destroy() {
    this._object.setPosition(-100, -200);
    this._object.setVelocity(0, 0);
    this._isActive = false;
  }
}
