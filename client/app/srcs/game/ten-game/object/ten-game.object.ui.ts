import type { Stage } from "../scene/ten-game.scene.stage";

export class Ui {
  public scoreText!: Phaser.GameObjects.Text;
  public resetButton!: Phaser.GameObjects.Container;

  static init() {
    return new Ui();
  }

  create(scene: Stage) {
    this.scoreText = scene.add.text(1920 - 100, 300, `Score: ${scene.stageInfo.score}`, {
      fontSize: '32px',
      color: '#000',
    }).setOrigin(0.5, 0.5);
  }

  scoreUpdate(scene: Stage) {
    this.scoreText.setText(`Score: ${scene.stageInfo.score}`);
  }
}
