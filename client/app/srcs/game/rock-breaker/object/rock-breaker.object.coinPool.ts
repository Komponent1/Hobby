import { Coin } from "./rock-breaker.object.coin";

export class CoinPool {
  private _coins: Coin[];
  private _poolSize: number;

  constructor(poolSize: number) {
    this._poolSize = poolSize;
    this._coins = [];
  }

  get pool() {
    return this._coins;
  }

  create(scene: Phaser.Scene) {
    for (let i = 0; i < this._poolSize; i += 1) {
      const coin = new Coin();
      coin.create(scene);
      this._coins.push(coin);
    }
  }

  reset() {
    this._coins.forEach((coin) => coin.reset());
  }

  spawnCoin(x: number, y: number) {
    const coin = this._coins.find((c) => !c.isSpawned);
    if (coin) {
      coin.spawn(x, y);
    }
  }
}
