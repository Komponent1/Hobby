import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constant/survival-knight.constant.config';

export class ExplainKey {
  private _container: Phaser.GameObjects.Container;
  private _cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  get x() { return this._container.x; }
  get y() { return this._container.y; }

  private _player!: Phaser.GameObjects.Sprite;
  private _spacebar!: Phaser.GameObjects.Sprite;
  private _left!: Phaser.GameObjects.Sprite;
  private _right!: Phaser.GameObjects.Sprite;
  private _up!: Phaser.GameObjects.Sprite;
  private _down!: Phaser.GameObjects.Sprite;

  setPosition(x: number, y: number) {
    this._container.setPosition(x, y);
  }
  constructor(scene: Phaser.Scene, x: number, y: number) {
    this._cursorKeys = scene.input.keyboard?.createCursorKeys();
    this._container = scene.add.container(x, y);

    this._left = scene.add.sprite(-32, 0, 'keyboard', 2).setScale(3);
    this._right = scene.add.sprite(32, 0, 'keyboard', 3).setScale(3);
    this._up = scene.add.sprite(0, -32, 'keyboard', 0).setScale(3);
    this._down = scene.add.sprite(0, 32, 'keyboard', 1).setScale(3);
    this._spacebar = scene.add.sprite(100, 0, 'keyboard_extra', 10).setScale(3);
    this._player = scene.add.sprite(192, 0, 'player').play('player_walk');
    this._container.add([
      this._spacebar, this._left, this._right, this._up, this._down, this._player,
    ]);
  }

  static create(scene: Phaser.Scene) {
    return new ExplainKey(scene, SCREEN_WIDTH / 2 - 92, SCREEN_HEIGHT / 2 + 108);
  }

  update() {
    if (this._cursorKeys?.space?.isDown) {
      this._spacebar.setFrame(26);
      if ((this._player.anims.currentAnim as Phaser.Animations.Animation).key !== 'player_attack') {
        this._player.play('player_attack').once('animationcomplete', () => {
          this._player.play('player_walk');
        });
      }
    } else {
      this._spacebar.setFrame(10);
    }

    if (this._cursorKeys?.left?.isDown) {
      this._left.setFrame(58);
      this._player.setFlipX(true);
    } else {
      this._left.setFrame(2);
    }
    if (this._cursorKeys?.right?.isDown) {
      this._right.setFrame(59);
      this._player.setFlipX(false);
    } else {
      this._right.setFrame(3);
    }
    if (this._cursorKeys?.up?.isDown) {
      this._up.setFrame(56);
    } else {
      this._up.setFrame(0);
    }
    if (this._cursorKeys?.down?.isDown) {
      this._down.setFrame(57);
    } else {
      this._down.setFrame(1);
    }
  }
}
