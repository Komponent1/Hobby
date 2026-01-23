class StateShare {
  private _coin: number;

  constructor() {
    this._coin = 0;
  }

  addCoin(amount: number) {
    this._coin += amount;
  }

  get coin() {
    return this._coin;
  }
}

export const stateShare = new StateShare();
