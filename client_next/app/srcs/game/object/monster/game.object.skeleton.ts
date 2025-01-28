import {SKELETON_HP, SKELETON_ATTACK, SKELETON_SPEED} from '../../constant/game.constant.monster';
import type {Stage} from '../../scenes/game.scene.stage';
import {Monster} from './game.object.monster';
import {MonsterHpbar} from './game.object.monsterHpbar';

export class Skeleton extends Monster {
  constructor(
    hp: MonsterHpbar,
    attack: number,
    speed: number,
    exp: number,
  ) {
    super('skeleton', hp, attack, speed, exp);
  }
  static init(exp: number) {
    const monster = new Skeleton(
      MonsterHpbar.init(SKELETON_HP),
      SKELETON_ATTACK,
      SKELETON_SPEED,
      exp,
    );
    return monster;
  }

  create(scene: Stage, x: number, y: number) {
    super.create(scene, x, y, 'skeleton');
  }
  update(scene: Stage) {
    super.update(scene);
  }
  dead() {
    this.setHp(SKELETON_HP);
    super.dead();
  }
}
