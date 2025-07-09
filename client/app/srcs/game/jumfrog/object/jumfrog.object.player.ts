import { JUMP_DOWN_FRAME, JUMP_TOP_FRAME, JUMP_UP_FRAME } from '../jumfrog.constant';

export enum CharacterState {
  IDLE = 'idle',
  WALK = 'walk',
  READY_JUMP = 'ready_jump',
  JUMP = 'jump',
}
export class Player extends Phaser.Physics.Arcade.Sprite {
  private _cursor: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  private _jumpPower: number = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');
    this.setScale(3);
  }
  changeState(state: CharacterState) {
    if (this.state === state) return;
    switch (state) {
      case CharacterState.IDLE:
        if (this.state === CharacterState.READY_JUMP) return;
        this._jumpPower = 0;
        this.play('idle');
        break;
      case CharacterState.WALK:
        this.play('walk');
        break;
      case CharacterState.READY_JUMP:
        if (this.state === CharacterState.READY_JUMP) return;
        this.play('ready_jump');
        break;
      case CharacterState.JUMP:
        break;
      default:
        break;
    }
    this.setState(state);
  }
  jump() {
    if (!this._cursor) return;
    if (this.state === CharacterState.JUMP) return;
    if (this._cursor.space.isDown) {
      this.changeState(CharacterState.READY_JUMP);
      if (this._jumpPower < 700) {
        this._jumpPower += 10;
      }
    } else if (this._cursor.space.isUp) {
      if (this.state !== CharacterState.READY_JUMP) return;
      if (this.flipX) {
        this.setVelocity(-200, -this._jumpPower);
      } else {
        this.setVelocity(200, -this._jumpPower);
      }
    }
  }
  move() {
    if (!this._cursor) return;
    if (this.state === CharacterState.JUMP
      || this.state === CharacterState.READY_JUMP) return;
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
        this.changeState(CharacterState.IDLE);
      } else if (this.body.velocity.x !== 0 && this.body.velocity.y === 0) {
        this.changeState(CharacterState.WALK);
      }
    } else if (this.body.velocity.y < -5) {
      this.changeState(CharacterState.JUMP);
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
    player.changeState(CharacterState.IDLE);

    player._cursor = scene.input.keyboard?.createCursorKeys();
    player.play('idle');
    return player;
  }
}
