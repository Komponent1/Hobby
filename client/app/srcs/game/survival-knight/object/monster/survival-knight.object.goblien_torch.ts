import { HPbarType } from "../../constant/survival-knight.constant.hp";
import { GOBLIN_TORCH } from "../../constant/survival-knight.constant.object";
import type {Stage} from '../../scenes/survival-knight.scene.stage';
import {Monster} from './survival-knight.object.monster';
import {MonsterHpbar} from './survival-knight.object.monsterHpbar';

export class GoblinTorch extends Monster {
  constructor() {
    super(
      'goblin_torch',
      MonsterHpbar.init(GOBLIN_TORCH.HP, HPbarType.MONSTER),
      GOBLIN_TORCH.ATTACK,
      GOBLIN_TORCH.SPEED,
      GOBLIN_TORCH.EXP,
      GOBLIN_TORCH.W,
      GOBLIN_TORCH.H,
    );
  }
  static init() {
    return new GoblinTorch();
  }

  create(scene: Stage, x: number, y: number) {
    super.create(scene, x, y, 'goblin_torch');
  }
  update(scene: Stage) {
    super.update(scene);
  }
  dead() {
    super.dead();
  }
}
