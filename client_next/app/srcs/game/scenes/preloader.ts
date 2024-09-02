import { Scene } from 'phaser';

export class Preloader extends Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image('background', 'assets/bg.png');
    this.load.image('player', 'assets/charactor.png');
  }

  create() {
    this.add.image(400, 300, 'background').setOrigin(0, 0);
  }
}
