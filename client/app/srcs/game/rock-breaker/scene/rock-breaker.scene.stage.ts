import { Scene } from "phaser";
import { Ship } from "../object/rock-breaker.object.ship";
import { Config } from "../object/rock-breaker.object.config";
import { RockPool } from "../object/rock-breaker.object.rockPool";
import { BulletPool } from "../object/rock-breaker.object.bulletPool";
import type { Rock } from "../object/rock-breaker.object.rock";
import type { Bullet } from "../object/rock-breaker.object.bullet";
import { GameOverUI } from "../ui/rock-breaker.ui.gameover";
import { StageState } from "../rock-breaker.enum";
import { StageUi } from "../ui/rock-breaker.ui.stage";
import { CoinPool } from "../object/rock-breaker.object.coinPool";
import { TestUi } from "../ui/rock-breaker.ui.test";

export class Stage extends Scene {
  public config: Config;
  public ship: Ship;
  public rockPool: RockPool;
  public bulletPool: BulletPool;
  public coinPool: CoinPool;
  private spawnTimer: number;
  private spawnInterval: number;
  private gameOverUi: GameOverUI;
  private stageUi: StageUi;
  private testUi: TestUi;

  private _loadingTimer: number;

  constructor() {
    super("Stage");
    this.ship = new Ship();
    this.config = new Config();
    this.rockPool = new RockPool(20);
    this.bulletPool = new BulletPool(20);
    this.coinPool = new CoinPool(20);
    this.spawnTimer = 0;
    this.spawnInterval = 1000; // 1초 (밀리초 단위)
    this.gameOverUi = new GameOverUI();
    this._loadingTimer = 0;
    this.stageUi = new StageUi();
    this.testUi = new TestUi();
  }

  create() {
    this.ship.create(this);
    this.rockPool.create(this);
    this.bulletPool.create(this);
    this.coinPool.create(this);
    this.gameOverUi.create(this);
    this.stageUi.create(this);
    this.testUi.create(this);

    this.physics.add.overlap(
      this.rockPool.pool.map((r) => r.object),
      this.ship.object,
      () => {
        this.ship.destroy();
      },
    );

    // Rock과 Bullet 충돌 설정
    this.rockPool.pool.forEach((rock) => {
      this.bulletPool.pool.forEach((bullet) => {
        this.physics.add.overlap(rock.rock, bullet.object, () =>
          this.onRockBulletCollision(rock, bullet),
        );
      });
    });

    this.physics.add.overlap(
      this.coinPool.pool.map((c) => c.object),
      this.ship.object,
      (coinObj) => {
        const coin = this.coinPool.pool.find((c) => c.object === coinObj);
        if (coin) {
          coin.collect(this);
        }
      },
    );
  }

  restartGame() {
    this.config.stageState = StageState.LOADING;
    this.ship.reset();
    this.rockPool.reset();
    this.bulletPool.reset();
    this.coinPool.reset();
    this.config.reset();
    this.gameOverUi.hide();
    this.spawnTimer = 0;
    this._loadingTimer = 0;
  }

  update() {
    if (this.ship.isActive === false) {
      this.config.stageState = StageState.SHIPDESTROYED;
    }
    if (this.config.stageState === StageState.SHIPDESTROYED) {
      this.gameOverUi.show();
      this.config.stageState = StageState.GAMEOVER;
    }
    if (this.config.stageState === StageState.LOADING) {
      this._loadingTimer = (this._loadingTimer || 0) + this.game.loop.delta;
      if (this._loadingTimer >= 2000) {
        this.config.stageState = StageState.PLAYING;
        this._loadingTimer = 0;
      }
      return;
    }
    if (this.config.stageState !== StageState.PLAYING) {
      return;
    }

    this.config.update(this);
    this.ship.update(this);
    this.rockPool.update();
    this.bulletPool.update();

    this.spawnTimer += this.game.loop.delta;
    if (this.spawnTimer >= this.spawnInterval) {
      this.rockPool.spawnRock(this);
      this.spawnTimer = 0;
    }
    this.stageUi.update(this);
    this.testUi.update();
  }

  onRockBulletCollision(rock: Rock, bullet: Bullet) {
    rock.decreaseHp(this, bullet.damage);
    bullet.destroy();
  }
}
