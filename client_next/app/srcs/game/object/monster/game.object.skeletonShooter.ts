import { HPbarType } from "../../constant/game.constant.hp";
import {
  SKELETON_SHOOTER_ATTACK, SKELETON_SHOOTER_HEIGHT, SKELETON_SHOOTER_HP,
  SKELETON_SHOOTER_SHOOT_INTERVAL, SKELETON_SHOOTER_SPEED,
  SKELETON_SHOOTER_WIDTH,
} from '../../constant/game.constant.monster';
import type {Stage} from '../../scenes/game.scene.stage';
import {Vector} from '../../utils/vector';
import {Bullet} from '../game.object.bullet';
import {BulletStatus, CharactorStatus} from '../game.object.enum';
import {Player} from '../game.object.player';
import {Monster} from './game.object.monster';
import {MonsterHpbar} from './game.object.monsterHpbar';

export class SkeletonShooter extends Monster {
  private _shootTime: number = 0;

  constructor(
    hp: MonsterHpbar,
    attack: number,
    speed: number,
    exp: number,
  ) {
    super('skeleton_shooter', hp, attack, speed, exp, SKELETON_SHOOTER_WIDTH, SKELETON_SHOOTER_HEIGHT);
  }
  static init(exp: number) {
    const monster = new SkeletonShooter(
      MonsterHpbar.init(SKELETON_SHOOTER_HP, HPbarType.MONSTER),
      SKELETON_SHOOTER_ATTACK,
      SKELETON_SHOOTER_SPEED,
      exp,
    );
    return monster;
  }
  shootAttack(target: Player, bullets: Bullet[]) {
    if (this._status === CharactorStatus.DEAD) return;
    if (this._shootTime + SKELETON_SHOOTER_SHOOT_INTERVAL > Date.now()) return;
    this._shootTime = Date.now();
    const dir = new Vector(
      target.position.x - this.position.x,
      target.position.y - this.position.y,
    ).normalize();
    for (let i = 0; i < bullets.length; i += 1) {
      if (bullets[i].status === BulletStatus.LOADED) {
        bullets[i].shoot(this.position.x, this.position.y, dir);
        break;
      }
    }
  }

  create(scene: Stage, x: number, y: number) {
    super.create(scene, x, y, 'skeleton_shooter');
  }
  update(scene: Stage): void {
    super.update(scene);
    // this.shootAttack(scene.player, scene.bullets);
  }
  dead() {
    super.dead();
  }
}
