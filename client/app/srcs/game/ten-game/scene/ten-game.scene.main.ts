import { Scene } from "phaser";

export class Main extends Scene {
  constructor() {
    super("Main");
  }

  public startButton!: Phaser.GameObjects.Container;

  create() {
    const button = this.add.rectangle(0, 0, 200, 100, 0x00ff00);
    const text = this.add.text(0, 0, "Start", {
      fontSize: "32px",
      color: "#000",
    }).setOrigin(0.5, 0.5);
    this.startButton = this.add.container(1920 / 2, 1080 / 2, [button, text]);
    button.setInteractive();

    button.on("pointerdown", () => {
      this.scene.start("Stage");
    });
  }
}
