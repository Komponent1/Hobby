import {MONSTER1_HP, MONSTER1_ATTACK, MONSTER1_SPEED} from '../../constant/game.constant.monster';
import type {Stage} from '../../scenes/game.scene.stage';
import {Monster} from './game.object.monster';
import {MonsterHpbar} from './game.object.monsterHpbar';

export class Monster1 extends Monster {
  constructor(
    hp: MonsterHpbar,
    attack: number,
    speed: number,
    exp: number,
  ) {
    super('monster1', hp, attack, speed, exp);
  }
  static init(exp: number) {
    const monster = new Monster1(
      MonsterHpbar.init(MONSTER1_HP),
      MONSTER1_ATTACK,
      MONSTER1_SPEED,
      exp,
    );
    return monster;
  }

  create(scene: Stage, x: number, y: number) {
    super.create(scene, x, y, 'monster1');
  }
  dead() {
    this.setHp(MONSTER1_HP);
    super.dead();
  }
}
