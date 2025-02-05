import { Scene } from "phaser";

export class Clear extends Scene {
  public clearText!: Phaser.GameObjects.Text;
  public retryButton!: Phaser.GameObjects.Text;
  public menuButton!: Phaser.GameObjects.Text;
  public bg!: Phaser.GameObjects.Rectangle;
  public container!: Phaser.GameObjects.Container;

  constructor() {
    super("Clear");
  }

  create() {
    this.bg = this.add.rectangle(100, 150, 300, 300, 0x00000);
    this.clearText = this.add.text(100, 200, "CLEAR", { color: "#fff" });
    this.retryButton = this.add.text(100, 300, "retry", { color: "#0f0" }).setInteractive();
    this.menuButton = this.add.text(100, 400, "Menu", { color: "#0f0" }).setInteractive();
    this.container = this.add.container(
      100,
      100,
      [this.bg, this.retryButton, this.menuButton, this.clearText],
    );

    this.retryButton.on("pointerdown", () => {
      this.scene.stop("Clear");
      this.scene.start("Stage");
    });
    this.menuButton.on("pointerdown", () => {
      this.scene.stop("Stage");
      this.scene.stop("Clear");
      this.scene.start("Main");
    });
  }
}
