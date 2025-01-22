/* eslint-disable function-paren-newline */
export class Hpbar {
  protected _hp: number;
  protected _maxHp: number;
  protected _hpbarWidth: number;
  protected _hpbarHeight: number;

  protected _hpbarX!: number;
  protected _hpbarY!: number;
  protected _hpbar!: Phaser.GameObjects.Graphics;
  protected _hpbarBg!: Phaser.GameObjects.Graphics;

  constructor(hp: number, maxHp: number) {
    this._hp = hp;
    this._maxHp = maxHp;
    this._hpbarWidth = 32;
    this._hpbarHeight = 5;
  }
  public get hp() { return this._hp; }
  public create(scene: Phaser.Scene, x: number, y: number) {
    this._hpbar = scene.add.graphics();
    this._hpbarBg = scene.add.graphics();
    this._hpbarX = x;
    this._hpbarY = y;
    this.draw();
  }

  public setHp(hp: number) {
    this._hp = hp;
    this.draw();
  }
  public decreaseHp(damage: number) {
    this._hp -= damage;
    this.draw();
  }

  public setMaxHp(maxHp: number) {
    this._maxHp = maxHp;
    this.draw();
  }

  protected draw() {
    const hpW = this._hpbarWidth * (this._hp / this._maxHp);
    const hpBgW = this._hpbarWidth - hpW;
    this._hpbar.clear();
    this._hpbar.fillStyle(0x00ff00, 1);
    this._hpbar.fillRect(
      this._hpbarX, this._hpbarY, hpW, this._hpbarHeight,
    );
    this._hpbarBg.clear();
    this._hpbarBg.fillStyle(0xff0000, 1);
    this._hpbarBg.fillRect(
      this._hpbarX + hpW, this._hpbarY, hpBgW, this._hpbarHeight,
    );
  }

  public destroy() {
    this._hpbar.destroy();
    this._hpbarBg.destroy();
  }
}
