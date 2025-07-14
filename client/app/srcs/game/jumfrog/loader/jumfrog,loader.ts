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

  /** 출처: https://free-game-assets.itch.io/free-swamp-2d-tileset-pixel-art */
  static loadScaffoldingComp(scene: Phaser.Scene) {
    scene.load.image("scaffolding_left", "/assets/jumfrog/scaffolding/scaffolding_left.png");
    scene.load.image("scaffolding_middle", "/assets/jumfrog/scaffolding/scaffolding_middle.png");
    scene.load.image("scaffolding_right", "/assets/jumfrog/scaffolding/scaffolding_right.png");
    scene.load.image("scaffolding_single", "/assets/jumfrog/scaffolding/scaffolding_single.png");
  }
  /** 출처: https://free-game-assets.itch.io/free-swamp-2d-tileset-pixel-art */
  static loadTile(scene: Phaser.Scene) {
    scene.load.image("tile", "/assets/jumfrog/tile/tile.png");
    scene.load.image("tile_t", "/assets/jumfrog/tile/tile_t.png");
    scene.load.image("tile_b", "/assets/jumfrog/tile/tile_b.png");
    scene.load.image("tile_l", "/assets/jumfrog/tile/tile_l.png");
    scene.load.image("tile_r", "/assets/jumfrog/tile/tile_r.png");
    scene.load.image("tile_lb", "/assets/jumfrog/tile/tile_lb.png");
    scene.load.image("tile_lt", "/assets/jumfrog/tile/tile_lt.png");
    scene.load.image("tile_rb", "/assets/jumfrog/tile/tile_rb.png");
    scene.load.image("tile_rt", "/assets/jumfrog/tile/tile_rt.png");
    scene.load.image("background", "/assets/jumfrog/background.png");
  }
  /** 출처: https://dreammix.itch.io/keyboard-keys-for-ui */
  static loadUi(scene: Phaser.Scene) {
    scene.load.spritesheet("keyboard", "/assets/jumfrog/ui/keyboard.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    scene.load.spritesheet("keyboard_extra", "/assets/jumfrog/ui/keyboard_extra.png", {
      frameWidth: 32,
      frameHeight: 16,
    });
  }
  /** 출처: https://kanekizlf.itch.io/jump-sounds */
  static loadSound(scene: Phaser.Scene) {
    scene.load.audio("jump", "/assets/jumfrog/sound/jump.mp3");
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
