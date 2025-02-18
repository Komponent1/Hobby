import type { Stage } from "../scene/ten-game.scene.stage";

export class DragBox {
  public box: Phaser.GameObjects.Rectangle | null = null;

  public startPoint: {x: number; y: number} | null = null;
  private _savedijs: {i: number; j: number}[] = [];
  static init() {
    return new DragBox();
  }

  start(scene: Stage, x: number, y: number) {
    if (this.box !== null) return;
    this.startPoint = {x, y};
    this.box = scene.add.rectangle(x, y, 0, 0, 0xffffff, 0.5).setDepth(2);
  }
  draw(scene: Stage, x: number, y: number) {
    if (this.box === null) return;
    if (this.startPoint === null) return;
    const {isTen, ijs} = scene.board.isSumTenAndIndexes(this.startPoint, {x, y});
    if (isTen) {
      this.box.setFillStyle(0xff0000, 0.5);
      ijs.forEach(({i, j}) => {
        scene.board.board[i][j]?.check();
        this._savedijs.push({i, j});
      });
    } else {
      this.box.setFillStyle(0xffffff, 0.5);
      this._savedijs.forEach(({i, j}) => {
        scene.board.board[i][j]?.release();
      });
      this._savedijs = [];
    }

    this.box.width = x - this.startPoint.x;
    this.box.height = y - this.startPoint.y;
  }
  end(scene: Stage, x: number, y: number) {
    if (this.box === null) return;
    if (this.startPoint === null) return;

    const newScore = scene.board.checkTenAndGetScore(scene, this.startPoint, {x, y});
    scene.stageInfo.addScore(newScore, scene);
    this.box.destroy();
    this.box = null;
  }
}
