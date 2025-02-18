import {Scene} from 'phaser';
import {
  BOMB_GEN_TIME, StageState,
} from "../constant/ten-bricks.constant.stage";
import { Board } from "../object/ten-bricks.object.board";
import { DragBox } from "../object/ten-bricks.object.dragbox";
import { Mouse } from "../input/ten-bricks.input.mouse";
import {StageInfo} from '../object/ten-bricks.object.stageInfo';
import { Ui } from "../object/ten-bricks.object.ui";
import { Loader } from "../loader/ten-bricks.loader";

export class Stage extends Scene {
  constructor() {
    super("Stage");
  }

  public board!: Board;
  public dragBox!: DragBox;
  public stageInfo!: StageInfo;
  public ui!: Ui;

  public bombGenTimerEvent!: Phaser.Time.TimerEvent;
  public appleGenTimerEvent!: Phaser.Time.TimerEvent;
  preload() {
    Loader.loadBricksSprite(this);
    Loader.loadBombImage(this);
    Loader.loadMouseImage(this);
    Loader.loadSound(this);
    Loader.loadExplosion(this);
  }
  init() {
    this.board = Board.init();
    this.dragBox = DragBox.init();
    this.stageInfo = StageInfo.init();
    this.ui = Ui.init();
  }
  create() {
    this.add.rectangle(
      0,
      0,
      1920,
      1080,
      0x000000,
    ).setOrigin(0, 0);
    Loader.createExplosionAnimation(this);
    this.stageInfo.create();
    this.board.create(this);
    this.ui.create(this);

    Mouse.create(this);
    Mouse.move(this);
    Mouse.end(this);

    this.bombGenTimerEvent = this.time.addEvent({
      delay: BOMB_GEN_TIME,
      callback: (scene: Stage) => this.board.genNewBomb(scene),
      args: [this],
      loop: true,
    });
  }
  update() {
    if (this.stageInfo.stageState === StageState.Playing) {
      this.board.update();
      this.ui.update(this);
      this.stageInfo.checkClear(this);
    } else if (this.stageInfo.stageState === StageState.GameOver) {
      this.scene.pause("Stage");
    }
  }
}
