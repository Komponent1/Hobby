import { Scene } from "phaser";

export class Main extends Scene {
  constructor() {
    super("Main");
  }

  preload() {
    this.cameras.main.setBackgroundColor("#444444");
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    const startButton = this.add.text(100, 100, "Start Game", {
      fontSize: "40px",
      color: "#ffffff",
      backgroundColor: "#000000",
    }).setName("Start");

    startButton.setInteractive();
    startButton.on("pointerdown", () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
    });

    this.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.start("Stage", {fadeIn: true});
    });
  }
}
