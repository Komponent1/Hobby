import {
  IDLE_FRAME_END, IDLE_FRAME_START, READY_JUMP_FRAME_END,
  READY_JUMP_FRAME_START, WALK_FRAME_END, WALK_FRAME_START,
} from '../jumfrog.constant';

export class Loader {
  /** 출처: https://eduardscarpato.itch.io/toxic-frog-animations-pixel-art-2d-free */
  static loadFrog(scene: Phaser.Scene) {
    scene.load.spritesheet("player", "/assets/jumfrog/player.png/", {
      frameWidth: 48,
      frameHeight: 48,
    });
  }

  static createFrogAnimation(scene: Phaser.Scene) {
    scene.anims.create({
      key: "idle",
      frames: scene.anims.generateFrameNumbers("player", {
        start: IDLE_FRAME_START,
        end: IDLE_FRAME_END,
      }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "walk",
      frames: scene.anims.generateFrameNumbers("player", {
        start: WALK_FRAME_START,
        end: WALK_FRAME_END,
      }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "ready_jump",
      frames: scene.anims.generateFrameNumbers("player", {
        start: READY_JUMP_FRAME_START,
        end: READY_JUMP_FRAME_END,
      }),
      frameRate: 10,
      repeat: 0,
    });
  }
}
