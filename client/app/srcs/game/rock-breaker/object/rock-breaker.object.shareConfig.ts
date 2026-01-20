export class ShareConfig {
  private _skill: any;
  private _coin: number;

  constructor() {
    this._skill = {};
    this._coin = 0;
  }

  get skill() {
    return this._skill;
  }

  get coin() {
    return this._coin;
  }

  addCoin(amount: number) {
    this._coin += amount;
  }
}
