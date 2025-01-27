import { CLEAR_TIME } from "../../scenes/game.scene.constant";
import { StageState } from "../../scenes/game.scene.enum";
import type { Stage } from "../../scenes/game.scene.stage";

type GenTime = {
  attacker: number;
  shooter: number;
  boss: number;
};
export class StageInfo {
  protected _genTime: GenTime;
  protected _stageStartTime: number;
  protected _stageLevel: number;
  protected _stageState: StageState;

  public leftTimeText!: Phaser.GameObjects.Text;
  public stageLevelText!: Phaser.GameObjects.Text;

  constructor() {
    this._stageLevel = 1;
    this._stageStartTime = Date.now();
    this._stageState = StageState.PLAYING;
    this._genTime = { attacker: 0, shooter: 0, boss: 0 };
  }
  get genTime() { return this._genTime; }
  get stageStartTime() { return this._stageStartTime; }
  get stageLevel() { return this._stageLevel; }
  get stageState() { return this._stageState; }
  public setGenTime(key: keyof GenTime, genTime: number) {
    this._genTime[key] = genTime;
  }
  public setStageStartTime(stageStartTime: number) {
    this._stageStartTime = stageStartTime;
  }
  public setStageState(stageState: StageState) {
    this._stageState = stageState;
  }
  public setStageLevel(stageLevel: number) {
    this._stageLevel = stageLevel;
  }

  public updateTime() {
    this.leftTimeText.setText(
      String(Math.floor((CLEAR_TIME + this.stageStartTime - Date.now()) / 1000)),
    );
  }
  public nextLevel() {
    this._stageLevel += 1;
    this.stageLevelText.setText(String(this.stageLevel));
  }
  public checkClear(): boolean {
    if (Date.now() - this.stageStartTime > CLEAR_TIME) {
      this._stageState = StageState.CLEAR;
      return true;
    }
    return false;
  }

  static init() {
    const stageInfo = new StageInfo();
    return stageInfo;
  }
  create(scene: Stage) {
    this.leftTimeText = scene.add.text(
      10,
      10,
      String(Math.floor((CLEAR_TIME + this.stageStartTime - Date.now()) / 1000)),
      { fontSize: '32px', color: '#000' },
    );
    this.stageLevelText = scene.add.text(
      10,
      50,
      String(this.stageLevel),
      { fontSize: '32px', color: '#000' },
    );
    scene.uiLayer.add(this.leftTimeText);
    scene.uiLayer.add(this.stageLevelText);
  }
}
