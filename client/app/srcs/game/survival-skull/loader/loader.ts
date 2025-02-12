import {Scene} from 'phaser';

export class Loader {
  static loadCharacterAtlas(scene: Scene, name: string) {
    scene.load.atlas(name, `/assets/survival-skull/character/${name}/${name}.png`, `/assets/survival-skull/character/${name}/${name}.json`);
  }
  static loadEffectAtlas(scene: Scene, name: string) {
    scene.load.atlas(name, `/assets/survival-skull/effect/${name}.png`, `/assets/survival-skull/effect/${name}.json`);
  }
  static loadTile(scene: Scene, name: string) {
    scene.load.atlas(name, `/assets/survival-skull/tile/${name}.png`, `/assets/survival-skull/tile/${name}.json`);
  }
  static loadUi(scene: Scene, name: string) {
    scene.load.atlas(name, `/assets/survival-skull/ui/${name}.png`, `/assets/survival-skull/ui/${name}.json`);
  }
  static loadBullet(scene: Scene) {
    scene.load.image('bullet', `/assets/survival-skull/effect/bullet.png`);
  }
  static createEffectAnimation(scene: Scene, name: string) {
    scene.anims.create({
      key: `${name}_effect`,
      frames: scene.anims.generateFrameNames(name, {
        suffix: '.png',
        zeroPad: 3,
        start: 0,
        end: 10,
      }),
      frameRate: 30,
      repeat: 0,
    });
  }
  static createCharacterAnimation(scene: Scene, name: string) {
    scene.anims.create({
      key: `${name}_walk`,
      frames: scene.anims.generateFrameNames(name, {
        prefix: 'Walking/',
        suffix: '.png',
        start: 0,
        end: 23,
        zeroPad: 3,
      }),
      frameRate: 30,
      repeat: -1,
    });
    scene.anims.create({
      key: `${name}_die`,
      frames: scene.anims.generateFrameNames(name, {
        prefix: 'Dying/',
        suffix: '.png',
        start: 0,
        end: 14,
        zeroPad: 3,
      }),
      frameRate: 30,
      repeat: 0,
    });
    scene.anims.create({
      key: `${name}_attacked`,
      frames: scene.anims.generateFrameNames(name, {
        prefix: 'Hurt/',
        suffix: '.png',
        start: 0,
        end: 11,
        zeroPad: 3,
      }),
      frameRate: 30,
      repeat: -1,
    });
  }
  static createPlayerAnimation(scene: Scene) {
    Loader.createCharacterAnimation(scene, 'player');
    scene.anims.create({
      key: `player_attack`,
      frames: scene.anims.generateFrameNames('player', {
        prefix: 'Slashing/',
        suffix: '.png',
        start: 0,
        end: 11,
        zeroPad: 3,
      }),
      frameRate: 30,
      repeat: 0,
    });
    scene.anims.create({
      key: 'player_idle',
      frames: scene.anims.generateFrameNames('player', {
        prefix: 'Idle/',
        suffix: '.png',
        start: 0,
        end: 17,
        zeroPad: 3,
      }),
      frameRate: 30,
      repeat: -1,
    });
  }
}
