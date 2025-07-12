import { MAP_W, X } from '../config/jumfrog.map.config';
import type { Stage } from '../scene/jumfrog.scene.stage';

export const MARGIN = 50;
export class Scaffolding extends Phaser.GameObjects.Container {
  private _movable = false;

  constructor(scene: Stage, x: number, y: number, movable: boolean = false) {
    super(scene, x, y);
    this._movable = movable;

    scene.objLayer.add(this);
    scene.add.existing(this);
    scene.physics.world.enable(this);

    const left = scene.add.image(0, 0, 'scaffolding_left');
    const middle = scene.add.image(left.width, 0, 'scaffolding_middle');
    const right = scene.add.image(left.width + middle.width, 0, 'scaffolding_right');

    this.add([left, middle, right]);
    this.setSize(left.width + middle.width + right.width, left.height);
    this.setInteractive();

    scene.physics.add.existing(this);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.width, this.height);
    body.setImmovable();
    body.setDirectControl();
    body.setCollideWorldBounds(true);
    body.setAllowGravity(false);
    body.setOffset(left.width, 0);
  }

  static create(scene: Stage, x: number, y: number, movable: boolean = false): Scaffolding {
    const scaffolding = new Scaffolding(scene, x, y, movable);
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
