import {MoveDirection} from '../objects/game.object.enum';
import type {Main} from '../scenes/game.scene.main';

export class Keyboard {
  public cursor: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  init(scene: Main) {
    this.cursor = scene.input.keyboard?.createCursorKeys();
  }

  setControl(scene: Main) {
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
