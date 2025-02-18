import {
  BASE_H, BASE_W, BlockDestroyType, BRICK_FONT_SIZE, BRICK_FONT_STROKE, BRICK_H, BRICK_W, MARGIN,
  ROW,
  WINDOW_POS_X,
  WINDOW_POS_Y,
} from '../constant/ten-game.constant.stage';
import type {Stage} from '../scene/ten-game.scene.stage';
import { BlockBase } from "./ten-game.object.blockbase";

export class Brick extends BlockBase {
  private _back!: Phaser.GameObjects.Rectangle;
  private _brick!: Phaser.GameObjects.Image;
  private _text!: Phaser.GameObjects.Text;

  private _destroyed = false;
  private _startY = 0;
  private _endY = 0;
  private _startTime = Date.now();
  private _duration = 0;
  private _dirx = 1;

  get destroyed() { return this._destroyed; }

  static create(
    scene: Stage,
    i: number,
    j: number,
    value: number,
    container: Phaser.GameObjects.Container,
  ) {
    const brick = new Brick();
    brick._back = scene.add.rectangle(0, 0, BASE_W, BASE_H, 0xffffff).setOrigin(0, 0);
    brick._brick = scene.add.sprite(
      (BASE_W - BRICK_W) / 2,
      (BASE_H - BRICK_H) / 2,
      'bricks',
      Math.round(Math.random() * 4),
    ).setScale(BRICK_W / BASE_W).setOrigin(0, 0);
    brick._text = scene.add.text(
      BASE_W / 2,
      BASE_H / 2,
      `${value}`,
      {
        color: "#000", fontSize: BRICK_FONT_SIZE, fontStyle: 'bold', fontFamily: 'noto',
      },
    ).setOrigin(0.5, 0.5).setStroke("#fff", BRICK_FONT_STROKE);
    brick._pos = {i, j};
    brick._container = scene.add.container(
      WINDOW_POS_X + BASE_W * j + MARGIN * (j + 1),
      WINDOW_POS_Y + BASE_H * (i - ROW / 2) + MARGIN * (i - ROW / 2 + 1),
      [brick._back, brick._brick, brick._text],
    );
    container.add(brick._container);
    return brick;
  }
  check() {
    this._back.setFillStyle(0xff0000, 1);
  }
  release() {
    this._back.setFillStyle(0xffffff, 1);
  }
  destroy(type: BlockDestroyType) {
    if (type === BlockDestroyType.Change) {
      this._container.destroy();
      return;
    }
    if (type === BlockDestroyType.Drag) {
      this._destroyed = true;
      this._startY = this._container.y;
      this._endY = this._container.y + 500;
      this._startTime = Date.now();
      this._duration = 500;
      this._dirx = Math.random() > 0.5 ? 1 : -1;
      return;
    }
    if (type === BlockDestroyType.Boom) {
      this._container.destroy();
    }
  }
  update() {
    if (this._destroyed) {
      const elapsedTime = Date.now() - this._startTime;
      if (elapsedTime < this._duration) {
        const t = elapsedTime / this._duration;
        const arcHeight = 10;
        const newY = Phaser.Math.Interpolation.CatmullRom(
          [this._startY, this._startY - arcHeight, this._endY],
          t,
        );
        this._container.x += this._dirx * 2;
        this._container.rotation += 0.1;
        this._container.y = newY;
      } else {
        this._container.destroy();
        this._destroyed = false;
      }
    }
  }
}
