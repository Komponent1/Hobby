import {
  BASE_H, BASE_W, BRICK_H, BRICK_W, MARGIN,
  ROW,
} from '../constant/ten-game.constant.stage';
import type {Stage} from '../scene/ten-game.scene.stage';
import { BlockBase } from "./ten-game.object.blockbase";

export class Brick extends BlockBase {
  private _back!: Phaser.GameObjects.Rectangle;
  private _brick!: Phaser.GameObjects.Image;
  private _text!: Phaser.GameObjects.Text;

  static create(scene: Stage, i: number, j: number, value: number) {
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
      {color: "#000", fontSize: 32, fontStyle: 'bold'},
    ).setOrigin(0.5, 0.5).setStroke("#fff", 3);
    brick._pos = {i, j};
    brick._container = scene.add.container(
      BASE_W * j + MARGIN * (j + 1),
      BASE_H * (i - ROW / 2) + MARGIN * (i - ROW / 2 + 1),
      [brick._back, brick._brick, brick._text],
    );
    return brick;
  }
  check() {
    this._back.setFillStyle(0xff0000, 1);
  }
  release() {
    this._back.setFillStyle(0xffffff, 1);
  }
}
