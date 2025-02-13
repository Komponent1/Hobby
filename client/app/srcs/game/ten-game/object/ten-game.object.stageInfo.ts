import { GAME_TIME, StageState } from "../constant/ten-game.constant.stage";
import { Stage } from "../scene/ten-game.scene.stage";

export class StageInfo {
  public stageState: StageState = StageState.Playing;

  public startTime: number = 0;
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
  checkClear(scene: Stage) {
    if (GAME_TIME - (Date.now() - this.startTime) <= 0) {
      this.stageState = StageState.GameOver;
      scene.scene.launch("Result", { stageInfo: this });
    }
  }
}
