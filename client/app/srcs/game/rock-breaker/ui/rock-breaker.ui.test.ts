import { stateShare } from "../share/rock-breaker.share.state";

export class TestUi {
  private _coinText: Phaser.GameObjects.Text;

  constructor() {
    this._coinText = null as unknown as Phaser.GameObjects.Text;
  }
  create(scene: Phaser.Scene) {
    const { width } = scene.scale;

    this._coinText = scene.add.text(
      width - 100,
      10,
      `coin: ${stateShare.coin}`,
      {
        fontSize: "16px",
        color: "#000",
      },
    );
  }

  update() {
    if (this._coinText) {
      this._coinText.setText(`coin: ${stateShare.coin}`);
    }
  }
}
