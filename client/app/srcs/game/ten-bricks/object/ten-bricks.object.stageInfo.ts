import { BOMB_COUNT, GAME_TIME, StageState } from "../constant/ten-bricks.constant.stage";
import type { Stage } from "../scene/ten-bricks.scene.stage";

export class StageInfo {
  public stageState: StageState = StageState.Playing;

  public startTime: number = 0;
  public bombs: number = BOMB_COUNT;
  public score: number = 0;

  static init() {
    return new StageInfo();
  }

  create() {
    this.startTime = Date.now();
  }
  addScore(score: number, scene: Stage) {
    this.score += score;
    scene.ui.scoreUpdate(scene);
  }
  addBomb(scene: Stage) {
    this.bombs += 1;
    scene.ui.bombUpdate(scene);
  }
  useBomb(scene: Stage) {
    if (this.bombs > 0) {
      this.bombs -= 1;
      scene.ui.bombUpdate(scene);
      return true;
    }
    return false;
  }
  checkClear(scene: Stage) {
    if (GAME_TIME - (Date.now() - this.startTime) <= 0) {
      this.stageState = StageState.GameOver;
      scene.scene.launch("Result", { stageInfo: this });
    }
  }
}
