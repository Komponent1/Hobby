import {Vector} from 'matter';
import {Charactor} from './game.objects.charator';

export class Monster extends Charactor {
  constructor(
    sprite: Phaser.GameObjects.Sprite,
    name: string,
    hp: number,
    attack: number,
    private _speed: number,
  ) {
    super(sprite, name, hp, attack);
  }

  move(dir: Vector) {
    this._sprite.x += dir.x * this._speed;
    this._sprite.y += dir.y * this._speed;
  }

  static create(scene: Phaser.Scene, x: number, y: number) {
    const idle = {
      key: 'idle',
      frames: scene.anims.generateFrameNumbers('monster', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1,
    };

    scene.anims.create(idle);
    const monster = scene.add.sprite(x, y, 'monster').play('idle');

    return new Monster(monster, 'monster', 100, 10, 1);
  }
}
