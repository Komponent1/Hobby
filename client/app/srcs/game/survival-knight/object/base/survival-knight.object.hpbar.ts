import { HP_LAYOUT, HPbarType } from "../../constant/survival-knight.constant.hp";
import type { Stage } from "../../scenes/survival-knight.scene.stage";

/* eslint-disable function-paren-newline */
export class Hpbar {
  protected _hp: number;
  protected _maxHp: number;

  protected _hpbarX!: number;
  protected _hpbarY!: number;
  protected _hpbar!: Phaser.GameObjects.Image;
  protected _hpbarBg!: Phaser.GameObjects.Image;
  protected _hpContainer!: Phaser.GameObjects.Container;

  protected _type!: HPbarType;

  constructor(hp: number, maxHp: number, type: HPbarType) {
    this._hp = hp;
    this._maxHp = maxHp;
    this._type = type;
  }
  public get hp() { return this._hp; }
  public get maxHp() { return this._maxHp; }
  public create(scene: Stage, x: number, y: number) {
    this._hpbarX = x;
    this._hpbarY = y;
    this._hpbarBg = scene.add.image(0, 0, 'ui', 'stage/Boss_HP_Table.png')
      .setOrigin(0, 0)
      .setDisplaySize(HP_LAYOUT[this._type].bgW, HP_LAYOUT[this._type].bgH).setDepth(2);
    this._hpbar = scene.add.image(HP_LAYOUT[this._type].marginX, HP_LAYOUT[this._type].marginY, 'ui', 'stage/Boss_HP_Bar_2.png')
      .setOrigin(0, 0)
      .setDisplaySize(HP_LAYOUT[this._type].barW, HP_LAYOUT[this._type].barH).setDepth(3);
    this._hpContainer = scene.add.container(x, y, [this._hpbarBg, this._hpbar]);
  }

  public setHp(hp: number) {
    this._hp = hp;
    this.draw();
  }
  public decreaseHp(damage: number) {
    const hp = this._hp - damage;
    if (hp < 0) {
      this._hp = 0;
    } else {
      this._hp = hp;
    }
    this.draw();
  }

  public setMaxHp(maxHp: number) {
    this._maxHp = maxHp;
    this.draw();
  }

  protected draw() {
    const hpRatio = this._hp / this._maxHp;
    if (this._type === HPbarType.PLAYER) {
      this._hpContainer.setPosition(this._hpbarX, this._hpbarY);
    } else {
      this._hpContainer.setPosition(this._hpbarX - HP_LAYOUT[this._type].bgW / 2, this._hpbarY);
    }
    this._hpbar.setDisplaySize(
      HP_LAYOUT[this._type].barW * hpRatio,
      HP_LAYOUT[this._type].barH,
    );
  }

  public destroy() {
    this._hpbar.destroy();
    this._hpbarBg.destroy();
  }
}
