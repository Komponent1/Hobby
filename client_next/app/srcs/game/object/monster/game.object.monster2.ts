import {
  MONSTER2_ATTACK, MONSTER2_HP, MONSTER2_SPEED, SHOOT_INTERVAL,
} from '../../constant/game.constant.monster';
import type {Stage} from '../../scenes/game.scene.stage';
import {Vector} from '../../utils/vector';
import {Bullet} from '../game.object.bullet';
import {BulletStatus, CharactorStatus} from '../game.object.enum';
import {Player} from '../game.object.player';
import {Monster} from './game.object.monster';
import {MonsterHpbar} from './game.object.monsterHpbar';

export class Monster2 extends Monster {
  private _shootTime: number = 0;

  constructor(
    hp: MonsterHpbar,
    attack: number,
    speed: number,
    exp: number,
  ) {
    super('monster2', hp, attack, speed, exp);
  }
  static init(exp: number) {
    const monster = new Monster2(
      MonsterHpbar.init(MONSTER2_HP),
      MONSTER2_ATTACK,
      MONSTER2_SPEED,
      exp,
    );
    return monster;
  }
  shootAttack(target: Player, bullets: Bullet[]) {
    if (this._status === CharactorStatus.DEAD) return;
    if (this._shootTime + SHOOT_INTERVAL > Date.now()) return;
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
    super.create(scene, x, y, 'monster2');
  }
  update(scene: Stage): void {
    if (this._status === CharactorStatus.DEAD) return;
    super.update(scene);
    this.shootAttack(scene.player, scene.bullets);
  }
  dead() {
    this.setHp(MONSTER2_HP);
    super.dead();
  }
}
