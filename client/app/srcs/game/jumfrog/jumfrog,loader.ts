export class Loader {
  /** 출처: https://eduardscarpato.itch.io/toxic-frog-animations-pixel-art-2d-free */
  static loadFrog(scene: Phaser.Scene) {
    scene.load.spritesheet("player", "/assets/jumfrog/player.png/", {
      frameWidth: 48,
      frameHeight: 48,
    });
  }
  /** 출처: https://free-game-assets.itch.io/free-swamp-2d-tileset-pixel-art */
  static loadClearStone(scene: Phaser.Scene) {
    scene.load.image("clear_stone", "/assets/jumfrog/clear_stone.png");
  }
  /** 출처: https://free-game-assets.itch.io/free-swamp-2d-tileset-pixel-art */
  static loadScaffoldingComp(scene: Phaser.Scene) {
    scene.load.image("scaffolding_left", "/assets/jumfrog/scaffolding/scaffolding_left.png");
    scene.load.image("scaffolding_middle", "/assets/jumfrog/scaffolding/scaffolding_middle.png");
    scene.load.image("scaffolding_right", "/assets/jumfrog/scaffolding/scaffolding_right.png");
    scene.load.image("scaffolding_single", "/assets/jumfrog/scaffolding/scaffolding_single.png");
    scene.load.image("ice_scaffolding_left", "/assets/jumfrog/scaffolding/ice_scaffolding_left.png");
    scene.load.image("ice_scaffolding_middle", "/assets/jumfrog/scaffolding/ice_scaffolding_middle.png");
    scene.load.image("ice_scaffolding_right", "/assets/jumfrog/scaffolding/ice_scaffolding_right.png");
    scene.load.image("ice_scaffolding_single", "/assets/jumfrog/scaffolding/ice_scaffolding_single.png");
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
  static loadJumpSound(scene: Phaser.Scene) {
    scene.load.audio("jump", "/assets/jumfrog/sound/jump.mp3");
  }
  /** https://placeholder-assets.itch.io/50-free-sounds-pack */
  static loadClearSound(scene: Phaser.Scene) {
    scene.load.audio("clear", "/assets/jumfrog/sound/clear.wav");
  }

  static create(scene: Phaser.Scene) {
    this.loadJumpSound(scene);
    this.loadClearSound(scene);
    this.loadFrog(scene);
    this.loadScaffoldingComp(scene);
    this.loadTile(scene);
    this.loadUi(scene);
    this.loadClearStone(scene);
  }
}
