import { Scene } from 'phaser';
import {Player} from '../object/game.object.player';
import {Monster} from '../object/game.object.monster';
import {Vector} from '../utils/vector';
import {Keyboard} from '../control/keyboard';
import {
  PLAYER_HEIGHT, PLAYER_MARGIN, PLAYER_SPACING, PLAYER_WIDTH,
} from '../constant/game.constant.player';
import {
  MONSTER_HEIGHT, MONSTER_MARGIN, MONSTER_SPACING, MONSTER_WIDTH,
} from '../constant/game.constant.monster';

/** https://bdragon1727.itch.io/pixel-character-part-5 */

export class Stage extends Scene {
  constructor() {
    super('Stage');
  }

  public player!: Player;
  public monster1s: Monster[] = [];
  public monster2s: Monster[] = [];
  public keyboard = new Keyboard();

  public genTime = 0;
  public shootTime = 0;

  preload() {
    this.load.image('tile_38', 'assets/tiles/FieldTile_38png');
    this.load.spritesheet('player', 'assets/charator/player.png', {
      frameWidth: PLAYER_WIDTH,
      frameHeight: PLAYER_HEIGHT,
      margin: PLAYER_MARGIN,
      spacing: PLAYER_SPACING,
    });
    this.load.spritesheet('monster1', 'assets/charator/monster1.png', {
      frameWidth: MONSTER_WIDTH,
      frameHeight: MONSTER_HEIGHT,
      margin: MONSTER_MARGIN,
      spacing: MONSTER_SPACING,
    });
    this.load.spritesheet('monster2', 'assets/charator/monster2.png', {
      frameWidth: MONSTER_WIDTH,
      frameHeight: MONSTER_HEIGHT,
      margin: MONSTER_MARGIN,
      spacing: MONSTER_SPACING,
    });
  }

  create() {
    this.cameras.main.setBounds(0, 0, 1920 * 1.5, 1080 * 1.5);
    this.physics.world.setBounds(0, 0, 1920 * 1.5, 1080 * 1.5);

    this.keyboard.init(this);
    this.player = Player.create(this, 100, 100);
    for (let i = 0; i < 100; i += 1) {
      this.monster1s.push(Monster.create(this, -100, -100));
    }

    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.followOffset.set(0, 0);

    this.monster1s.forEach((monster) => {
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
      this.monster1s.find((monster) => monster.status === 'DEAD')?.spawn(x, y);
    }

    this.keyboard.setControl(this);

    if (Date.now() - this.shootTime > 2000) {
      this.shootTime = Date.now();
      this.player.shootAttack(this.monster1s.find((monster) => monster.status === 'ALIVE') as Monster);
    }

    this.player.bullets.forEach((bullet) => {
      bullet.move();
    });

    this.monster1s.forEach((monster) => {
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
