import {
  BASE_H, BASE_W, BlockDestroyType, BlockType, COL, MARGIN, ROW,
  WINDOW_H,
  WINDOW_POS_X,
  WINDOW_POS_Y,
  WINDOW_RADIUS,
  WINDOW_STROKE,
  WINDOW_W,
} from "../constant/ten-game.constant.stage";
import { Block } from "../dto/ten-game.dto.ref";
import type { Stage } from "../scene/ten-game.scene.stage";
import { drawRoundRect, getRandomIndex, isInAppleCircle } from "../utils/ten-game.utils.board";
import {Bomb} from './ten-game.object.bomb';
import {Brick} from './ten-game.object.brick';

export class Board {
  private _container!: Phaser.GameObjects.Container;
  private _outline!: Phaser.GameObjects.Graphics;
  private _deletedBricks: (Brick | Bomb | null)[] = [];

  public board!: (Brick | Bomb | null)[][];
  public boardMeta!: Block[][];

  static init() {
    const board = new Board();
    board.boardMeta = Array.from({length: ROW}, () => Array.from({length: COL}, () => ({
      type: BlockType.Apple,
      value: Math.round(Math.random() * 8) + 1,
    })));
    return board;
  }
  create(scene: Stage) {
    if (!this.boardMeta) return;
    this._outline = drawRoundRect(
      scene,
      WINDOW_POS_X,
      WINDOW_POS_Y,
      WINDOW_W,
      WINDOW_H,
      WINDOW_RADIUS,
      WINDOW_STROKE,
    );
    this._container = scene.add.container(0, 0).setDepth(1);
    const mask = scene.make.graphics();
    mask.fillStyle(0xffffff, 0);
    mask.fillRect(WINDOW_POS_X, WINDOW_POS_Y, WINDOW_W, WINDOW_H);
    this._container.setMask(mask.createGeometryMask());
    this.board = Array.from({length: ROW}, () => Array.from({length: COL}, () => null));
    this.boardMeta.forEach((row, i) => {
      row.forEach((col, j) => {
        this.board[i][j] = Brick.create(scene, i, j, col.value, this._container);
      });
    });
  }
  isSumTenAndIndexes(
    downPoint: {x: number; y: number} | null,
    releasePoint: {x: number; y: number},
  ) {
    if (downPoint === null) return {isTen: false, ijs: []};

    const ijs = [];
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
        const appleX = WINDOW_POS_X + MARGIN + j * (BASE_W + MARGIN) + BASE_W / 2;
        const appleY = WINDOW_POS_Y + MARGIN + (i - ROW / 2) * (BASE_H + MARGIN) + BASE_H / 2;

        if (appleX >= startPoint.x && appleX <= endPoint.x
            && appleY >= startPoint.y && appleY <= endPoint.y) {
          if (this.boardMeta[i][j] !== undefined) {
            ijs.push({i, j});
            sum += this.boardMeta[i][j].value;
          }
        }
      }
    }
    return {isTen: sum === 10, ijs};
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

    const {isTen, ijs} = this.isSumTenAndIndexes(startPoint, endPoint);
    if (isTen) {
      scene.sound.play('brick');
      const score = ijs.length;

      this.destroyBricks(ijs, scene, 'Drag');
      return score;
    }
    return 0;
  }

  update() {
    this.board.forEach((row) => {
      row.forEach((col) => {
        col?.move();
      });
    });
    this._deletedBricks.forEach((brick) => {
      brick?.update();
    });
    this._deletedBricks = this._deletedBricks.filter((brick) => brick?.destroyed);
  }
  genNewBomb(scene: Stage) {
    const genIndex = getRandomIndex(this.boardMeta, BlockType.Apple);
    this.boardMeta[genIndex.i][genIndex.j].type = BlockType.Bomb;
    this.board[genIndex.i][genIndex.j]?.destroy(BlockDestroyType.Change, scene);
    this.board[genIndex.i][genIndex.j] = null;
    this.board[genIndex.i][genIndex.j] = Bomb.create(
      scene,
      genIndex.i,
      genIndex.j,
      this.boardMeta[genIndex.i][genIndex.j].value,
      this._container,
    );
  }
  explosion(scene: Stage, downPoint: {x: number; y: number}) {
    const index = Board.getIndex(downPoint);
    if (this.boardMeta[index.i][index.j].type === BlockType.Empty) return;

    if (!isInAppleCircle({
      point: downPoint,
      x: WINDOW_POS_X + BASE_W * index.j + MARGIN * (index.j + 1) + BASE_W / 2,
      // eslint-disable-next-line max-len
      y: WINDOW_POS_Y + BASE_H * (index.i - ROW / 2) + MARGIN * (index.i + 1 - ROW / 2) + BASE_W / 2,
      r: BASE_W / 2,
    })) return;

    if (scene.stageInfo.useBomb(scene)) {
      scene.sound.play('bomb');
      this.destroyBricks([{i: index.i, j: index.j}], scene, 'Bomb');
      scene.stageInfo.addScore(1, scene);
    }
  }

  destroyBricks(ijs: {i: number; j: number}[], scene: Stage, type: keyof typeof BlockDestroyType) {
    ijs.forEach(({i, j}) => {
      if (this.boardMeta[i][j].type === BlockType.Bomb && type === 'Drag') {
        scene.stageInfo.addBomb(scene);
      }
      this.boardMeta[i][j] = {
        type: BlockType.Empty,
        value: 0,
      };
      if (this.board[i][j]) {
        this._container.remove(this.board[i][j]!.container);
        this.board[i][j]?.destroy(BlockDestroyType[type], scene);
        this._deletedBricks.push(this.board[i][j]);
        this.board[i][j] = null;
      }
    });
    for (let j = 0; j < COL; j += 1) {
      let emptyCount = 0;
      for (let i = ROW - 1; i >= 0; i -= 1) {
        if (this.boardMeta[i][j].type === BlockType.Empty) {
          emptyCount += 1;
        } else if (emptyCount > 0) {
          // 빈 공간을 채움
          this.boardMeta[i + emptyCount][j] = this.boardMeta[i][j];
          this.boardMeta[i][j] = {
            type: BlockType.Empty,
            value: 0,
          };
          this.board[i + emptyCount][j] = this.board[i][j];
          this.board[i][j] = null;
          // 블록의 위치를 업데이트
          this.board[i + emptyCount][j]?.setPos(i + emptyCount, j);
        }
      }
      for (let i = 0; i < emptyCount; i += 1) {
        const value = Math.round(Math.random() * 8) + 1;
        this.boardMeta[i][j] = {
          type: BlockType.Apple,
          value,
        };
        this.board[i][j] = Brick.create(
          scene,
          i,
          j,
          value,
          this._container,
        );
      }
    }
  }

  static getIndex(point: {x: number; y: number}) {
    const i = Math.floor((point.y - WINDOW_POS_Y - MARGIN) / (BASE_H + MARGIN)) + ROW / 2;
    const j = Math.floor((point.x - WINDOW_POS_X - MARGIN) / (BASE_W + MARGIN));
    return {i, j};
  }
}
