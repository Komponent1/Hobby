import { Scene } from "phaser";
import {Loader} from '../loader/loader';
import {TileMap} from '../object/game.object.tileMap';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constant/game.constant.config';

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
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.tileMap.draw(this);
    this.startButton = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 'ui', 'main/Start_BTN.png').setInteractive();

    this.startButton.on("pointerdown", () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
    });

    this.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.start("Stage", {fadeIn: true});
    });
  }
}
