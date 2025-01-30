import { MAP_RATIO, SCREEN_HEIGHT, SCREEN_WIDTH } from "../constant/game.constant.config";
import {} from '../constant/game.constant.monster';
import type {Stage} from '../scenes/game.scene.stage';
import {Vector} from '../utils/vector';
import type {Charactor} from './game.object.charator';
import {BulletStatus} from './game.object.enum';

export class Bullet {
  protected _status: BulletStatus = BulletStatus.LOADED;
  protected _dir: Vector = new Vector(0, 0);
  protected _image!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  protected _speed: number = 0;

  constructor(
    speed: number,
  ) {
    this._speed = speed;
  }
  static init(speed: number) {
    return new Bullet(speed);
  }
  create(scene: Stage) {
    this._image = scene.physics.add.image(-200, -100, 'bullet');
    this._image.body.setOffset(19, 18).setCircle(15);
    scene.mapLayer.add(this._image);
    scene.physics.add.overlap(scene.player.sprite, this._image, () => {
      this.attackTo(scene.player);
    });
  }

  public get bullet() { return this._image; }
  public get position() {
    return {x: this._image.x, y: this._image.y};
  }
  public get status() { return this._status; }

  move() {
    if (this._status === BulletStatus.LOADED) return;
    this._image.x += this._dir.x * this._speed;
    this._image.y += this._dir.y * this._speed;
  }

  attackTo(target: Charactor) {
    target.sprite.setTint(0xff0000);
    setTimeout(() => {
      target.sprite.setTint(0xffffff);
    }, 100);
    target.decreaseHp(10);
    this.destroy();
  }

  shoot(x: number, y: number, dir: Vector) {
    this._image.x = x;
    this._image.y = y;
    this._dir = dir;
    this._status = BulletStatus.SHOOTED;
  }

  checkOutOfScreen() {
    if (
      this._image.x < 0
      || this._image.x > SCREEN_WIDTH * MAP_RATIO
      || this._image.y < 0
      || this._image.y > SCREEN_HEIGHT * MAP_RATIO
    ) {
      this.destroy();
    }
  }

  destroy() {
    this._image.x = -200;
    this._image.y = -100;
    this._dir = new Vector(0, 0);
    this._status = BulletStatus.LOADED;
  }
}
