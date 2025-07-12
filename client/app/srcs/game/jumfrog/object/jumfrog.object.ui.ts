/* eslint-disable max-len */
import {
  BOTTOM,
  mapConfig, SCREEN_HEIGHT, SCREEN_WIDTH, X,
} from '../config/jumfrog.map.config';
import type { Stage } from '../scene/jumfrog.scene.stage';

export class UI extends Phaser.GameObjects.Container {
  private _height: number;
  private _startTime: number;

  public timeText!: Phaser.GameObjects.Text;
  public heightText!: Phaser.GameObjects.Text;
  public leftWall!: Phaser.GameObjects.Rectangle;
  public bottomWall!: Phaser.GameObjects.Rectangle;
  public rightWall!: Phaser.GameObjects.Rectangle;
  public topWall!: Phaser.GameObjects.Rectangle;

  constructor(scene: Stage, x: number, y: number) {
    super(scene, x, y);
    this._height = 0;
    this._startTime = Date.now();
    this.leftWall = scene.add.rectangle(0, 0, X, SCREEN_HEIGHT, 0x000000).setOrigin(0, 0);
    this.bottomWall = scene.add.rectangle(0, SCREEN_HEIGHT - BOTTOM, SCREEN_WIDTH, BOTTOM, 0x000000).setOrigin(0, 0);
    this.rightWall = scene.add.rectangle(SCREEN_WIDTH - X, 0, X, SCREEN_HEIGHT, 0x000000).setOrigin(0, 0);
    this.topWall = scene.add.rectangle(0, 0, SCREEN_WIDTH, 10, 0x000000).setOrigin(0, 0);
    this.timeText = scene.add.text(10, 10, 'Time: 0s', {
      fontSize: '16px',
      color: '#ffffff',
    });
    this.heightText = scene.add.text(10, 30, 'Height: 0m', {
      fontSize: '16px',
      color: '#ffffff',
    });

    this.add([this.leftWall, this.bottomWall, this.rightWall, this.topWall, this.timeText, this.heightText]);

    scene.uiLayer.add(this);
    scene.add.existing(this);
  }

  static create(scene: Stage): UI {
    const ui = new UI(scene, 0, 0);

    return ui;
  }

  update(scene: Stage) {
    const elapsedTime = Math.floor((Date.now() - this._startTime) / 1000);
    this.timeText.setText(`Time: ${elapsedTime}s`);

    const {player} = scene;
    if (player) {
      this._height = Math.floor((mapConfig.height - player.y - 10) / 100);
      this.heightText.setText(`Height: ${this._height}m`);
    }
  }
}
