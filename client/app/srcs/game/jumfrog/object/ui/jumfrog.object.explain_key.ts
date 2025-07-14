import { SCREEN_HEIGHT, X } from '../../config/jumfrog.map.config';
import type { Stage } from '../../scene/jumfrog.scene.stage';

export const KEY_SCALE = 3;
export const ARROW_KEY_WIDTH = 16 * KEY_SCALE;
export const SPACE_KEY_WIDTH = 32 * KEY_SCALE;
export const KEY_HEIGHT = 16 * KEY_SCALE;
export const KEY_MARGIN = 4;

export class ExplainKey extends Phaser.GameObjects.Container {
  private _cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  private _spacebar!: Phaser.GameObjects.Sprite;
  private _left!: Phaser.GameObjects.Sprite;
  private _right!: Phaser.GameObjects.Sprite;

  constructor(scene: Stage) {
    super(scene, X - 200, SCREEN_HEIGHT - 300);
    this._cursorKeys = scene.input.keyboard?.createCursorKeys();

    this._left = scene.add.sprite(0, 0, 'keyboard', 2).setOrigin(0, 0).setScale(KEY_SCALE);
    this._right = scene.add.sprite(ARROW_KEY_WIDTH + KEY_MARGIN, 0, 'keyboard', 3).setOrigin(0, 0).setScale(KEY_SCALE);
    this._spacebar = scene.add.sprite(0, KEY_HEIGHT + KEY_MARGIN, 'keyboard_extra', 10).setOrigin(0, 0).setScale(KEY_SCALE);
    this.add([this._left, this._right, this._spacebar]);
    scene.uiLayer.add(this);
    scene.add.existing(this);
  }

  static create(scene: Stage) {
    return new ExplainKey(scene);
  }

  update() {
    if (this._cursorKeys?.space?.isDown) {
      this._spacebar.setFrame(26);
    } else {
      this._spacebar.setFrame(10);
    }

    if (this._cursorKeys?.left?.isDown) {
      this._left.setFrame(58);
    } else {
      this._left.setFrame(2);
    }
    if (this._cursorKeys?.right?.isDown) {
      this._right.setFrame(59);
    } else {
      this._right.setFrame(3);
    }
  }
}
