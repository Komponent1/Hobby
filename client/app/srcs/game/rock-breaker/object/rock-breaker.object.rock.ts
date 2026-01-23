import { genTestCircle } from "../../utils/dummyObjectGenerator";
import type { Stage } from "../scene/rock-breaker.scene.stage";
import { HpBar } from "./rock-breaker.object.hpBar";

export class Rock {
  private _container: Phaser.GameObjects.Container;
  private _object: Phaser.Physics.Arcade.Sprite;
  private _speed: number;
  private _rank: number;
  private _fullHp: number;
  private _hp: number;
  private _hpBar: HpBar;
  private _hasEnteredWorld: boolean;
  private _isActive: boolean;

  constructor() {
    this._container = null as unknown as Phaser.GameObjects.Container;
    this._object = null as unknown as Phaser.Physics.Arcade.Sprite;
    this._speed = 100;
    this._rank = 1;
    this._fullHp = 1;
    this._hpBar = new HpBar();
    this._hp = this._fullHp;
    this._hasEnteredWorld = false;
    this._isActive = false;
  }

  get isActive() {
    return this._isActive;
  }
  get object() {
    return this._container;
  }
  get rock() {
    return this._object;
  }

  create(scene: Stage) {
    const x = -100; // 임시 위치
    const y = -100; // 임시 위치

    this._object = genTestCircle({
      scene,
      radius: 20 * this._rank,
      x: 0,
      y: 0,
    }) as Phaser.Physics.Arcade.Sprite;

    this._hpBar.create(scene, 0, -(10 + 20 * this._rank));
    this._container = scene.add.container(x, y, [
      this._object,
      this._hpBar.container,
    ]);

    // Container를 physics object로 만들기 (velocity만 사용, collision은 비활성화)
    scene.physics.world.enable(this._container);

    if (this._container.body) {
      const body = this._container.body as Phaser.Physics.Arcade.Body;
      body.setCollideWorldBounds(false);
      // // Container의 collider 완전히 비활성화
      body.setSize(0, 0);
      body.setAllowGravity(false);
    }
  }

  reset() {
    this._isActive = false;
    this._container.setPosition(-100, -100);
    this._hpBar.redraw(1);

    // Container의 body velocity를 0으로 설정
    if (this._container.body) {
      (this._container.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
    }
  }

  spawn(scene: Stage) {
    const { bounds } = scene.physics.world;

    // world 외부에서 랜덤 위치 생성 (상, 하, 좌, 우 중 랜덤)
    const side = Phaser.Math.Between(0, 3);
    let x: number;
    let y: number;

    switch (side) {
      case 0: // 위쪽
        x = Phaser.Math.Between(bounds.x, bounds.x + bounds.width);
        y = bounds.y - 150;
        break;
      case 1: // 아래쪽
        x = Phaser.Math.Between(bounds.x, bounds.x + bounds.width);
        y = bounds.y + bounds.height + 150;
        break;
      case 2: // 왼쪽
        x = bounds.x - 150;
        y = Phaser.Math.Between(bounds.y, bounds.y + bounds.height);
        break;
      case 3: // 오른쪽
      default:
        x = bounds.x + bounds.width + 150;
        y = Phaser.Math.Between(bounds.y, bounds.y + bounds.height);
        break;
    }

    this._container.setPosition(x, y);
    this._hp = this._fullHp;

    this._container.setPosition(x, y);
    this._hasEnteredWorld = false;
    const dir = new Phaser.Math.Vector2(
      bounds.centerX - x,
      bounds.centerY - y,
    ).normalize();

    // Container의 body에 velocity 적용
    if (this._container.body) {
      (this._container.body as Phaser.Physics.Arcade.Body).setVelocity(
        dir.x * this._speed,
        dir.y * this._speed,
      );
    }
    this._isActive = true;
  }

  update() {
    if (!this._container) return;
    if (!this._isActive) return;

    const { bounds } = this._container.scene.physics.world;
    const isInsideWorld =
      this._container.x >= bounds.x &&
      this._container.x <= bounds.x + bounds.width &&
      this._container.y >= bounds.y &&
      this._container.y <= bounds.y + bounds.height;

    // world 안으로 한 번 들어왔는지 체크
    if (!this._hasEnteredWorld && isInsideWorld) {
      this._hasEnteredWorld = true;
    }

    // world 안에 들어온 적이 있고, 지금 밖으로 나간 경우에만 destroy
    if (this._hasEnteredWorld && !isInsideWorld) {
      const isFarOutside =
        this._container.x < bounds.x - 100 ||
        this._container.x > bounds.x + bounds.width + 100 ||
        this._container.y < bounds.y - 100 ||
        this._container.y > bounds.y + bounds.height + 100;

      if (isFarOutside) {
        this.destroy();
      }
    }
  }

  decreaseHp(scene: Stage, amount: number) {
    this._hp -= amount;
    this._hpBar.redraw(this._hp / this._fullHp);
    if (this._hp <= 0) {
      scene.coinPool.spawnCoin(this._container.x, this._container.y);
      this.destroy();
    }
  }

  destroy() {
    if (this._container) {
      this._isActive = false;
      this._container.setPosition(-100, -100);
      this._hpBar.redraw(1);

      // Container의 body velocity를 0으로 설정
      if (this._container.body) {
        (this._container.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
      }
    }
  }
}
