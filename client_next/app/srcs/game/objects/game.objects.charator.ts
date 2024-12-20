import {CharactorStatus} from './game.object.enum';

export class Charactor {
  protected status: CharactorStatus = CharactorStatus.ALIVE;

  constructor(
    protected _sprite: Phaser.GameObjects.Sprite,
    protected _name: string,
    protected _hp: number,
    protected _attack: number,
  ) {}

  public get attack() {
    return this._attack;
  }

  public get position() {
    return {x: this._sprite.x, y: this._sprite.y};
  }

  public attackTo(target: Charactor) {
    this.decreaseHp(target.attack);
  }

  public decreaseHp(damage: number) {
    this._hp -= damage;
    if (this._hp <= 0) {
      this.status = CharactorStatus.DEAD;
    }
  }
}
