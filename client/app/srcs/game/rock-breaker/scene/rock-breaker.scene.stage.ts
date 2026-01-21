import { Scene } from "phaser";
import { Ship } from "../object/rock-breaker.object.ship";
import { Config } from "../object/rock-breaker.object.config";
import { RockPool } from "../object/rock-breaker.object.rockPool";
import { BulletPool } from "../object/rock-breaker.object.bulletPool";
import type { Rock } from "../object/rock-breaker.object.rock";
import type { Bullet } from "../object/rock-breaker.object.bullet";
import { ShareConfig } from "../object/rock-breaker.object.shareConfig";

export class Stage extends Scene {
  public config: Config;
  public ship: Ship;
  public rockPool: RockPool;
  public bulletPool: BulletPool;
  public shareConfig: ShareConfig;
  private spawnTimer: number;
  private spawnInterval: number;

  constructor() {
    super("Stage");
    this.ship = new Ship();
    this.config = new Config();
    this.rockPool = new RockPool(20);
    this.bulletPool = new BulletPool(20);
    this.spawnTimer = 0;
    this.spawnInterval = 1000; // 1초 (밀리초 단위)
    this.shareConfig = new ShareConfig();
  }

  create() {
    this.ship.create(this);
    this.rockPool.create(this);
    this.bulletPool.create(this);

    this.physics.add.overlap(
      this.rockPool.pool.map((r) => r.object),
      this.ship.object,
      () => {},
    );

    // Rock과 Bullet 충돌 설정
    this.rockPool.pool.forEach((rock) => {
      this.bulletPool.pool.forEach((bullet) => {
        this.physics.add.overlap(rock.rock, bullet.object, () =>
          Stage.onRockBulletCollision(rock, bullet),
        );
      });
    });
  }

  update() {
    this.ship.update(this);
    this.rockPool.update();
    this.bulletPool.update();

    this.spawnTimer += this.game.loop.delta;
    if (this.spawnTimer >= this.spawnInterval) {
      this.rockPool.spawnRock(this);
      this.spawnTimer = 0;
    }
  }

  private static onRockBulletCollision(rock: Rock, bullet: Bullet) {
    rock.decreaseHp(bullet.damage);
    bullet.destroy();
  }
}
