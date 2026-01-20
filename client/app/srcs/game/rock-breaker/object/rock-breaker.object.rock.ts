import { genTestCircle } from "../../utils/dummyObjectGenerator";
import type { Stage } from "../scene/rock-breaker.scene.stage";

export class Rock {
  private _object: Phaser.Physics.Arcade.Sprite;
  private _speed: number;
  private _rank: number;
  private _fullHp: number;
  private _hp: number;
  private _hasEnteredWorld: boolean;
  private _isActive: boolean;

  constructor() {
    this._object = null as unknown as Phaser.Physics.Arcade.Sprite;
    this._speed = 100;
    this._rank = 1;
    this._fullHp = 10;
    this._hp = this._fullHp;
    this._hasEnteredWorld = false;
    this._isActive = false;
  }

  get isActive() {
    return this._isActive;
  }
  get object() {
    return this._object;
  }

  create(scene: Stage) {
    const x = -100; // 임시 위치
    const y = -100; // 임시 위치

    this._object = genTestCircle({
      scene,
      radius: 20 * this._rank,
      x,
      y,
      isStatic: false,
    });

    // worldBounds collision 비활성화 (world 밖으로 나갈 수 있도록)
    if (this._object.body) {
      (this._object.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(
        false,
      );
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

    this._object.setPosition(x, y);
    this._hp = this._fullHp;

    this._object.setPosition(x, y);
    this._hasEnteredWorld = false;
    const dir = new Phaser.Math.Vector2(
      bounds.centerX - x,
      bounds.centerY - y,
    ).normalize();
    this._object.setVelocity(dir.x * this._speed, dir.y * this._speed);
    this._isActive = true;
  }

  update() {
    if (!this._object) return;
    if (!this._isActive) return;

    const { bounds } = this._object.scene.physics.world;
    const isInsideWorld =
      this._object.x >= bounds.x &&
      this._object.x <= bounds.x + bounds.width &&
      this._object.y >= bounds.y &&
      this._object.y <= bounds.y + bounds.height;

    // world 안으로 한 번 들어왔는지 체크
    if (!this._hasEnteredWorld && isInsideWorld) {
      this._hasEnteredWorld = true;
    }

    // world 안에 들어온 적이 있고, 지금 밖으로 나간 경우에만 destroy
    if (this._hasEnteredWorld && !isInsideWorld) {
      const isFarOutside =
        this._object.x < bounds.x - 100 ||
        this._object.x > bounds.x + bounds.width + 100 ||
        this._object.y < bounds.y - 100 ||
        this._object.y > bounds.y + bounds.height + 100;

      if (isFarOutside) {
        this.destroy();
      }
    }
  }

  decreaseHp(amount: number) {
    this._hp -= amount;
    if (this._hp <= 0) {
      this.destroy();
    }
  }

  destroy() {
    if (this._object) {
      this._isActive = false;
      this._object.setPosition(-100, -100);
      this._object.setVelocity(0, 0);
    }
  }
}
