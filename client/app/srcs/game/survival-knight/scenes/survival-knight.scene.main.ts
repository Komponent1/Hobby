import { Scene } from "phaser";
import {Loader} from '../loader/survival-knight.loader';
import {TileMap} from '../object/survival-knight.object.tileMap';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constant/survival-knight.constant.config';
import {Stage} from './survival-knight.scene.stage';
import {RetryCheck} from './survival-knight.scene.retryCheck';
import {Shop} from 'react-bootstrap-icons';

export class Main extends Scene {
  public tileMap!: TileMap;
  public startButton!: Phaser.GameObjects.Image;

  constructor() {
    super("Main");
  }

  preload() {
    Loader.loadTile(this, 'tile');
    Loader.loadUi(this, 'ui');
  }
  init() {
    this.tileMap = TileMap.init();
  }

  create() {
    if (this.scene.get('Stage') === null) {
      this.scene.add('Stage', Stage, false);
    }
    if (this.scene.get('RetryCheck') === null) {
      this.scene.add('RetryCheck', RetryCheck, false);
    }
    if (this.scene.get('Shop') === null) {
      this.scene.add('Shop', Shop, false);
    }
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.tileMap.draw(this);
    this.startButton = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 'ui', 'main/Start_BTN.png').setInteractive();

    this.startButton.on("pointerdown", () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
    });
    this.startButton.on("pointerover", () => {
      this.startButton.setScale(1.1);
    });
    this.startButton.on("pointerout", () => {
      this.startButton.setScale(1);
    });

    this.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.start("Stage", {fadeIn: true});
    });
  }
}
