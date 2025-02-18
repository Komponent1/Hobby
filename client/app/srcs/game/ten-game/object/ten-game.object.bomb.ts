import {
  BASE_H, BASE_W, BlockDestroyType, BOMBS_DURATION, BOMBS_MOVE_POS,
  BRICK_FONT_SIZE, BRICK_FONT_STROKE, MARGIN, ROW,
  WINDOW_POS_X, WINDOW_POS_Y,
} from '../constant/ten-game.constant.stage';
import type {Stage} from '../scene/ten-game.scene.stage';
import { BlockBase } from "./ten-game.object.blockbase";

export class Bomb extends BlockBase {
  private _bomb!: Phaser.GameObjects.Image;
  private _text!: Phaser.GameObjects.Text;

  private _destroyed = false;
  private _startPos: {x: number; y: number} = {x: 0, y: 0};
  private _startTime = 0;
  get destroyed() { return this._destroyed; }

  static create(
    scene: Stage,
    i: number,
    j: number,
    value: number,
    container: Phaser.GameObjects.Container,
  ) {
    const bomb = new Bomb();
    bomb._bomb = scene.add.image(
      0,
      0,
      'bomb-normal',
    ).setOrigin(0, 0).setScale(BASE_W / 100);
    bomb._text = scene.add.text(
      BASE_W / 2,
      BASE_H / 2,
      `${value}`,
      {
        color: "#000", fontSize: BRICK_FONT_SIZE, fontStyle: 'bold', fontFamily: 'noto',
      },
    ).setOrigin(0.5, 0.5).setStroke("#fff", BRICK_FONT_STROKE);
    bomb._pos = {i, j};
    bomb._container = scene.add.container(
      WINDOW_POS_X + BASE_W * j + MARGIN * (j + 1),
      WINDOW_POS_Y + BASE_H * (i - ROW / 2) + MARGIN * (i - ROW / 2 + 1),
      [bomb._bomb, bomb._text],
    );
    container.add(bomb._container);
    return bomb;
  }
  check() {
    this._bomb.setTexture('bomb-check');
  }
  release() {
    this._bomb.setTexture('bomb-normal');
  }
  destroy(type: BlockDestroyType) {
    if (type === BlockDestroyType.Bomb) {
      this._container.destroy();
      return;
    }
    if (type === BlockDestroyType.Drag) {
      this._destroyed = true;
      this._startPos = {
        x: this._container.x,
        y: this._container.y,
      };
      this._startTime = Date.now();
    }
  }
  update() {
    if (this._destroyed) {
      const elapsedTime = Date.now() - this._startTime;
      if (elapsedTime < BOMBS_DURATION) {
        const t = elapsedTime / BOMBS_DURATION;
        this._container.x = Phaser.Math.Interpolation.Linear(
          [this._startPos.x, BOMBS_MOVE_POS.x],
          t,
        );
        this._container.y = Phaser.Math.Interpolation.Linear(
          [this._startPos.y, BOMBS_MOVE_POS.y],
          t,
        );
      } else {
        this._container.destroy();
        this._destroyed = false;
      }
    }
  }
}
