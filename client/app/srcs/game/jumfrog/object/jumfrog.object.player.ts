/* eslint-disable max-len */
import { JUMP_DOWN_FRAME, JUMP_TOP_FRAME, JUMP_UP_FRAME } from '../jumfrog.constant';
import type { Stage } from '../scene/jumfrog.scene.stage';

export enum CharacterState {
  IDLE = 'idle',
  WALK = 'walk',
  READY_JUMP = 'ready_jump',
  JUMP = 'jump',
}
export enum GroundType {
  NORMAL = 'normal',
  ICE = 'ice',
}
export const FRCITION = 0.99;
export class Player extends Phaser.Physics.Arcade.Sprite {
  private _cursor: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  private _jumpPower: number = 0;
  private _groundType: GroundType = GroundType.NORMAL;
  setGroundType(type: GroundType) {
    this._groundType = type;
  }

  constructor(scene: Stage, x: number, y: number) {
    super(scene, x, y, 'player');
    scene.objLayer.add(this);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.world.enable(this);
    this.setCollideWorldBounds(true);
    this.body?.setSize(20, 20);
    this.setScale(1.5);
    this.setBounceX(0.2);
    this._cursor = scene.input.keyboard?.createCursorKeys();
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
  jump(scene: Stage) {
    if (!this._cursor) return;
    if (this.state === CharacterState.JUMP) return;
    if (this.body?.velocity.y !== 0) return;
    if (this._cursor.space.isDown) {
      this.changeState(CharacterState.READY_JUMP);
      if (this._groundType === GroundType.ICE) {
        this.setAccelerationX(0);
        this.setVelocityX(
          (this.body as Phaser.Physics.Arcade.Body).velocity.x * FRCITION,
        );
      } else {
        this.setVelocityX(0);
      }
      if (this._jumpPower < 700) {
        this._jumpPower += 7;
      }
    } else if (this._cursor.space.isUp) {
      if (this.state !== CharacterState.READY_JUMP) return;
      this.changeState(CharacterState.JUMP);
      scene.sound.play('jump');
      if (this.flipX) {
        if (this._groundType === GroundType.ICE) {
          this.setVelocity(
            (this.body as Phaser.Physics.Arcade.Body).velocity.x - 200 < -200 ? -200 : (this.body as Phaser.Physics.Arcade.Body).velocity.x - 200,
            -this._jumpPower,
          );
        } else {
          this.setVelocity(-200, -this._jumpPower);
        }
      } else if (this._groundType === GroundType.ICE) {
        this.setVelocity(
          (this.body as Phaser.Physics.Arcade.Body).velocity.x + 200 > 0 ? 200 : (this.body as Phaser.Physics.Arcade.Body).velocity.x + 200,
          -this._jumpPower,
        );
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
      this.changeState(CharacterState.WALK);
      if (this._groundType === GroundType.ICE) {
        this.setAccelerationX(-220);
        if ((this.body as Phaser.Physics.Arcade.Body).velocity.x < -200) {
          this.setVelocityX(-200);
        }
      } else {
        this.setVelocityX(-200);
      }
      this.flipX = true;
    } else if (this._cursor.right.isDown) {
      this.changeState(CharacterState.WALK);
      if (this._groundType === GroundType.ICE) {
        this.setAccelerationX(220);
        if ((this.body as Phaser.Physics.Arcade.Body).velocity.x > 200) {
          this.setVelocityX(200);
        }
      } else {
        this.setVelocityX(200);
      }
      this.flipX = false;
    } else if ((this.body as Phaser.Physics.Arcade.Body).onFloor()) {
      this.changeState(CharacterState.IDLE);
      this.setAccelerationX(0);
      if (this._groundType === GroundType.ICE) {
        this.setVelocityX(
          (this.body as Phaser.Physics.Arcade.Body).velocity.x * FRCITION,
        );
      } else {
        this.setVelocityX(0); // 일반 발판 위에서는 멈춤
      }
    }
  }

  update(scene: Stage) {
    if (!this.body) return;
    this.jump(scene);
    this.move();

    if (this.state === CharacterState.JUMP) {
      if (this.body.velocity.y < -5) {
        this.setFrame(JUMP_UP_FRAME);
      } else if (this.body?.velocity.y >= -5 && this.body?.velocity.y <= 5) {
        this.setFrame(JUMP_TOP_FRAME);
        if ((this.body as Phaser.Physics.Arcade.Body).onFloor()) {
          this.changeState(CharacterState.IDLE);
        }
      } else {
        this.setFrame(JUMP_DOWN_FRAME);
      }
    }
  }

  static create(scene: Stage, x: number, y: number): Player {
    const player = new Player(scene, x, y);
    player.changeState(CharacterState.IDLE);
    player.play('idle');

    return player;
  }
}
