/* eslint-disable max-len */
import type { Stage } from '../scene/jumfrog.scene.stage';
import { Scaffolding } from './jumfrog.object.scaffolding';

export class IceScaffolding extends Scaffolding {
  constructor(scene: Stage, x: number, y: number, len: number, movable: boolean = false) {
    super(scene, x, y, len, movable);

    if (len === 1) {
      const single = scene.add.image(0, 0, 'ice_scaffolding_single').setOrigin(0, 0);
      this.add(single);
    } else if (len === 2) {
      const left = scene.add.image(0, 0, 'ice_scaffolding_left').setOrigin(0, 0);
      const right = scene.add.image(left.width, 0, 'ice_scaffolding_right').setOrigin(0, 0);
      this.add([left, right]);
    } else if (len >= 3) {
      const left = scene.add.image(0, 0, 'ice_scaffolding_left').setOrigin(0, 0);
      const middle = scene.add.image(left.width, 0, 'ice_scaffolding_middle').setOrigin(0, 0);
      const objs = [];
      for (let i = 0; i < len - 2; i += 1) {
        objs.push(scene.add.image(left.width + i * middle.width, 0, 'ice_scaffolding_middle').setOrigin(0, 0));
      }
      const right = scene.add.image(left.width + (len - 2) * middle.width, 0, 'ice_scaffolding_right').setOrigin(0, 0);
      this.add([left, ...objs, middle, right]);
    }

    (this.body as Phaser.Physics.Arcade.Body).setFriction(1);
  }

  static create(scene: Stage, x: number, y: number, len: number, movable: boolean = false): IceScaffolding {
    return new IceScaffolding(scene, x, y, len, movable);
  }
}
