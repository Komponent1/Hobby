import { JUMP_DOWN_FRAME, JUMP_TOP_FRAME, JUMP_UP_FRAME } from '../jumfrog.constant';

export enum CharacterStatus {
  IDLE = 'idle',
  WALK = 'walk',
  READY_JUMP = 'ready_jump',
  JUMP = 'jump',
}
export class Player extends Phaser.Physics.Arcade.Sprite {
  private _cursor: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  private _status: CharacterStatus = CharacterStatus.IDLE;
  private _jumpPower: number = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    this.body as Phaser.Physics.Arcade.Body;
    this.setScale(3);
  }
  changeStatus(status: CharacterStatus) {
    if (this._status === status) return;
    switch (status) {
      case CharacterStatus.IDLE:
        if (this._status === CharacterStatus.READY_JUMP) return;
        this._jumpPower = 0;
        this.play('idle');
        break;
      case CharacterStatus.WALK:
        this.play('walk');
        if (this._status === CharacterStatus.WALK) return;
        break;
      case CharacterStatus.READY_JUMP:
        if (this._status === CharacterStatus.READY_JUMP) return;
        this.play('ready_jump');
        break;
      case CharacterStatus.JUMP:
        break;
      default:
        break;
    }
    this._status = status;
  }
  jump() {
    if (!this._cursor) return;
    if (this._status === CharacterStatus.JUMP) return;
    if (this._cursor.space.isDown) {
      this.changeStatus(CharacterStatus.READY_JUMP);
      if (this._jumpPower < 700) {
        this._jumpPower += 10;
      }
    } else if (this._cursor.space.isUp) {
      if (this._status !== CharacterStatus.READY_JUMP) return;
      if (this.flipX) {
        this.setVelocity(-200, -this._jumpPower);
      } else {
        this.setVelocity(200, -this._jumpPower);
      }
    }
  }
  move() {
    if (!this._cursor) return;
    if (this._status === CharacterStatus.JUMP
      || this._status === CharacterStatus.READY_JUMP) return;
    if (this._cursor.left.isDown) {
      this.setVelocityX(-200);
      this.flipX = true;
    } else if (this._cursor.right.isDown) {
      this.setVelocityX(200);
      this.flipX = false;
    } else {
      this.setVelocityX(0);
    }
  }

  update() {
    if (!this.body) return;
    this.jump();
    this.move();

    if ((this.body as Phaser.Physics.Arcade.Body).onFloor()) {
      if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
        this.changeStatus(CharacterStatus.IDLE);
      } else if (this.body.velocity.x !== 0 && this.body.velocity.y === 0) {
        this.changeStatus(CharacterStatus.WALK);
      }
    } else if (this.body.velocity.y < -5) {
      this.changeStatus(CharacterStatus.JUMP);
      this.setFrame(JUMP_UP_FRAME);
    } else if (this.body?.velocity.y >= -5 && this.body?.velocity.y <= 5) {
      this.setFrame(JUMP_TOP_FRAME);
    } else {
      this.setFrame(JUMP_DOWN_FRAME);
    }
  }

  static create(scene: Phaser.Scene, x: number, y: number): Player {
    const player = new Player(scene, x, y);
    scene.add.existing(player);
    scene.physics.add.existing(player);
    scene.physics.world.enable(player);
    player.setScale(3);
    player.setCollideWorldBounds(true);
    player.changeStatus(CharacterStatus.IDLE);

    player._cursor = scene.input.keyboard?.createCursorKeys();
    player.play('idle');
    return player;
  }
}
