import {Scene} from 'phaser';
// import { Loader } from "../loader/ten-game.loader";
import {
  BASE_H, BASE_W, COL, MARGIN, ROW,
  StageState,
} from "../constant/ten-game.constant.stage";
import { Board } from "../object/ten-game.object.board";
import { DragBox } from "../object/ten-game.object.dragbox";
import { Mouse } from "../input/ten-game.input.mouse";
import {StageInfo} from '../object/ten-game.object.stageInfo';
import {Timer} from '../object/ten-game.object.timer';
import { Ui } from "../object/ten-game.object.ui";

export class Stage extends Scene {
  constructor() {
    super("Stage");
  }

  public board!: Board;
  public dragBox!: DragBox;
  public stageInfo!: StageInfo;
  public timer!: Timer;
  public ui!: Ui;

  // preload() {
  //   Loader.loadBackground(this);
  //   Loader.loadBaseImage(this);
  // }
  init() {
    this.board = Board.init();
    this.dragBox = DragBox.init();
    this.stageInfo = StageInfo.init();
    this.timer = Timer.init();
    this.ui = Ui.init();
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
    this.stageInfo.create();
    this.board.create(this);
    this.timer.create(this);
    this.ui.create(this);

    Mouse.create(this);
    Mouse.move(this);
    Mouse.end(this);
  }
  update() {
    if (this.stageInfo.stageState === StageState.Playing) {
      this.timer.update(this);
      this.stageInfo.checkClear(this);
    } else if (this.stageInfo.stageState === StageState.GameOver) {
      this.scene.pause("Stage");
    }
  }
}
