import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/jumfrog.map.config';
import type { Stage } from '../../scene/jumfrog.scene.stage';

export class Clear extends Phaser.GameObjects.Container {
  constructor(scene: Stage, x: number, y: number) {
    super(scene, x, y);
    this.setDepth(3);
    const clearText = scene.add.text(0, 0, 'Clear!', {
      fontSize: '64px',
      color: '#fff',
      fontStyle: 'bold',
    }).setOrigin(0.5, 0.5);

    const clearSec = Math.floor((Date.now() - scene.ui.startTime) / 1000);
    const clearTime = scene.add.text(0, 40, `Time: ${clearSec}S`, {
      fontSize: '24px',
      color: '#fff',
      fontStyle: 'bold',
    }).setOrigin(0.5, 0.5);

    this.add([clearText, clearTime]);
    scene.add.existing(this);
  }

  static create(scene: Stage) {
    return new Clear(scene, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 - 200);
  }
}
