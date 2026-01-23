import type { Stage } from "../scene/rock-breaker.scene.stage";

export class GameOverUI {
  private _container: Phaser.GameObjects.Container;
  private _background: Phaser.GameObjects.Rectangle;
  private _text: Phaser.GameObjects.Text;

  constructor() {
    this._container = null as unknown as Phaser.GameObjects.Container;
    this._background = null as unknown as Phaser.GameObjects.Rectangle;
    this._text = null as unknown as Phaser.GameObjects.Text;
  }

  create(scene: Stage) {
    const { width, height } = scene.scale;

    this._background = scene.add.rectangle(
      width / 2,
      height / 2,
      width,
      height,
      0x000000,
      0.7,
    );
    this._text = scene.add.text(width / 2, height / 2, "RESTART", {
      fontSize: "48px",
      color: "#ffffff",
    });
    this._text.setOrigin(0.5, 0.5);

    this._container = scene.add.container(0, 0, [this._background, this._text]);
    this._container.setDepth(1000); // 최상위 레이어로 설정
    this._container.setVisible(false);

    this._text.setInteractive();
    this._text.on("pointerdown", () => {
      scene.restartGame();
    });
  }

  show() {
    if (this._container) {
      this._container.setVisible(true);
    }
  }

  hide() {
    if (this._container) {
      this._container.setVisible(false);
    }
  }

  restart() {
    this.hide();
  }

  destroy() {
    if (this._container) {
      this._container.destroy();
    }
  }
}
