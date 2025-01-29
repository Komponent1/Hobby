import {Scene} from 'phaser';
import {StageInfo} from '../object/ui/game.object.ui.stageInfo';
import {Loader} from '../loader/loader';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constant/game.constant.config';

export class RetryCheck extends Scene {
  public stageInfo!: StageInfo;

  public retryButton!: Phaser.GameObjects.Image;
  public menuButton!: Phaser.GameObjects.Image;
  public bg!: Phaser.GameObjects.Image;
  public gameoverText!: Phaser.GameObjects.Image;
  public container!: Phaser.GameObjects.Container;

  constructor() {
    super('RetryCheck');
  }
  init(data: any) {
    this.stageInfo = data.stageInfo;
  }
  preload() {
    Loader.loadUi(this, 'ui');
  }
  create() {
    this.bg = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 'ui', 'Window.png').setScale(0.7);
    this.gameoverText = this.add.image(SCREEN_WIDTH / 2, 350, 'ui', 'gameover/Header.png');
    this.retryButton = this.add.image(SCREEN_WIDTH / 2, 550, 'ui', 'gameover/Replay_BTN.png').setInteractive();
    this.menuButton = this.add.image(SCREEN_WIDTH / 2, 700, 'ui', 'gameover/Exit_BTN.png').setInteractive();
    this.container = this.add.container(
      0,
      0,
      [this.bg, this.retryButton, this.menuButton, this.gameoverText],
    );

    this.retryButton.on('pointerdown', () => {
      this.scene.stop('GameOver');
      this.scene.start('Stage');
    });
    this.menuButton.on('pointerdown', () => {
      this.scene.stop('Stage');
      this.scene.stop('GameOver');
      this.scene.start('Main');
    });
  }
}
