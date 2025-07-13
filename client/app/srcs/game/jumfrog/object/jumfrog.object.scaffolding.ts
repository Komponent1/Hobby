/* eslint-disable max-len */
import { MAP_W, X } from '../config/jumfrog.map.config';
import type { Stage } from '../scene/jumfrog.scene.stage';

export const MARGIN = 50;
export class Scaffolding extends Phaser.GameObjects.Container {
  private _movable = false;
  private _offset = 0;

  constructor(scene: Stage, x: number, y: number, len: number, movable: boolean = false) {
    super(scene, x, y);
    this._movable = movable;

    scene.objLayer.add(this);
    scene.add.existing(this);
    scene.physics.world.enable(this);

    if (len === 1) {
      const single = scene.add.image(0, 0, 'scaffolding_single').setOrigin(0, 0);
      this.add(single);
      this.setSize(single.width, single.height);
    } else if (len === 2) {
      const left = scene.add.image(0, 0, 'scaffolding_left').setOrigin(0, 0);
      const right = scene.add.image(left.width, 0, 'scaffolding_right').setOrigin(0, 0);
      this.add([left, right]);
      this.setSize(left.width + right.width, left.height);
      this._offset = left.width / 2;
    } else if (len >= 3) {
      const left = scene.add.image(0, 0, 'scaffolding_left').setOrigin(0, 0);
      const middle = scene.add.image(left.width, 0, 'scaffolding_middle').setOrigin(0, 0);
      const objs = [];
      for (let i = 0; i < len - 2; i += 1) {
        objs.push(scene.add.image(left.width + i * middle.width, 0, 'scaffolding_middle').setOrigin(0, 0));
      }
      const right = scene.add.image(left.width + (len - 2) * middle.width, 0, 'scaffolding_right').setOrigin(0, 0);
      this.add([left, ...objs, middle, right]);
      this.setSize(left.width + (len - 2) * middle.width + right.width, left.height);
      this._offset = left.width + (len - 3) * middle.width;
    }
    this.setInteractive();

    scene.physics.add.existing(this);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.width, this.height);
    body.setImmovable();
    body.setDirectControl();
    body.setCollideWorldBounds(true);
    body.setAllowGravity(false);
    body.setOffset(this.width / 2, this.height / 2);
  }

  static create(scene: Stage, x: number, y: number, len: number, movable: boolean = false): Scaffolding {
    const scaffolding = new Scaffolding(scene, x, y, len, movable);
    if (scaffolding._movable) {
      scene.tweens.add({
        targets: scaffolding,
        x: X + MARGIN,
        duration: ((scaffolding.x - MARGIN) / (MAP_W - scaffolding.width)) * 5000,
        onComplete: () => {
          scene.tweens.add({
            targets: scaffolding,
            x: { from: X + MARGIN, to: X + MAP_W - scaffolding.width },
            duration: 5000,
            yoyo: true,
            repeat: -1,
          });
        },
      });
    }
    return scaffolding;
  }
}
