import { Vector } from "../../../utils/vector";
import { SWORD } from "../../constant/survival-knight.constant.object";
import type { Stage } from "../../scenes/survival-knight.scene.stage";

export class Sword {
  protected _damage: number;
  protected _range: number;
  protected _area!: MatterJS.BodyType;

  constructor(damage: number, range: number) {
    this._damage = damage;
    this._range = range;
  }
  static init() {
    return new Sword(SWORD.ATTACK, SWORD.RANGE);
  }
  create(scene: Stage, x: number, y: number, dir: Vector) {
    let posX = 0;
    let posY = 0;
    let startAngle = 0;
    let endAngle = 0;
    if (dir.x === 0) {
      if (dir.y > 0) {
        posX = x;
        posY = y + scene.player.container.height / 2;
        startAngle = Math.PI * (1 / 4);
        endAngle = Math.PI * (3 / 4);
      } else {
        posX = x;
        posY = y - scene.player.container.height / 2;
        startAngle = Math.PI * (5 / 4);
        endAngle = Math.PI * (7 / 4);
      }
    } else if (dir.x > 0) {
      posX = x + scene.player.container.width / 2;
      posY = y;
      startAngle = -Math.PI * (1 / 4);
      endAngle = Math.PI * (1 / 4);
    } else {
      posX = x - scene.player.container.width / 2;
      posY = y;
      startAngle = Math.PI * (3 / 4);
      endAngle = Math.PI * (5 / 4);
    }
    if (dir) {
      this._area = scene.matter.add.fromVertices(
        posX,
        posY,
        Sword.createFanShapePoints(x, y, this._range, startAngle, endAngle, 2),
        { isSensor: true },
        true,
      );
      scene.pool.monsters.goblin_torch.forEach((monster) => {
        scene.matter.world.on('collisionstart', (event: any) => {
          event.pairs.forEach((pair: Phaser.Types.Physics.Matter.MatterCollisionPair) => {
            const { bodyA, bodyB } = pair;
            if ((bodyA === this._area && bodyB === monster.physics.body)
                || (bodyB === this._area && bodyA === monster.physics.body)) {
              monster.swordAttacked(scene, scene.player);
            }
          });
        });
      });
      scene.pool.monsters.fire.forEach((monster) => {
        scene.matter.world.on('collisionstart', (event: any) => {
          event.pairs.forEach((pair: Phaser.Types.Physics.Matter.MatterCollisionPair) => {
            const { bodyA, bodyB } = pair;
            if ((bodyA === this._area && bodyB === monster.physics.body)
                || (bodyB === this._area && bodyA === monster.physics.body)) {
              monster.swordAttacked(scene, scene.player);
            }
          });
        });
      });
      scene.pool.monsters.boss.forEach((monster) => {
        scene.matter.world.on('collisionstart', (event: any) => {
          event.pairs.forEach((pair: Phaser.Types.Physics.Matter.MatterCollisionPair) => {
            const { bodyA, bodyB } = pair;
            if ((bodyA === this._area && bodyB === monster.physics.body)
                || (bodyB === this._area && bodyA === monster.physics.body)) {
              monster.swordAttacked(scene, scene.player);
            }
          });
        });
      });
    }
  }

  public get position() { return { x: this._area.position.x, y: this._area.position.y }; }
  public get area() { return this._area; }
  public get damage() { return this._damage; }
  public get range() { return this._range; }

  public attack(scene: Stage, dir: Vector) {
    this.create(scene, scene.player.position.x, scene.player.position.y, dir);
  }
  public release(scene: Stage) {
    scene.matter.world.remove(this._area);
  }
  public setRange(range: number) {
    this._range = range;
  }
  public setDamage(damage: number) {
    this._damage = damage;
  }

  static createFanShapePoints(
    cx: number,
    cy: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    segments: number,
  ) {
    const points = [];
    const angleStep = (endAngle - startAngle) / segments;

    for (let i = 0; i <= segments; i += 1) {
      const angle = startAngle + i * angleStep;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      points.push({ x, y });
    }

    points.push({ x: cx, y: cy }); // 중심점 추가

    return points;
  }
}
