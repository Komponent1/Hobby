import { Scene } from 'phaser';
import {Player} from '../objects/game.objects.player';
import {Monster} from '../objects/game.object.monster';
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
    this.monsters.push(Monster.create(this, 200, 200));

    this.monsters.forEach((monster) => {
      this.physics.add.overlap(this.player.sprite, monster.sprite, () => {
        this.player.bodyAttack(monster);
        monster.attackTo(this.player);
      });
    });
  }

  update(): void {
    this.keyboard.setControl(this);

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
