import {ATTACKER_HP, ATTACKER_ATTACK, ATTACKER_SPEED} from '../../constant/game.constant.monster';
import type {Stage} from '../../scenes/game.scene.stage';
import {Monster} from './game.object.monster';
import {MonsterHpbar} from './game.object.monsterHpbar';

export class Attacker extends Monster {
  constructor(
    hp: MonsterHpbar,
    attack: number,
    speed: number,
    exp: number,
  ) {
    super('attacker', hp, attack, speed, exp);
  }
  static init(exp: number) {
    const monster = new Attacker(
      MonsterHpbar.init(ATTACKER_HP),
      ATTACKER_ATTACK,
      ATTACKER_SPEED,
      exp,
    );
    return monster;
  }

  create(scene: Stage, x: number, y: number) {
    super.create(scene, x, y, 'attacker');
  }
  update(scene: Stage) {
    super.update(scene);
  }
  dead() {
    this.setHp(ATTACKER_HP);
    super.dead();
  }
}
