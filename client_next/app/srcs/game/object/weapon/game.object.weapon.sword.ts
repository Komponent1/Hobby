import {
  PLAYER_HEIGHT, PLAYER_INIT_ATTACK, PLAYER_INIT_ATTACK_RANGE, PLAYER_WIDTH,
} from "../../constant/game.constant.player";
import type { Stage } from "../../scenes/game.scene.stage";
import type {Player} from '../game.object.player';

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
    this._sprite.body.setSize(200, 200);
    this._sprite.body.enable = false;
    this._sprite.visible = false;
  }

  public get position() { return { x: this._sprite.x, y: this._sprite.y }; }
  public get sprite() { return this._sprite; }
  public get damage() { return this._damage; }
  public get range() { return this._range; }

  public attack(player: Player) {
    this._sprite.body.enable = true;
    this._sprite.visible = true;

    this._sprite.x = player.sprite.x + (PLAYER_WIDTH / 2) * player.dir.x;
    this._sprite.y = player.sprite.y + (PLAYER_HEIGHT / 2) * player.dir.y;
    this._sprite.play('slash_effect');
  }
  public init() {
    this._sprite.body.enable = false;
    this._sprite.visible = false;
  }
  public setRange(range: number) {
    this._range = range;
    this._sprite.setSize(range, range);
  }
  public setDamage(damage: number) {
    this._damage = damage;
  }
}
