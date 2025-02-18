import type { Stage } from "../scene/ten-bricks.scene.stage";
import { Timer } from "./ten-bricks.object.timer";

export class Ui {
  private _continer!: Phaser.GameObjects.Container;
  public scoreText!: Phaser.GameObjects.Text;
  public resetButton!: Phaser.GameObjects.Container;
  public bombImage!: Phaser.GameObjects.Image;
  public bombText!: Phaser.GameObjects.Text;
  public timer!: Timer;
  public tutorial!: Phaser.GameObjects.Container;

  static init() {
    const ui = new Ui();
    ui.timer = Timer.init();
    return ui;
  }

  create(scene: Stage) {
    this._continer = scene.add.container(1920 - 250, 200);
    this.timer.create(scene, this._continer);
    this.scoreText = scene.add.text(0, 150, `SCORE ${scene.stageInfo.score}`, {
      fontFamily: 'noto',
      fontSize: '32px',
      color: '#fff',
      fontStyle: 'bold',
    }).setOrigin(0.5, 0.5);
    this._continer.add(this.scoreText);
    this.bombImage = scene.add.image(0, 250, 'bomb-normal').setOrigin(0.5, 0.5);
    this.bombText = scene.add.text(-20, 260, `${scene.stageInfo.bombs}`, {
      fontFamily: 'noto',
      fontSize: '48px',
      color: '#000',
      fontStyle: 'bold',
    }).setOrigin(0.5, 0.5).setStroke('#fff', 4);
    this._continer.add(this.bombImage);
    this._continer.add(this.bombText);

    const title = scene.add.text(
      -15,
      -50,
      'Use Bomb',
      {
        fontSize: 32, fontStyle: 'bold', color: '#000', fontFamily: 'noto',
      },
    ).setOrigin(0.5, 0.5);

    const back = scene.add.rectangle(0, 0, 200, 150, 0xffffff).setStrokeStyle(4, 0xff0000);
    const mouse = scene.add.image(50, 20, 'mouse-right');
    const text = scene.add.text(0, 20, '=', {fontSize: 48, fontStyle: 'bold', color: '#000'}).setOrigin(0.5, 0.5);
    const bomb = scene.add.image(-35, 20, 'bomb-normal').setScale(0.6);
    this.tutorial = scene.add.container(1920 - 250, 600, [back, mouse, text, bomb, title]);
  }
  update(scene: Stage) {
    this.timer.update(scene);
  }

  scoreUpdate(scene: Stage) {
    this.scoreText.setText(`SCORE ${scene.stageInfo.score}`);
  }
  bombUpdate(scene: Stage) {
    this.bombText.setText(`${scene.stageInfo.bombs}`);
  }
}
