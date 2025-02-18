import { Scene } from "phaser";
import { BASE_H, BASE_W } from "../constant/ten-game.constant.stage";

export class Loader {
  static loadBricksSprite(scene: Scene) {
    scene.load.spritesheet("bricks", "/assets/ten-game/bricks.png", {
      frameWidth: BASE_W,
      frameHeight: BASE_H,
    });
  }
  static loadBombImage(scene: Scene) {
    scene.load.image("bomb-normal", "/assets/ten-game/bomb-normal.png");
    scene.load.image("bomb-check", "/assets/ten-game/bomb-check.png");
  }
  static loadMouseImage(scene: Scene) {
    scene.load.image("mouse-right", "/assets/ten-game/mouse-right.png");
  }
}
