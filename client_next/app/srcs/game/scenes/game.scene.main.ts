import { Scene } from 'phaser';
import {Player} from '../objects/game.objects.player';
import {Monster} from '../objects/game.object.monster';
import {MoveDirection} from '../objects/game.object.enum';
import {Vector} from '../utils/vector';

/** https://craftpix.net/freebies/free-fields-tileset-pixel-art-for-tower-defense/ */
/** https://craftpix.net/freebies/free-tiny-pixel-hero-sprites-with-bow-attacks/ */

export class Example extends Scene {
  constructor() {
    super('example');
  }

  private player: Player | undefined;
  private monsters: Monster[] = [];
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  preload() {
    this.load.image('tile_38', 'assets/tiles/FieldTile_38png');
    this.load.spritesheet('charator', 'assets/charator/Idle.png', {frameWidth: 42, frameHeight: 42});
    this.load.spritesheet('monster', 'assets/charator/Idle.png', {frameWidth: 42, frameHeight: 42});
  }

  create() {
    this.cursorKeys = this.input.keyboard?.createCursorKeys();
    this.player = Player.create(this, 100, 100);

    this.monsters.push(Monster.create(this, 200, 200));
  }

  update(): void {
    if (!this.player || !this.cursorKeys) return;

    if (this.cursorKeys.left?.isDown) {
      this.player.moveX(MoveDirection.LEFT);
    } else if (this.cursorKeys.right?.isDown) {
      this.player.moveX(MoveDirection.RIGHT);
    }

    if (this.cursorKeys.up?.isDown) {
      this.player.moveY(MoveDirection.UP);
    } else if (this.cursorKeys.down?.isDown) {
      this.player.moveY(MoveDirection.DOWN);
    }

    this.monsters.forEach((monster) => {
      if (!this.player) return;

      const dir = new Vector(
        this.player.position.x - monster.position.x,
        this.player.position.y - monster.position.y,
      ).normalize();
      monster.move(dir);
    });
  }
}
