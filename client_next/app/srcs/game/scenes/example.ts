import { Scene } from 'phaser';

export class Example extends Scene {
  constructor() {
    super('example');
  }

  create() {
    this.add.rectangle(400, 300, 100, 100, 0x6666ff);
  }
}
