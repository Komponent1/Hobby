import { Scene } from "phaser";
import { StageInfo } from "../object/ten-game.object.stageInfo";

export class Result extends Scene {
  constructor() {
    super("Result");
  }

  public stageInfo!: StageInfo;
  public startButton!: Phaser.GameObjects.Container;

  init(data: any) {
    this.stageInfo = data.stageInfo;
  }

  create() {
    this.add.text(400, 300, `Game Score: ${this.stageInfo.score}`, { fontSize: "64px", fontFamily: "noto" });
    const button = this.add.rectangle(0, 0, 200, 100, 0x00ff00);
    const text = this.add.text(0, 0, "Restart", {
      fontSize: "32px",
      color: "#000",
      fontFamily: "noto",
    }).setOrigin(0.5, 0.5);
    this.startButton = this.add.container(1920 / 2, 1080 / 2, [button, text]);
    button.setInteractive();

    button.on("pointerdown", () => {
      this.scene.stop("Stage");
      this.scene.start("Main");
    });
  }
}
