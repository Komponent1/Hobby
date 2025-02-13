import { GAME_TIME, StageState } from "../constant/ten-game.constant.stage";
import type { Stage } from "../scene/ten-game.scene.stage";

export class StageInfo {
  public stageState: StageState = StageState.Playing;

  public startTime: number = 0;
  public booms: number = 5;
  public score: number = 0;

  static init() {
    return new StageInfo();
  }

  create() {
    this.startTime = Date.now();
  }
  addScore(score: number) {
    this.score += score;
  }
  addBoom() {
    this.booms += 1;
  }
  useBoom() {
    if (this.booms > 0) {
      this.booms -= 1;
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
