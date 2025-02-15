import { BOOM_COUNT, GAME_TIME, StageState } from "../constant/ten-game.constant.stage";
import type { Stage } from "../scene/ten-game.scene.stage";

export class StageInfo {
  public stageState: StageState = StageState.Playing;

  public startTime: number = 0;
  public booms: number = BOOM_COUNT;
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
  addBoom(scene: Stage) {
    this.booms += 1;
    scene.ui.boomUpdate(scene);
  }
  useBoom(scene: Stage) {
    if (this.booms > 0) {
      this.booms -= 1;
      scene.ui.boomUpdate(scene);
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
