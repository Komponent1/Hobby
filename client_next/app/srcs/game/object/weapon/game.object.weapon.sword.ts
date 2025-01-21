import { PLAYER_HEIGHT, PLAYER_WIDTH } from "../../constant/game.constant.player";
import type { Stage } from "../../scenes/game.scene.stage";
import type {Player} from '../game.object.player';

export class Sword {
  protected _damage: number = 1;
  protected _range: number;
  protected _hitbox!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

  constructor(x: number, y: number, damage: number, range: number, scene: Stage) {
    this._damage = damage;
    this._range = range;

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

  public attack(scene: Stage, player: Player) {
    this._hitbox.body.enable = true;
    this._hitbox.visible = true;

    this._hitbox.x = player.sprite.x + (PLAYER_WIDTH / 2) * player.dir.x;
    this._hitbox.y = player.sprite.y + (PLAYER_HEIGHT / 2) * player.dir.y;

    scene.monster1s.forEach((monster) => {
      scene.physics.add.overlap(this._hitbox, monster.sprite, () => {
        monster.swordAttacked(player);
      });
    });
  }
  public init() {
    this._hitbox.body.enable = false;
    this._hitbox.visible = false;
  }
}
