import { Scene } from 'phaser';
import {Player} from '../object/game.object.player';
import {Monster} from '../object/game.object.monster';
import {Vector} from '../utils/vector';
import {Keyboard} from '../control/keyboard';

/** https://bdragon1727.itch.io/pixel-character-part-5 */

export class Main extends Scene {
  constructor() {
    super('Main');
  }

  public player!: Player;
  public monsters: Monster[] = [];
  public keyboard = new Keyboard();

  public genTime = 0;
  public shootTime = 0;

  preload() {
    this.load.image('tile_38', 'assets/tiles/FieldTile_38png');
    this.load.spritesheet('player', 'assets/charator/player.png', {
      frameWidth: 32, frameHeight: 32, margin: 16, spacing: 32,
    });
    this.load.spritesheet('monster1', 'assets/charator/monster1.png', {
      frameWidth: 32, frameHeight: 32, margin: 16, spacing: 32,
    });
    this.load.spritesheet('monster2', 'assets/charator/monster2.png', {
      frameWidth: 32, frameHeight: 32, margin: 16, spacing: 32,
    });
  }

  create() {
    this.keyboard.init(this);
    this.player = Player.create(this, 100, 100);
    for (let i = 0; i < 100; i += 1) {
      this.monsters.push(Monster.create(this, -100, -100));
    }

    this.monsters.forEach((monster) => {
      this.physics.add.overlap(this.player.sprite, monster.sprite, () => {
        this.player.bodyAttack(monster);
        monster.attackTo(this.player);
      });
      this.player.bullets.forEach((bullet) => {
        this.physics.add.overlap(bullet.sprite, monster.sprite, () => {
          bullet.attackTo(monster);
          bullet.destroy();
        });
      });
    });
  }

  update(): void {
    if (Date.now() - this.genTime > 2000) {
      this.genTime = Date.now();
      const x = Math.random() * 800;
      const y = Math.random() * 600;
      this.monsters.find((monster) => monster.status === 'DEAD')?.spawn(x, y);
    }

    this.keyboard.setControl(this);

    if (Date.now() - this.shootTime > 2000) {
      this.shootTime = Date.now();
      this.player.shootAttack(this.monsters.find((monster) => monster.status === 'ALIVE') as Monster);
    }

    this.player.bullets.forEach((bullet) => {
      bullet.move();
    });

    this.monsters.forEach((monster) => {
      const dir = new Vector(
        this.player.position.x - monster.position.x,
        this.player.position.y - monster.position.y,
      ).normalize();
      monster.move(dir);

      monster.checkHp();
    });
    this.player.checkHp();
  }
}
