import type {Stage} from '../scenes/game.scene.stage';
import {Vector} from '../utils/vector';
import type {Charactor} from './game.object.charator';
import {BulletStatus} from './game.object.enum';

export class Bullet {
  protected _status: BulletStatus = BulletStatus.LOADED;
  protected _dir: Vector = new Vector(0, 0);

  constructor(
    protected _sprite: Phaser.GameObjects.Sprite,
    protected _speed: number = 10,
  ) {}

  public get sprite() { return this._sprite; }
  public get position() {
    return {x: this._sprite.x, y: this._sprite.y};
  }
  public get status() { return this._status; }

  move() {
    if (this._status === BulletStatus.LOADED) return;
    this._sprite.x += this._dir.x * this._speed;
    this._sprite.y += this._dir.y * this._speed;
  }

  attackTo(target: Charactor) {
    target.decreaseHp(10);
    this.sprite.destroy();
  }

  shoot(x: number, y: number, dir: Vector) {
    this._sprite.x = x;
    this._sprite.y = y;
    this._dir = dir;
    this._status = BulletStatus.SHOOTED;
  }

  destroy() {
    this._sprite.x = -200;
    this._sprite.y = -100;
    this._dir = new Vector(0, 0);
    this._status = BulletStatus.LOADED;
  }

  static create(scene: Stage, x: number, y: number) {
    const sprite = scene.physics.add.sprite(x, y, 'bullet').setOrigin(0.5, 0.5);
    const speed = 10;
    const bullet = new Bullet(sprite, speed);

    return bullet;
  }
}
