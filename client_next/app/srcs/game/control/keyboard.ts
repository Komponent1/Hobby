import {MoveDirection} from '../object/game.object.enum';
import type {Stage} from '../scenes/game.scene.stage';

export class Keyboard {
  public cursor: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  init(scene: Stage) {
    this.cursor = scene.input.keyboard?.createCursorKeys();
  }

  setControl(scene: Stage) {
    if (!this.cursor || !scene.player) return;

    if (this.cursor.left?.isDown) {
      scene.player.moveX(MoveDirection.LEFT);
    } else if (this.cursor.right?.isDown) {
      scene.player.moveX(MoveDirection.RIGHT);
    }

    if (this.cursor.up?.isDown) {
      scene.player.moveY(MoveDirection.UP);
    } else if (this.cursor.down?.isDown) {
      scene.player.moveY(MoveDirection.DOWN);
    }
  }
}
