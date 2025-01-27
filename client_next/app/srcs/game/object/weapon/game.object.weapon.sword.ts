import {
  PLAYER_HEIGHT, PLAYER_INIT_ATTACK, PLAYER_INIT_ATTACK_RANGE, PLAYER_WIDTH,
} from "../../constant/game.constant.player";
import type { Stage } from "../../scenes/game.scene.stage";
import type {Player} from '../game.object.player';

export class Sword {
  protected _damage: number = 1;
  protected _range: number;

  protected _hitbox!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

  constructor(damage: number, range: number) {
    this._damage = damage;
    this._range = range;
  }
  static init() {
    return new Sword(PLAYER_INIT_ATTACK, PLAYER_INIT_ATTACK_RANGE);
  }
  create(scene: Stage, x: number, y: number) {
    this._hitbox = scene.add.ellipse(
      x,
      y,
      this._range,
      this._range,
      0x000000,
      0.5,
    ) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    scene.physics.add.existing(this._hitbox);
    this._hitbox.body.enable = false;
  }

  public get position() { return { x: this._hitbox.x, y: this._hitbox.y }; }
  public get hitbox() { return this._hitbox; }
  public get damage() { return this._damage; }
  public get range() { return this._range; }

  public attack(player: Player) {
    this._hitbox.body.enable = true;
    this._hitbox.visible = true;

    this._hitbox.x = player.sprite.x + (PLAYER_WIDTH / 2) * player.dir.x;
    this._hitbox.y = player.sprite.y + (PLAYER_HEIGHT / 2) * player.dir.y;
  }
  public init() {
    this._hitbox.body.enable = false;
    this._hitbox.visible = false;
  }
  public setRange(range: number) {
    this._range = range;
    this._hitbox.setSize(range, range);
  }
  public setDamage(damage: number) {
    this._damage = damage;
  }
}
