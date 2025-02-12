import {Scene} from 'phaser';
import { Loader } from "../loader/ten-game.loader";
import {
  BASE_H, BASE_W, COL, MARGIN, ROW,
} from "../constant/ten-game.constant.stage";
import { Board } from "../object/ten-game.object.board";
import { DragBox } from "../object/ten-game.object.dragbox";
import { Mouse } from "../input/ten-game.input.mouse";

export class Stage extends Scene {
  constructor() {
    super("Stage");
  }

  public board!: Board;
  public dragBox!: DragBox;

  preload() {
    // Loader.loadBackground(this);
    // Loader.loadBaseImage(this);
  }
  init() {
    this.board = Board.init();
    this.dragBox = DragBox.init();
  }
  create() {
    // this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.add.rectangle(
      0,
      0,
      BASE_W * COL + MARGIN * (COL + 1),
      BASE_H * ROW + MARGIN * (ROW + 1),
      0x00ff00,
    ).setOrigin(0, 0);
    this.board.create(this);
    Mouse.create(this);
    Mouse.move(this);
    Mouse.end(this);
  }
  update() {}
}
