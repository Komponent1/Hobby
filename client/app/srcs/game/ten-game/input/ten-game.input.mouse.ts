import type { Stage } from "../scene/ten-game.scene.stage";

export class Mouse {
  static create(scene: Stage) {
    scene.input.on("pointerdown", (pointer: {x: number; y: number}) => {
      scene.dragBox.start(scene, pointer.x, pointer.y);
    });
  }
  static move(scene: Stage) {
    scene.input.on("pointermove", (pointer: {x: number; y: number}) => {
      scene.dragBox.draw(scene, pointer.x, pointer.y);
    });
  }
  static end(scene: Stage) {
    scene.input.on("pointerup", (pointer: {x: number; y: number}) => {
      scene.dragBox.end(scene, pointer.x, pointer.y);
    });
  }
}
