import { Scene } from "phaser";
import {drawRoundRect} from '../utils/ten-game.utils.board';
import {
  BASE_H,
  BASE_W,
  COL,
  MARGIN,
  ROW,
  WINDOW_H, WINDOW_POS_X, WINDOW_POS_Y, WINDOW_RADIUS, WINDOW_STROKE, WINDOW_W,
} from '../constant/ten-game.constant.stage';
import {Loader} from '../loader/ten-game.loader';

export class Main extends Scene {
  constructor() {
    super("Main");
  }

  public startButton!: Phaser.GameObjects.Container;

  preload() {
    Loader.loadBricksSprite(this);
    Loader.loadBombImage(this);
    Loader.loadMouseImage(this);
    Loader.loadSound(this);
  }

  create() {
    this.sound.stopAll();
    this.sound.play("bgm", {loop: true});
    this.add.rectangle(
      0,
      0,
      1920,
      1080,
      0x000000,
    ).setOrigin(0, 0);
    drawRoundRect(
      this,
      WINDOW_POS_X,
      WINDOW_POS_Y,
      WINDOW_W,
      WINDOW_H,
      WINDOW_RADIUS,
      WINDOW_STROKE,
    );
    for (let i = 0; i < ROW / 2; i += 1) {
      for (let j = 0; j < COL; j += 1) {
        this.add.image(
          WINDOW_POS_X + BASE_W * j + MARGIN * (j + 1),
          WINDOW_POS_Y + BASE_H * i + MARGIN * (i + 1),
          "bricks",
          Math.round(Math.random() * 4),
        ).setOrigin(0, 0);
      }
    }
    const title = this.add.text(
      -15,
      -50,
      'Use Bomb',
      {
        fontSize: 32, fontStyle: 'bold', color: '#000', fontFamily: 'noto',
      },
    ).setOrigin(0.5, 0.5);
    const back = this.add.rectangle(0, 0, 200, 150, 0xffffff).setStrokeStyle(4, 0xff0000);
    const mouse = this.add.image(50, 20, 'mouse-right');
    const tutoText = this.add.text(0, 20, '=', {fontSize: 48, fontStyle: 'bold', color: '#000'}).setOrigin(0.5, 0.5);
    const bomb = this.add.image(-35, 20, 'bomb-normal').setScale(0.6);
    this.add.container(1920 - 250, 600, [back, mouse, tutoText, bomb, title]);

    const timerBackground = this.add.graphics();
    timerBackground.fillStyle(0xffffff, 1);
    timerBackground.fillCircle(0, 0, 80);

    const timerLeft = this.add.graphics();
    timerLeft.fillStyle(0x000000, 1);
    timerLeft.slice(
      0,
      0,
      80,
      Phaser.Math.DegToRad(-90),
      Phaser.Math.DegToRad(180),
      true,
    );
    timerLeft.fillPath();

    const timerText = this.add.text(0, 0, '90', {
      fontSize: '32px',
      color: '#fff',
      fontFamily: 'noto',
      fontStyle: 'bold',
    }).setStroke('#000', 4).setOrigin(0.5, 0.5);

    this.add.container(1920 - 250, 200, [
      timerBackground,
      timerLeft,
      timerText,
    ]);

    this.add.image(1920 - 250, 450, 'bomb-normal').setOrigin(0.5, 0.5);

    const button = this.add.rectangle(0, 0, 200, 100, 0xffffff)
      .setInteractive()
      .setStrokeStyle(4, 0xff0000)
      .on("pointerdown", () => {
        this.scene.start("Stage");
      });
    const text = this.add.text(0, 0, "Start", {
      fontSize: "48px",
      color: "#fff",
      fontFamily: "noto",
    }).setOrigin(0.5, 0.5).setStroke("#000", 4);
    this.startButton = this.add.container(1920 / 2, 1080 / 2, [button, text]).on("pointerover", () => {
      this.startButton.setScale(1.1);
    }).on("pointerout", () => {
      this.startButton.setScale(1);
    });

    this.add.text(1920 / 2, 1080 / 2 - 150, "TEN BRICKS", {
      fontSize: "128px",
      color: "#000",
      fontFamily: "noto",
    }).setOrigin(0.5, 0.5).setStroke("#fff", 20);
  }
}
