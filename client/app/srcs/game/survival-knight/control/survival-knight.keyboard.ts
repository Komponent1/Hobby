import { PLAYER_INIT_SPEED } from "../constant/survival-knight.constant.player";
import {CharacterStatus} from '../object/survival-knight.object.enum';
import type {Stage} from '../scenes/survival-knight.scene.stage';

export class Keyboard {
  public cursor: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  init(scene: Stage) {
    this.cursor = scene.input.keyboard?.createCursorKeys();
  }

  setMoveControl(scene: Stage) {
    if (!this.cursor || !scene.player) return;

    if (
      this.cursor.left?.isDown
      || this.cursor.right?.isDown
      || this.cursor.up?.isDown
      || this.cursor.down?.isDown
    ) {
      scene.player.setSpeed(PLAYER_INIT_SPEED);
      if (this.cursor.left?.isDown) {
        scene.player.flip(true);
        if (this.cursor.up?.isDown) {
          scene.player.setDir(-1, -1);
        } else if (this.cursor.down?.isDown) {
          scene.player.setDir(-1, 1);
        } else {
          scene.player.setDir(-1, 0);
        }
      } else if (this.cursor.right?.isDown) {
        scene.player.flip(false);
        if (this.cursor.up?.isDown) {
          scene.player.setDir(1, -1);
        } else if (this.cursor.down?.isDown) {
          scene.player.setDir(1, 1);
        } else {
          scene.player.setDir(1, 0);
        }
      } else {
        if (this.cursor.up?.isDown) {
          scene.player.setDir(0, -1);
        }
        if (this.cursor.down?.isDown) {
          scene.player.setDir(0, 1);
        }
      }
    } else {
      scene.player.setSpeed(0);
    }
  }

  setAttackControl(scene: Stage) {
    if (!this.cursor || !scene.player) return;
    if (scene.player.status === CharacterStatus.DEAD) return;
    if (scene.player.status === CharacterStatus.ATTACK) return;

    if (this.cursor.space?.isDown) {
      console.log('attack');
      scene.player.swordAttack(scene);
    }
  }
}
