import {
  PLAYER_IDLE_FRAME, PLAYER_INIT_ATTACK, PLAYER_INIT_HP, PLAYER_INIT_SPEED,
} from '../constant/game.constant.player';
import type {Stage} from '../scenes/game.scene.stage';
import {MoveDirection} from './game.object.enum';
import {Charactor} from './game.object.charator';
import {Bullet} from './game.object.bullet';
import {Vector} from '../utils/vector';
import { PlayerHpbar } from "./ui/game.object.playerHpbar";

export class Player extends Charactor {
  protected _hp: PlayerHpbar;
  public bullets: Bullet[] = [];

  constructor(
    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    name: string,
    hp: PlayerHpbar,
    attack: number,
    private _speed: number,
  ) {
    super(sprite, name, hp, attack);
    this._hp = hp;
  }
  get hp() { return this._hp; }

  moveX(dir: MoveDirection.LEFT | MoveDirection.RIGHT) {
    this._sprite.x += this._speed * dir;
  }
  moveY(dir: MoveDirection.UP | MoveDirection.DOWN) {
    this._sprite.y += this._speed * dir;
  }

  checkHp() {
    if (this.hp.hp <= 0) {
      this.sprite.destroy();
    }
  }

  bodyAttack(target: Charactor) {
    super.attackTo(target);
  }
  shootAttack(target: Charactor) {
    const bullet = this.bullets.find((b) => b.status === 'LOADED');
    if (bullet) {
      bullet.shoot(
        this.sprite.x,
        this.sprite.y,
        new Vector(
          target.sprite.x - this.sprite.x,
          target.sprite.y - this.sprite.y,
        ).normalize(),
      );
    }
  }

  static create(scene: Stage, x: number, y: number) {
    const idle = {
      key: 'idle_player',
      frames: scene.anims.generateFrameNumbers('player', {start: PLAYER_IDLE_FRAME[0], end: PLAYER_IDLE_FRAME[1]}),
      frameRate: 10,
      repeat: -1,
    };

    scene.anims.create(idle);
    const sprite = scene.physics.add.sprite(x, y, 'player').play('idle_player');

    const player = new Player(
      sprite,
      'player',
      new PlayerHpbar(
        scene,
        0,
        0,
        PLAYER_INIT_HP,
        PLAYER_INIT_HP,
      ),
      PLAYER_INIT_ATTACK,
      PLAYER_INIT_SPEED,
    );
    scene.mapLayer.add(player.sprite);
    // player.bullets = Array.from({length: 100}, () => Bullet.create(scene, -200, -100));
    player.sprite.setCollideWorldBounds(true);

    return player;
  }
}
