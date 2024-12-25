import {Charactor} from './game.object.charator';
import type {Main} from '../scenes/game.scene.main';
import {
  MONSTER_ATTACK, MONSTER_HP, MONSTER_IDLE_FRAME, MONSTER_SPEED,
} from '../constant/game.constant.monster';
import {Vector} from '../utils/vector';
import {CharactorStatus} from './game.object.enum';

export class Monster extends Charactor {
  constructor(
    sprite: Phaser.GameObjects.Sprite,
    name: string,
    hp: number,
    attack: number,
    private _speed: number,
  ) {
    super(sprite, name, hp, attack);
  }

  move(dir: Vector, speed: number = this._speed) {
    if (this._status === CharactorStatus.DEAD) return;
    this._sprite.x += dir.x * speed;
    this._sprite.y += dir.y * speed;
  }

  checkHp() {
    if (this.hp <= 0) {
      this._hp = MONSTER_HP;
      this._status = CharactorStatus.DEAD;
      this._sprite.x = -100;
      this._sprite.y = -100;
    }
  }

  attackTo(target: Charactor): boolean {
    if (!super.attackTo(target)) {
      return false;
    }
    const dir = new Vector(
      this.position.x - target.position.x,
      this.position.y - target.position.y,
    ).normalize();
    this.move(dir, this.sprite.width);
    return true;
  }

  spawn(x: number, y: number) {
    this._sprite.x = x;
    this._sprite.y = y;
    this._status = CharactorStatus.ALIVE;
  }

  static create(scene: Main, x: number, y: number) {
    const idle = {
      key: 'idle_monster1',
      frames: scene.anims.generateFrameNumbers('monster1', {start: MONSTER_IDLE_FRAME[0], end: MONSTER_IDLE_FRAME[1]}),
      frameRate: 10,
      repeat: -1,
    };

    scene.anims.create(idle);
    const sprite = scene.physics.add.sprite(x, y, 'monster1').play('idle_monster1');

    const monster = new Monster(sprite, 'monster1', MONSTER_HP, MONSTER_ATTACK, MONSTER_SPEED);
    monster._status = CharactorStatus.DEAD;

    return monster;
  }
}
