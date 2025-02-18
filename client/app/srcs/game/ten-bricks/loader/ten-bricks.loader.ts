import { Scene } from "phaser";
import { BASE_H, BASE_W } from "../constant/ten-bricks.constant.stage";

export class Loader {
  static loadBricksSprite(scene: Scene) {
    scene.load.spritesheet("bricks", "/assets/ten-bricks/bricks.png", {
      frameWidth: BASE_W,
      frameHeight: BASE_H,
    });
  }
  static loadBombImage(scene: Scene) {
    scene.load.image("bomb-normal", "/assets/ten-bricks/bomb-normal.png");
    scene.load.image("bomb-check", "/assets/ten-bricks/bomb-check.png");
  }
  static loadMouseImage(scene: Scene) {
    scene.load.image("mouse-right", "/assets/ten-bricks/mouse-right.png");
  }
  static loadSound(scene: Scene) {
    scene.load.audio("bomb", ["/assets/ten-bricks/sound/bomb.wav"]);
    scene.load.audio("brick", ["/assets/ten-bricks/sound/brick.wav"]);
    scene.load.audio("bgm", ["/assets/ten-bricks/sound/bgm.mp3"]);
  }
  static loadExplosion(scene: Scene) {
    scene.load.spritesheet("explosion", "/assets/ten-bricks/explosion.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }
  static createExplosionAnimation(scene: Scene) {
    scene.anims.create({
      key: "explosion_effect",
      frames: scene.anims.generateFrameNumbers(
        "explosion",
        {
          start: 0,
          end: 5,
        },
      ),
      frameRate: 20,
      repeat: 0,
    });
  }
}
