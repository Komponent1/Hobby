/* eslint-disable max-len */
import {
  mapConfig,
} from '../../config/jumfrog.map.config';
import type { Stage } from '../../scene/jumfrog.scene.stage';
import { ExplainKey } from './jumfrog.object.explain_key';

export class UI extends Phaser.GameObjects.Container {
  private _height: number;
  private _startTime: number;

  public timeText!: Phaser.GameObjects.Text;
  public heightText!: Phaser.GameObjects.Text;
  public explainKey!: ExplainKey;

  constructor(scene: Stage, x: number, y: number) {
    super(scene, x, y);
    this._height = 0;
    this._startTime = Date.now();
    this.timeText = scene.add.text(10, 10, 'Time: 0s', {
      fontSize: '16px',
      color: '#ffffff',
    });
    this.heightText = scene.add.text(10, 30, 'Height: 0m', {
      fontSize: '16px',
      color: '#ffffff',
    });
    this.explainKey = ExplainKey.create(scene);

    this.add([this.timeText, this.heightText, this.explainKey]);

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

    this.explainKey.update();
  }
}
