import {
  PLAYER_IDLE_FRAME, PLAYER_INIT_ATTACK, PLAYER_INIT_HP, PLAYER_INIT_SPEED,
} from '../constant/game.constant.player';
import type {Main} from '../scenes/game.scene.main';
import {MoveDirection} from './game.object.enum';
import {Charactor} from './game.objects.charator';

export class Player extends Charactor {
  constructor(
    sprite: Phaser.GameObjects.Sprite,
    name: string,
    hp: number,
    attack: number,
    private _speed: number,
  ) {
    super(sprite, name, hp, attack);
  }

  moveX(dir: MoveDirection.LEFT | MoveDirection.RIGHT) {
    this._sprite.x += this._speed * dir;
  }
  moveY(dir: MoveDirection.UP | MoveDirection.DOWN) {
    this._sprite.y += this._speed * dir;
  }

  checkHp() {
    if (this.hp <= 0) {
      this.sprite.destroy();
    }
  }

  bodyAttack(target: Charactor) {
    super.attackTo(target);
  }

  static create(scene: Main, x: number, y: number) {
    const idle = {
      key: 'idle_player',
      frames: scene.anims.generateFrameNumbers('player', {start: PLAYER_IDLE_FRAME[0], end: PLAYER_IDLE_FRAME[1]}),
      frameRate: 10,
      repeat: -1,
    };

    scene.anims.create(idle);
    const sprite = scene.physics.add.sprite(x, y, 'player').play('idle_player');

    const player = new Player(sprite, 'player', PLAYER_INIT_HP, PLAYER_INIT_ATTACK, PLAYER_INIT_SPEED);

    return player;
  }
}
