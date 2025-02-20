import {Scene} from 'phaser';
import { FRAME } from "../constant/survival-knight.constant.object";

export class Loader {
  static loadUi(scene: Scene, name: string) {
    scene.load.atlas(name, `/assets/survival-skull/ui/${name}.png`, `/assets/survival-skull/ui/${name}.json`);
  }
  static loadBullet(scene: Scene) {
    scene.load.image('bullet', `/assets/survival-skull/effect/bullet.png`);
  }
  static loadTilemap(scene: Scene) {
    scene.load.spritesheet('grass', `/assets/survival-knight/tile/grass.png`, {
      frameWidth: 64,
      frameHeight: 64,
    });
    scene.load.spritesheet('boundary', `/assets/survival-knight/tile/boundary.png`, {
      frameWidth: 192,
      frameHeight: 192,
    });
    scene.load.image('deco_rock', `/assets/survival-knight/tile/deco_rock.png`);
    scene.load.image('deco_grass', `/assets/survival-knight/tile/deco_grass.png`);
    scene.load.image('water', `/assets/survival-knight/tile/water.png`);
  }
  static createBoundaryAnimation(scene: Scene) {
    scene.anims.create({
      key: 'boundary_wave',
      frames: scene.anims.generateFrameNumbers('boundary', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
  }
  static loadCharacterSprite(scene: Scene, name: keyof typeof FRAME, size: number = 192) {
    scene.load.spritesheet(name, `/assets/survival-knight/character/${name}.png`, {
      frameWidth: size,
      frameHeight: size,
    });
  }
  static createAnimationV2(scene: Scene, name: keyof typeof FRAME) {
    if (scene.anims.exists(`${name}_idle`)) {
      return;
    }
    scene.anims.create({
      key: `${name}_idle`,
      frames: scene.anims.generateFrameNumbers(
        name,
        { start: FRAME[name].IDLE[0], end: FRAME[name].IDLE[1] },
      ),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: `${name}_walk`,
      frames: scene.anims.generateFrameNumbers(
        name,
        { start: FRAME[name].WALK[0], end: FRAME[name].WALK[1] },
      ),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: `${name}_attack`,
      frames: scene.anims.generateFrameNumbers(
        'player',
        { start: FRAME[name].ATTACK[0], end: FRAME[name].ATTACK[1] },
      ),
      frameRate: 20,
      repeat: 0,
    });
    if (name === 'player') {
      scene.anims.create({
        key: `${name}_attack_up`,
        frames: scene.anims.generateFrameNumbers(
          name,
          { start: FRAME[name].ATTACK_UP[0], end: FRAME[name].ATTACK_UP[1] },
        ),
        frameRate: 10,
        repeat: 0,
      });
      scene.anims.create({
        key: `${name}_attack_down`,
        frames: scene.anims.generateFrameNumbers(
          name,
          { start: FRAME[name].ATTACK_DOWN[0], end: FRAME[name].ATTACK_DOWN[1] },
        ),
        frameRate: 10,
        repeat: 0,
      });
    }
  }
  static loadSound(scene: Scene) {
    scene.load.audio('bgm', ['/assets/survival-knight/sound/bgm.wav']);
    scene.load.audio('btn', ['/assets/survival-knight/sound/btn.wav']);
    scene.load.audio('swing', ['/assets/survival-knight/sound/swing.wav']);
    scene.load.audio('damaged', ['/assets/survival-knight/sound/damaged.wav']);
    scene.load.audio('up', ['/assets/survival-knight/sound/up.wav']);
  }
}
