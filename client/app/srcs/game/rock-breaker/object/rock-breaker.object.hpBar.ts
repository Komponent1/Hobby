import type { Stage } from "../scene/rock-breaker.scene.stage";

export class HpBar {
  private _container: Phaser.GameObjects.Container;
  private _background: Phaser.GameObjects.Rectangle;
  private _bar: Phaser.GameObjects.Rectangle;
  private _maxWidth: number;
  private _height: number;

  constructor() {
    this._container = null as unknown as Phaser.GameObjects.Container;
    this._background = null as unknown as Phaser.GameObjects.Rectangle;
    this._bar = null as unknown as Phaser.GameObjects.Rectangle;
    this._maxWidth = 40;
    this._height = 6;
  }

  get container() {
    return this._container;
  }

  create(scene: Stage, x: number, y: number) {
    this._background = scene.add.rectangle(
      x,
      y,
      this._maxWidth,
      this._height,
      0x000000,
    );
    this._background.setOrigin(0.5, 0.5);

    this._bar = scene.add.rectangle(
      x - this._maxWidth / 2,
      y,
      this._maxWidth,
      this._height,
      0xff0000,
    );
    this._bar.setOrigin(0, 0.5);
    this._container = scene.add.container(0, 0, [this._background, this._bar]);
  }

  redraw(ratio: number) {
    this._bar.width = this._maxWidth * Phaser.Math.Clamp(ratio, 0, 1);
  }

  setPosition(x: number, y: number) {
    this._container.setPosition(x, y);
  }

  destroy() {
    this._container.destroy();
  }
}
