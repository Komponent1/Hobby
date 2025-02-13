import type { Stage } from "../scene/ten-game.scene.stage";

export class Mouse {
  static create(scene: Stage) {
    scene.input.mouse?.disableContextMenu();
    scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonDown()) {
        scene.dragBox.start(scene, pointer.x, pointer.y);
      }
    });
  }
  static move(scene: Stage) {
    scene.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonDown()) {
        scene.dragBox.draw(scene, pointer.x, pointer.y);
      }
    });
  }
  static end(scene: Stage) {
    scene.input.on("pointerup", (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonReleased()) {
        scene.dragBox.end(scene, pointer.x, pointer.y);
      } else if (pointer.rightButtonReleased()) {
        scene.board.explosion(scene, {x: pointer.x, y: pointer.y});
      }
    });
  }
}
