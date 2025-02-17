import {
  BASE_H, BASE_W, MARGIN, ROW,
} from '../constant/ten-game.constant.stage';
import type {Stage} from '../scene/ten-game.scene.stage';
import { BlockBase } from "./ten-game.object.blockbase";

export class Bomb extends BlockBase {
  private _bomb!: Phaser.GameObjects.Image;
  private _text!: Phaser.GameObjects.Text;

  static create(scene: Stage, i: number, j: number, value: number) {
    const bomb = new Bomb();
    bomb._bomb = scene.add.image(
      0,
      0,
      'bomb-normal',
    ).setScale(0.6).setOrigin(0, 0);
    bomb._text = scene.add.text(
      BASE_W / 2,
      BASE_H / 2,
      `${value}`,
      {color: "#000", fontSize: 32, fontStyle: 'bold'},
    ).setOrigin(0.5, 0.5).setStroke("#fff", 3);
    bomb._pos = {i, j};
    bomb._container = scene.add.container(
      BASE_W * j + MARGIN * (j + 1),
      BASE_H * (i - ROW / 2) + MARGIN * (i - ROW / 2 + 1),
      [bomb._bomb, bomb._text],
    );
    return bomb;
  }
  check() {
    this._bomb.setTexture('bomb-check');
  }
  release() {
    this._bomb.setTexture('bomb-normal');
  }
}
