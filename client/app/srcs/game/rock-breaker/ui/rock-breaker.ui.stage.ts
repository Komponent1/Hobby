import type { Stage } from "../scene/rock-breaker.scene.stage";

export class StageUi {
  private _container: Phaser.GameObjects.Container;
  private _engineBar: Phaser.GameObjects.Rectangle;
  private _engineText: Phaser.GameObjects.Text;
  private _engineBarBg: Phaser.GameObjects.Rectangle;

  private _scoreBar: Phaser.GameObjects.Rectangle;
  private _scoreBg: Phaser.GameObjects.Rectangle;
  private _scoreText: Phaser.GameObjects.Text;

  constructor() {
    this._container = null as unknown as Phaser.GameObjects.Container;
    this._engineBar = null as unknown as Phaser.GameObjects.Rectangle;
    this._engineText = null as unknown as Phaser.GameObjects.Text;
    this._engineBarBg = null as unknown as Phaser.GameObjects.Rectangle;
    this._scoreBar = null as unknown as Phaser.GameObjects.Rectangle;
    this._scoreBg = null as unknown as Phaser.GameObjects.Rectangle;
    this._scoreText = null as unknown as Phaser.GameObjects.Text;
  }

  create(scene: Stage) {
    const { config } = scene;

    this._engineBarBg = scene.add.rectangle(20, 20, 200, 20, 0x555555);
    this._engineBarBg.setOrigin(0, 0);

    this._engineBar = scene.add.rectangle(20, 20, 200, 20, 0x00ff00);
    this._engineBar.setOrigin(0, 0);

    this._engineText = scene.add.text(120, 22, config.engine.toFixed(1), {
      fontSize: "14px",
      color: "#000000",
    });
    this._engineText.setOrigin(0.5, 0.5);

    this._scoreBg = scene.add.rectangle(20, 50, 200, 20, 0x555555);
    this._scoreBg.setOrigin(0, 0);

    this._scoreBar = scene.add.rectangle(20, 50, 0, 20, 0x0000ff);
    this._scoreBar.setOrigin(0, 0);

    this._scoreText = scene.add.text(120, 52, config.currentScore.toString(), {
      fontSize: "14px",
      color: "#000000",
    });
    this._scoreText.setOrigin(0.5, 0.5);

    this._container = scene.add.container(0, 0, [
      this._engineBarBg,
      this._engineBar,
      this._engineText,
    ]);
    this._container.setDepth(100); // UI 레이어를 최상위로 설정
  }

  update(scene: Stage) {
    const { config } = scene;
    const engineRatio = config.engine / config.fullEngine;
    this._engineBar.width = 200 * engineRatio;
    this._engineText.setText(config.engine.toFixed(1));

    const scoreRatio = Math.min(
      config.currentScore / config.canGoNextStageScore,
      1,
    );
    this._scoreBar.width = 200 * scoreRatio;
    this._scoreText.setText(config.currentScore.toString());
  }

  destroy() {
    if (this._container) {
      this._container.destroy();
    }
  }
}
