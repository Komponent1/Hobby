import {MoveDirection} from './game.object.enum';
import {Charactor} from './game.objects.charator';

export class Player extends Charactor {
  constructor(
    sprite: Phaser.GameObjects.Sprite,
    name: string,
    hp: number,
    attack: number,
    private _speed: number,
  ) {
    super(sprite, name, hp, attack);
  }

  moveX(dir: MoveDirection.LEFT | MoveDirection.RIGHT) {
    this._sprite.x += this._speed * dir;
  }
  moveY(dir: MoveDirection.UP | MoveDirection.DOWN) {
    this._sprite.y += this._speed * dir;
  }

  static create(scene: Phaser.Scene, x: number, y: number) {
    const idle = {
      key: 'idle',
      frames: scene.anims.generateFrameNumbers('charator', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1,
    };

    scene.anims.create(idle);
    const player = scene.add.sprite(x, y, 'charator').play('idle');

    return new Player(player, 'player', 100, 10, 2);
  }
}
