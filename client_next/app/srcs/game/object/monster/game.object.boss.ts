import {
  BOSS_ATTACK, BOSS_HP, BOSS_SHOOT_INTERVAL, BOSS_SPEED,
} from '../../constant/game.constant.monster';
import type {Stage} from '../../scenes/game.scene.stage';
import {Vector} from '../../utils/vector';
import {Bullet} from '../game.object.bullet';
import {BulletStatus, CharactorStatus} from '../game.object.enum';
import {Player} from '../game.object.player';
import {Monster} from './game.object.monster';
import {MonsterHpbar} from './game.object.monsterHpbar';

export class Boss extends Monster {
  private _shootTime: number = 0;

  constructor(
    hp: MonsterHpbar,
    attack: number,
    speed: number,
    exp: number,
  ) {
    super('boss', hp, attack, speed, exp);
  }
  static init(exp: number) {
    const monster = new Boss(
      MonsterHpbar.init(BOSS_HP),
      BOSS_ATTACK,
      BOSS_SPEED,
      exp,
    );
    return monster;
  }
  shootAttack(target: Player, bullets: Bullet[]) {
    if (this._status === CharactorStatus.DEAD) return;
    if (this._shootTime + BOSS_SHOOT_INTERVAL > Date.now()) return;
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
    super.create(scene, x, y, 'boss');
    this.sprite.setScale(2);
  }
  dead() {
    this.setHp(BOSS_HP);
    super.dead();
  }
}
