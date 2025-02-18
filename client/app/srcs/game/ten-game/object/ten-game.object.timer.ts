import { GAME_TIME, WINDOW_POS_Y } from "../constant/ten-game.constant.stage";
import type { Stage } from "../scene/ten-game.scene.stage";

export class Timer {
  public timerContainer!: Phaser.GameObjects.Container;
  public timerBackground!: Phaser.GameObjects.Graphics;
  public timerLeft!: Phaser.GameObjects.Graphics;
  public timerText!: Phaser.GameObjects.Text;

  static init() {
    return new Timer();
  }

  create(scene: Stage) {
    this.timerBackground = scene.add.graphics();
    this.timerBackground.fillStyle(0x000000, 0.5);
    this.timerBackground.fillCircle(0, 0, 100);

    this.timerLeft = scene.add.graphics();
    this.timerLeft.fillStyle(0xff0000, 1);
    this.timerLeft.slice(
      0,
      0,
      80,
      Phaser.Math.DegToRad(-90),
      Phaser.Math.DegToRad(270),
      false,
    );
    this.timerLeft.fillPath();

    this.timerText = scene.add.text(0, 0, `${GAME_TIME / 1000}`, {
      fontSize: '32px',
      color: '#ffffff',
    });

    this.timerContainer = scene.add.container(1920 - 180, 80 + WINDOW_POS_Y, [
      this.timerBackground,
      this.timerLeft,
      this.timerText,
    ]);
  }

  update(scene: Stage) {
    const leftTime = Math.ceil((GAME_TIME - (Date.now() - scene.stageInfo.startTime)) / 1000);
    this.timerText.setText(
      leftTime > 0 ? `${leftTime}` : "0",
    );
    this.timerLeft.clear();
    this.timerLeft.fillStyle(0xff0000, 1);
    this.timerLeft.slice(
      0,
      0,
      100,
      Phaser.Math.DegToRad(-90),
      Phaser.Math.DegToRad(
        -90 + 360 * ((GAME_TIME - (Date.now() - scene.stageInfo.startTime)) / GAME_TIME),
      ),
      true,
    );
    this.timerLeft.fillPath();
  }
}
