import { StageState } from "../rock-breaker.enum";
import type { Stage } from "../scene/rock-breaker.scene.stage";

export class Config {
  private _fullEngine: number;
  private _engine: number;
  private _canGoNextStageScore: number;
  private _engineReducedRate: number;
  private _currentLevel: number;
  private _currentRank: number;
  private _currentScore: number;
  private _engineReducedRateTimer: number;
  private _stageState: StageState;

  constructor() {
    this._fullEngine = 100;
    this._engine = this._fullEngine;
    this._canGoNextStageScore = 10;
    this._engineReducedRate = 0.9;
    this._currentLevel = 1;
    this._currentRank = 1;
    this._currentScore = 0;
    this._engineReducedRateTimer = 0;
    this._stageState = StageState.PLAYING;
  }

  reset() {
    this._engine = this._fullEngine;
    this._currentScore = 0;
    this._engineReducedRate = 0.9;
    this._engineReducedRateTimer = 0;
  }

  update(scene: Stage) {
    const deltaSeconds = scene.game.loop.delta / 1000; // 델타 시간을 초 단위로 변환

    // 1초마다 engineReducedRate 증가
    this._engineReducedRateTimer += deltaSeconds;
    if (this._engineReducedRateTimer >= 1) {
      this._engineReducedRate += 0.03;
      this._engineReducedRateTimer = 0;
      this._engine -= this.engineReducedRate;
    }
  }

  addScore(amount: number) {
    this._currentScore += amount;
  }

  get fullEngine() {
    return this._fullEngine;
  }

  get engine() {
    return this._engine;
  }

  get canGoNextStageScore() {
    return this._canGoNextStageScore;
  }

  get engineReducedRate() {
    return this._engineReducedRate;
  }

  get currentLevel() {
    return this._currentLevel;
  }

  get currentRank() {
    return this._currentRank;
  }

  get currentScore() {
    return this._currentScore;
  }

  get stageState() {
    return this._stageState;
  }

  set stageState(state: StageState) {
    this._stageState = state;
  }
}
