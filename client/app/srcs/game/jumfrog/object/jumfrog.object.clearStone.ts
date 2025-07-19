import { mapConfig, X } from '../config/jumfrog.map.config';
import type { Stage } from '../scene/jumfrog.scene.stage';
import { Clear } from './ui/jumfrog.object.clear';

export class ClearStone extends Phaser.GameObjects.Container {
  private _overlapZone!: Phaser.GameObjects.Zone;

  constructor(scene: Stage, x: number, y: number) {
    super(scene, x, y);
    this._overlapZone = scene.add.zone(0, 0, 64, 64).setOrigin(0, 0);
    scene.physics.add.existing(this._overlapZone, false);
    (this._overlapZone.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    const stone = scene.add.image(0, 0, 'clear_stone').setOrigin(0, 0);
    stone.setDepth(1);

    this.add([this._overlapZone, stone]);

    scene.physics.add.overlap(
      scene.player,
      this._overlapZone,
      () => {
        scene.sound.play('clear');
        Clear.create(scene);
        this._overlapZone.destroy();
      },
      undefined,
      this,
    );

    scene.objLayer.add(this);
    scene.add.existing(this);
  }

  static create(scene: Stage) {
    return new ClearStone(scene, X + mapConfig.width / 2 - 32, mapConfig.height - 6059);
  }
}
