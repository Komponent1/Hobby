import { Scene } from "phaser";

export class Loader {
  static loadBackground(scene: Scene) {
    scene.load.image("background", "/assets/ten-game/background.png");
  }
  static loadBaseImage(scene: Scene) {
    scene.load.image("base", "/assets/ten-game/base.png");
  }
}
