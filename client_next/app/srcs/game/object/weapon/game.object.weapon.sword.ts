import {
  PLAYER_INIT_ATTACK, PLAYER_INIT_ATTACK_RANGE,
} from "../../constant/game.constant.player";
import type { Stage } from "../../scenes/game.scene.stage";

export class Sword {
  protected _sprite!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  protected _damage: number = 1;
  protected _range: number;

  constructor(damage: number, range: number) {
    this._damage = damage;
    this._range = range;
  }
  static init() {
    return new Sword(PLAYER_INIT_ATTACK, PLAYER_INIT_ATTACK_RANGE);
  }
  create(scene: Stage, x: number, y: number) {
    this._sprite = scene.physics.add.sprite(x, y, 'slash');
    this._sprite.setScale(1.2);
    this._sprite.body.setSize(80, 160);
    this._sprite.body.enable = false;
    this._sprite.visible = false;
  }

  public get position() { return { x: this._sprite.x, y: this._sprite.y }; }
  public get sprite() { return this._sprite; }
  public get damage() { return this._damage; }
  public get range() { return this._range; }

  public attack(scene: Stage) {
    this._sprite.body.enable = true;
    this._sprite.visible = true;

    this._sprite.x = scene.player.dir.x * 80;
    this._sprite.y = scene.player.dir.y * 80;
    if (scene.player.dir.y !== 0) {
      this._sprite.setSize(160, 80);
      this._sprite.setAngle((this._sprite.flipX ? -90 : 90) * scene.player.dir.y);
    } else {
      this._sprite.setSize(80, 160);
      this._sprite.setAngle(0);
    }
    this._sprite.play('slash_effect');
  }
  public init() {
    this._sprite.body.enable = false;
    this._sprite.visible = false;
  }
  public setRange(range: number) {
    this._range = range;
    this._sprite.setSize(range, range);
    this._sprite.setOrigin(0, 0);
  }
  public setDamage(damage: number) {
    this._damage = damage;
  }
}
