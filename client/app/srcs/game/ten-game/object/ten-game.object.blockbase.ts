import {
  BASE_H, MARGIN, MOVE_SPEED, ROW,
} from "../constant/ten-game.constant.stage";

export class BlockBase {
  protected _container!: Phaser.GameObjects.Container;
  protected _pos!: {i: number; j: number};

  public value!: number;

  setPosition(x: number, y: number) {
    this._container.setPosition(x, y);
  }
  setPos(i: number, j: number) {
    this._pos = {i, j};
  }
  move() {
    if (
      this._container.y < BASE_H * (this._pos.i - ROW / 2) + MARGIN * (this._pos.i - ROW / 2 + 1)
    ) {
      this._container.y += MOVE_SPEED;
    } else {
      this._container.y = BASE_H * (this._pos.i - ROW / 2) + MARGIN * (this._pos.i - ROW / 2 + 1);
    }
  }
  destroy() {
    this._container.destroy();
  }
}
