import type { Stage } from "../scene/ten-game.scene.stage";

export class Ui {
  public scoreText!: Phaser.GameObjects.Text;
  public resetButton!: Phaser.GameObjects.Container;
  public boomText!: Phaser.GameObjects.Text;

  static init() {
    return new Ui();
  }

  create(scene: Stage) {
    this.scoreText = scene.add.text(1920 - 180, 300, `Score: ${scene.stageInfo.score}`, {
      fontSize: '32px',
      color: '#fff',
    }).setOrigin(0.5, 0.5);
    this.boomText = scene.add.text(1920 - 180, 400, `Boom: ${scene.stageInfo.booms}`, {
      fontSize: '32px',
      color: '#fff',
    }).setOrigin(0.5, 0.5);
  }

  scoreUpdate(scene: Stage) {
    this.scoreText.setText(`Score: ${scene.stageInfo.score}`);
  }
  boomUpdate(scene: Stage) {
    this.boomText.setText(`Boom: ${scene.stageInfo.booms}`);
  }
}
