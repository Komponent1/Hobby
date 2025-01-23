import {Charactor} from '../game.object.charator';
import type {Stage} from '../../scenes/game.scene.stage';
import {
  MONSTER_ATTACK, MONSTER_HEIGHT, MONSTER_HP, MONSTER_IDLE_FRAME,
  MONSTER_SPEED,
  MONSTER_WIDTH,
} from '../../constant/game.constant.monster';
import {Vector} from '../../utils/vector';
import {CharactorStatus} from '../game.object.enum';
import { MonsterHpbar } from "./game.object.monsterHpbar";
import {Player} from '../game.object.player';

export class Monster extends Charactor {
  protected _hp: MonsterHpbar;
  protected _exp: number;

  constructor(
    name: string,
    hp: MonsterHpbar,
    attack: number,
    speed: number,
    exp: number,
  ) {
    super(name, hp, attack, speed);
    this._hp = hp;
    this._exp = exp;
  }
  static init(exp: number) {
    const monster = new Monster(
      'monster1',
      MonsterHpbar.init(),
      MONSTER_ATTACK,
      MONSTER_SPEED,
      exp,
    );
    return monster;
  }
  create(scene: Stage, x: number, y: number) {
    const idle = {
      key: 'idle_monster1',
      frames: scene.anims.generateFrameNumbers('monster1', {start: MONSTER_IDLE_FRAME[0], end: MONSTER_IDLE_FRAME[1]}),
      frameRate: 10,
      repeat: -1,
    };

    scene.anims.create(idle);
    this._sprite = scene.physics.add.sprite(x, y, 'monster1').play('idle_monster1');
    this._hp.create(scene, x - MONSTER_WIDTH / 2, y - MONSTER_HEIGHT / 2);

    scene.mapLayer.add(this._sprite);
    this._status = CharactorStatus.DEAD;
  }

  move(dir: Vector, speed: number = this._speed) {
    if (this._status === CharactorStatus.DEAD) return;
    this._sprite.x += dir.x * speed;
    this._sprite.y += dir.y * speed;
    this._hp.move(this._sprite.x - MONSTER_WIDTH / 2, this._sprite.y - MONSTER_HEIGHT / 2);
  }

  checkHp(scene: Stage) {
    if (this.hp.hp <= 0) {
      this.killed(scene);
    }
  }

  attackTo(target: Charactor): boolean {
    if (!super.attackTo(target)) {
      return false;
    }
    return true;
  }
  swordAttacked(player: Player) {
    if (this.attackedTime !== 0 && Date.now() - this.attackedTime < 500) return false;
    this.changeAttackedTime(Date.now());
    this._hp.decreaseHp(player.weapon.damage);
    const dir = new Vector(
      this.position.x - player.position.x,
      this.position.y - player.position.y,
    ).normalize();
    this.move(dir, this.sprite.width);
    return true;
  }

  spawn(x: number, y: number) {
    this._sprite.x = x;
    this._sprite.y = y;
    this._status = CharactorStatus.IDLE;
  }
  dead() {
    this._hp.setHp(MONSTER_HP);
    this._status = CharactorStatus.DEAD;
    this._sprite.x = -100;
    this._sprite.y = -100;
    this._hp.move(this._sprite.x - MONSTER_WIDTH / 2, this._sprite.y - MONSTER_HEIGHT / 2);
  }
  killed(scene: Stage) {
    scene.player.addExp(this._exp);
    this.dead();
  }
}
