import { HPbarType } from "../../constant/game.constant.hp";
import {
  BOSS_HEIGHT,
  BOSS_WIDTH,
  SKELETON_BOSS_ATTACK, SKELETON_BOSS_HP,
  SKELETON_BOSS_SHOOT_INTERVAL, SKELETON_BOSS_SPEED,
} from '../../constant/game.constant.monster';
import type {Stage} from '../../scenes/game.scene.stage';
import {Vector} from '../../utils/vector';
import {Bullet} from '../game.object.bullet';
import {BulletStatus, CharactorStatus} from '../game.object.enum';
import {Player} from '../game.object.player';
import {Monster} from './game.object.monster';
import {MonsterHpbar} from './game.object.monsterHpbar';

export class SkeletonBoss extends Monster {
  private _shootTime: number = 0;

  constructor(
    hp: MonsterHpbar,
    attack: number,
    speed: number,
    exp: number,
  ) {
    super('skeleton_boss', hp, attack, speed, exp, BOSS_WIDTH, BOSS_HEIGHT);
  }
  static init(exp: number) {
    const monster = new SkeletonBoss(
      MonsterHpbar.init(SKELETON_BOSS_HP, HPbarType.BOSS),
      SKELETON_BOSS_ATTACK,
      SKELETON_BOSS_SPEED,
      exp,
    );
    return monster;
  }
  shootAttack(target: Player, bullets: Bullet[]) {
    if (this._status === CharactorStatus.DEAD) return;
    if (this._shootTime + SKELETON_BOSS_SHOOT_INTERVAL > Date.now()) return;
    this._shootTime = Date.now();
    let bulletCount = -1;
    for (let i = 0; i < bullets.length; i += 1) {
      if (bullets[i].status === BulletStatus.LOADED) {
        const dir = new Vector(
          target.position.x - this.position.x,
          target.position.y - this.position.y,
        ).normalize().rotate((bulletCount * Math.PI) / 6);
        bullets[i].shoot(this.position.x, this.position.y, dir);
        bulletCount += 1;
        if (bulletCount >= 2) {
          break;
        }
      }
    }
  }

  create(scene: Stage, x: number, y: number) {
    super.create(scene, x, y, 'skeleton_boss');
    this.sprite.setScale(2);
    this.sprite.body.setSize(105, 155).setOffset(80, 65);
  }
  update(scene: Stage) {
    if (this._status === CharactorStatus.DEAD) return;
    super.update(scene);
    this.shootAttack(scene.player, scene.bullets);
  }
  dead() {
    super.dead();
  }
}
