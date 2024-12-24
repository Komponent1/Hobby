import {Charactor} from './game.objects.charator';
import type {Main} from '../scenes/game.scene.main';
import {MONSTER_SPEED} from '../constant/game.constant.monster';
import {Vector} from '../utils/vector';

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

  move(dir: Vector, speed: number = this._speed) {
    this._sprite.x += dir.x * speed;
    this._sprite.y += dir.y * speed;
  }

  checkHp() {
    if (this.hp <= 0) {
      this.sprite.destroy();
    }
  }

  attackTo(target: Charactor): boolean {
    if (!super.attackTo(target)) {
      return false;
    }
    const dir = new Vector(
      this.position.x - target.position.x,
      this.position.y - target.position.y,
    ).normalize();
    this.move(dir, this.sprite.width);
    return true;
  }

  static create(scene: Main, x: number, y: number) {
    const idle = {
      key: 'idle',
      frames: scene.anims.generateFrameNumbers('monster', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1,
    };

    scene.anims.create(idle);
    const sprite = scene.physics.add.sprite(x, y, 'monster').play('idle');

    const monster = new Monster(sprite, 'monster', 100, 10, MONSTER_SPEED);

    return monster;
  }
}
