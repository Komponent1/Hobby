import {CharactorStatus} from './game.object.enum';
import {Hpbar} from './base/game.object.hpbar';
import { Vector } from "../utils/vector";

export class Charactor {
  protected _status: CharactorStatus = CharactorStatus.IDLE;
  protected _hp: Hpbar;
  protected _attack: number;
  protected _name: string;
  protected _dir: Vector = new Vector(1, 0);
  protected _speed: number = 0;

  protected _sprite!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  public attackedTime = 0;

  constructor(
    name: string,
    hp: Hpbar,
    attack: number,
    speed: number,
  ) {
    this._hp = hp;
    this._attack = attack;
    this._name = name;
    this._speed = speed;
  }

  public get attack() { return this._attack; }
  public get hp() { return this._hp; }
  public get sprite() { return this._sprite; }
  public get name() { return this._name; }
  public get status() { return this._status; }
  public get position() {
    return {x: this._sprite.x, y: this._sprite.y};
  }

  public setHp(hp: number) {
    this._hp.setHp(hp);
  }
  public setDir(x: number, y: number) {
    this._dir = new Vector(x, y).normalize();
  }
  public setSpeed(speed: number) {
    this._speed = speed;
  }

  public attackTo(target: Charactor): boolean {
    if (target.status === CharactorStatus.DEAD) return false;
    if (
      target.attackedTime !== 0
      && Date.now() - target.attackedTime < 1000
    ) return false;

    target.changeAttackedTime(Date.now());
    target.decreaseHp(this.attack);
    return true;
  }

  public decreaseHp(damage: number) {
    this._hp.decreaseHp(damage);
    if (this._hp.hp <= 0) {
      this._status = CharactorStatus.DEAD;
    }
  }
  public changeAttackedTime(time: number) {
    this.attackedTime = time;
  }
}
