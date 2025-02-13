import {
  BASE_H, BASE_W, COL, MARGIN, ROW,
} from "../constant/ten-game.constant.stage";
import type { Stage } from "../scene/ten-game.scene.stage";

export class Board {
  public board!: (Phaser.GameObjects.Container | null)[][];
  public boardMeta!: number[][];

  static init() {
    const board = new Board();
    board.boardMeta = Array.from({length: ROW}, () => Array.from({length: COL}, () => 0));
    /**
       * TODO
       * 맵 생성에서 총합이 10의 배수가 되도록 수정 필요
       */
    for (let i = 0; i < ROW; i += 1) {
      for (let j = 0; j < COL; j += 1) {
        board.boardMeta[i][j] = Math.round(Math.random() * 8) + 1;
      }
    }

    return board;
  }
  create(scene: Stage) {
    if (!this.boardMeta) return;
    this.board = Array.from({length: ROW}, () => Array.from({length: COL}, () => null));
    this.boardMeta.forEach((row, i) => {
      row.forEach((col, j) => {
        const base = scene.add.circle(0, 0, BASE_W / 2, 0xff0000).setOrigin(0, 0);
        const text = scene.add.text(BASE_W / 2, BASE_H / 2, `${col}`, {color: "#ffffff", fontSize: 24, fontStyle: 'bold'}).setOrigin(0.5, 0.5);
        const object = scene.add.container(
          BASE_W * j + MARGIN * (j + 1),
          BASE_H * i + MARGIN * (i + 1),
          [base, text],
        );
        this.board[i][j] = object;
      });
    });
  }
  isSumTen(downPoint: {x: number; y: number} | null, releasePoint: {x: number; y: number}) {
    if (downPoint === null) return false;
    const startPoint = {
      x: Math.min(downPoint.x, releasePoint.x),
      y: Math.min(downPoint.y, releasePoint.y),
    };
    const endPoint = {
      x: Math.max(downPoint.x, releasePoint.x),
      y: Math.max(downPoint.y, releasePoint.y),
    };

    const startIndex = Board.getIndex(startPoint);
    const endIndex = Board.getIndex(endPoint);

    let sum = 0;
    for (let {i} = startIndex; i <= endIndex.i; i += 1) {
      for (let {j} = startIndex; j <= endIndex.j; j += 1) {
        const appleX = MARGIN + j * (BASE_W + MARGIN) + BASE_W / 2;
        const appleY = MARGIN + i * (BASE_H + MARGIN) + BASE_H / 2;

        if (appleX >= startPoint.x && appleX <= endPoint.x
            && appleY >= startPoint.y && appleY <= endPoint.y) {
          if (this.boardMeta[i][j] !== undefined) sum += this.boardMeta[i][j];
        }
      }
    }
    return sum === 10;
  }
  checkTenAndGetScore(
    downPoint: {x: number; y: number} | null,
    releasePoint: {x: number; y: number},
  ) {
    if (downPoint === null) return 0;

    const startPoint = {
      x: Math.min(downPoint.x, releasePoint.x),
      y: Math.min(downPoint.y, releasePoint.y),
    };
    const endPoint = {
      x: Math.max(downPoint.x, releasePoint.x),
      y: Math.max(downPoint.y, releasePoint.y),
    };

    if (this.isSumTen(startPoint, endPoint)) {
      let score = 0;
      this.boardMeta.forEach((row, i) => {
        row.forEach((col, j) => {
          const appleX = MARGIN + j * (BASE_W + MARGIN) + BASE_W / 2;
          const appleY = MARGIN + i * (BASE_H + MARGIN) + BASE_H / 2;

          if (appleX >= startPoint.x && appleX <= endPoint.x
              && appleY >= startPoint.y && appleY <= endPoint.y) {
            this.boardMeta[i][j] = 0;
            if (this.board[i][j]) {
              score += 1;
              this.board[i][j].destroy();
            }
            this.board[i][j] = null;
          }
        });
      });
      return score;
    }
    return 0;
  }

  static getIndex(point: {x: number; y: number}) {
    const i = Math.floor((point.y - MARGIN) / (BASE_H + MARGIN));
    const j = Math.floor((point.x - MARGIN) / (BASE_W + MARGIN));
    return {i, j};
  }
}
