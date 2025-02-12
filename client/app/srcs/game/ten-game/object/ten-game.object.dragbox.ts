import type { Stage } from "../scene/ten-game.scene.stage";

export class DragBox {
  public box: Phaser.GameObjects.Rectangle | null = null;

  public startPoint: {x: number; y: number} | null = null;
  static init() {
    return new DragBox();
  }

  start(scene: Stage, x: number, y: number) {
    if (this.box !== null) return;
    this.startPoint = {x, y};
    this.box = scene.add.rectangle(x, y, 0, 0, 0x000000, 0.5);
  }
  draw(x: number, y: number) {
    if (this.box === null) return;
    if (this.startPoint === null) return;

    this.box.width = x - this.startPoint.x;
    this.box.height = y - this.startPoint.y;
  }
  end(scene: Stage, x: number, y: number) {
    if (this.box === null) return;
    if (this.startPoint === null) return;

    scene.board.checkTen(this.startPoint, {x, y});
    this.box.destroy();
    this.box = null;
  }
}
