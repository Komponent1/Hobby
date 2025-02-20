import {Scene} from 'phaser';
import {StageInfo} from '../object/ui/survival-knight.object.ui.stageInfo';
import {Loader} from '../loader/survival-knight.loader';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constant/survival-knight.constant.config';
import { Player } from "../object/survival-knight.object.player";
import { Stage } from "./survival-knight.scene.stage";
import {Shop} from './survival-knight.scene.shop';

export class RetryCheck extends Scene {
  public stageInfo!: StageInfo;
  public player!: Player;

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
    this.player = data.player;
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
      this.scene.get('Stage').events.emit('retry');
      this.scene.stop('RetryCheck');
    });
    this.retryButton.on('pointerover', () => {
      this.retryButton.setScale(1.1);
    });
    this.retryButton.on('pointerout', () => {
      this.retryButton.setScale(1);
    });

    this.menuButton.on('pointerdown', () => {
      this.scene.start('Main');
      this.scene.remove('Stage');
      this.scene.remove('Shop');

      this.scene.add('Stage', Stage, false);
      this.scene.add('Shop', Shop, false);
      this.scene.stop('RetryCheck');
      this.scene.remove('RetryCheck');
    });
    this.menuButton.on('pointerover', () => {
      this.menuButton.setScale(1.1);
    });
    this.menuButton.on('pointerout', () => {
      this.menuButton.setScale(1);
    });
  }
}
