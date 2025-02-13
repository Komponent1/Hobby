import {
  BASE_H, BASE_W, COL, MARGIN, ROW,
} from "../constant/ten-game.constant.stage";
import type { Stage } from "../scene/ten-game.scene.stage";
import { getRandomIndex, isInAppleCircle } from "../utils/ten-game.utils.board";

enum BlockType {
  Apple = "apple",
  Boom = "boom",
  Empty = "empty",
}
type Block = {
  type: BlockType;
  value: number;
};
export class Board {
  public board!: (Phaser.GameObjects.Container | null)[][];
  public boardMeta!: Block[][];

  private emptyBoardIndexes!: {i: number, j: number}[];
  private fillBoardIndexes!: {i: number, j: number}[];

  static init() {
    const board = new Board();
    board.boardMeta = Array.from({length: ROW}, () => Array.from({length: COL}, () => ({
      type: BlockType.Apple,
      value: Math.round(Math.random() * 8) + 1,
    })));
    board.fillBoardIndexes = Array.from({length: ROW * COL}, (_, i) => ({
      i: Math.floor(i / COL),
      j: i % COL,
    }));
    board.emptyBoardIndexes = [];
    /**
       * TODO
       * 맵 생성에서 총합이 10의 배수가 되도록 수정 필요
       */
    return board;
  }
  create(scene: Stage) {
    if (!this.boardMeta) return;
    this.board = Array.from({length: ROW}, () => Array.from({length: COL}, () => null));
    this.boardMeta.forEach((row, i) => {
      row.forEach((col, j) => {
        const base = scene.add.circle(0, 0, BASE_W / 2, 0xff0000).setOrigin(0, 0);
        const text = scene.add.text(
          BASE_W / 2,
          BASE_H / 2,
          `${col.value}`,
          {color: "#ffffff", fontSize: 24, fontStyle: 'bold'},
        ).setOrigin(0.5, 0.5);
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
          if (this.boardMeta[i][j] !== undefined) sum += this.boardMeta[i][j].value;
        }
      }
    }
    return sum === 10;
  }
  checkTenAndGetScore(
    scene: Stage,
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
            if (this.boardMeta[i][j].type === BlockType.Boom) {
              scene.stageInfo.addBoom();
              scene.ui.boomUpdate(scene);
            }
            this.boardMeta[i][j] = {
              type: BlockType.Empty,
              value: 0,
            };
            if (this.board[i][j]) {
              this.emptyBoardIndexes.push({i, j});
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

  genNewBlock(scene: Stage) {
    const randomIndex = getRandomIndex(this.emptyBoardIndexes);
    const genIndex = this.emptyBoardIndexes.splice(randomIndex, 1)[0];
    this.boardMeta[genIndex.i][genIndex.j] = {
      type: BlockType.Apple,
      value: Math.round(Math.random() * 8) + 1,
    };
    const base = scene.add.circle(0, 0, BASE_W / 2, 0xff0000).setOrigin(0, 0);
    const text = scene.add.text(
      BASE_W / 2,
      BASE_H / 2,
      `${this.boardMeta[genIndex.i][genIndex.j].value}`,
      {color: "#ffffff", fontSize: 24, fontStyle: 'bold'},
    ).setOrigin(0.5, 0.5);
    this.board[genIndex.i][genIndex.j] = scene.add.container(
      BASE_W * genIndex.j + MARGIN * (genIndex.j + 1),
      BASE_H * genIndex.i + MARGIN * (genIndex.i + 1),
      [base, text],
    );
    this.fillBoardIndexes.push(genIndex);
  }
  genNewBoom(scene: Stage) {
    if (this.fillBoardIndexes.length === 0) return;
    const randomIndex = getRandomIndex(this.fillBoardIndexes);
    const genIndex = this.fillBoardIndexes.splice(randomIndex, 1)[0];
    this.boardMeta[genIndex.i][genIndex.j].type = BlockType.Boom;
    this.board[genIndex.i][genIndex.j]?.destroy();
    const base = scene.add.circle(0, 0, BASE_W / 2, 0x000000).setOrigin(0, 0);
    const text = scene.add.text(
      BASE_W / 2,
      BASE_H / 2,
      `${this.boardMeta[genIndex.i][genIndex.j].value}`,
      {color: "#ffffff", fontSize: 24, fontStyle: 'bold'},
    ).setOrigin(0.5, 0.5);
    this.board[genIndex.i][genIndex.j] = scene.add.container(
      BASE_W * genIndex.j + MARGIN * (genIndex.j + 1),
      BASE_H * genIndex.i + MARGIN * (genIndex.i + 1),
      [base, text],
    );
  }
  explosion(scene: Stage, downPoint: {x: number; y: number}) {
    const index = Board.getIndex(downPoint);
    if (this.boardMeta[index.i][index.j].type === BlockType.Empty) return;

    if (!isInAppleCircle({
      point: downPoint,
      x: BASE_W * index.j + MARGIN * (index.j + 1) + BASE_W / 2,
      y: BASE_H * index.i + MARGIN * (index.i + 1) + BASE_W / 2,
      r: BASE_W / 2,
    })) return;

    if (scene.stageInfo.useBoom()) {
      this.boardMeta[index.i][index.j] = {
        type: BlockType.Empty,
        value: 0,
      };
      this.board[index.i][index.j]?.destroy();
      this.board[index.i][index.j] = null;
      this.emptyBoardIndexes.push(index);
      scene.ui.boomUpdate(scene);
      scene.stageInfo.addScore(1);
      scene.ui.scoreUpdate(scene);
    }
  }

  static getIndex(point: {x: number; y: number}) {
    const i = Math.floor((point.y - MARGIN) / (BASE_H + MARGIN));
    const j = Math.floor((point.x - MARGIN) / (BASE_W + MARGIN));
    return {i, j};
  }
}
