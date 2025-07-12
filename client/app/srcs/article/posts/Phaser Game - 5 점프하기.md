# Phaser Game - 5 점프하기

이번엔 개구리를 점프시킬 것이다. 점프의 상태를 다음처럼 정의하자

1. 스페이스바를 눌러 힘을 모으고 손을 떼면 점프한다. 스페이스를 누른 정도에 따라 점프 높이가 달라진다.(max 높이가 있다)

2. 점프는 점프 전 바라보는 방향으로 점프한다.

3. 점프 준비, 점프 중에는 이동할 수 없다.

4. 점프로 올라갈때 내려갈 때 포즈가 정해져있다.

### 점프와 상태

먼저 점프 준비 상태, 점프 상태를 추가하자. 두 상태에선 다른 상태로 변경될 수 없으므로 해당 처리를 포함한다.

점프 준비는 애니메이션을 이용할 것이고 점프는 상태에 따른 이미지를 사용할 예정이므로 준비 애니메이션을 추가한다.

```typescript
export class Loader {
  static createFrogAnimation(scene: Phaser.Scene) {
    scene.anims.create({
      key: "ready_jump",
      frames: scene.anims.generateFrameNumbers("player", {
        start: READY_JUMP_FRAME_START /** (=9) */,
        end: READY_JUMP_FRAME_END /** (=11) */,
      }),
      frameRate: 10,
      repeat: 0,
    });
  }
}

export enum CharacterState {
  IDLE = 'idle',
  WALK = 'walk',
  READY_JUMP = 'ready_jump',
  JUMP = 'jump',
}

export class Player extends Phaser.Physics.Arcade.Sprite {
  chageState() {
    if (this.state === state) return;
    switch (state) {
      case CharacterState.IDLE:
        /** 점프 준비 중에는 다른 상태로 변경될 수 없다 */
        if (this.state === CharacterState.READY_JUMP) return;
        this._jumpPower = 0;
        this.play('idle');
        break;
      case CharacterState.WALK:
        this.play('walk');
        break;
      case CharacterState.READY_JUMP:
        /** 애니메이션 중복 방지 용 */
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
}
```

이제 점프를 만들자. 스페이스바를 누르고 있는 동안은 점프 준비를 하고 놓을 때 점프를 하도록 할 것이므로 `space.isDown / space.isUp`을 활용할 것이다.

점프력은 스페이스바를 누르는 동안 한계치(700)까지 계속 높아질 것이며 놓는 순간 해당 속도로 위를 향해 점프한다.

바라보는 방향(`flipx`)에 따라 해당 방향의 속도를 더한다. 또한 점프 중에 또 점프하지 않도록 상태에 따라 제어한다.

또한 점프 상태에서 이동을 불가하도록 해야하므로 `move()` 또한 수정해준다.

```typescript
export class Player extends Phaser.Physics.Arcade.Sprite {
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
    ...
  }

  update() {
    ...
    this.jump();
    ...
  }
}
```

### 점프 상황에 따른 이미지 변경

지금까지는 상태에 따른 애니메이션을 재생하는 것으로 캐릭터의 이미지를 변경했지만 이번엔 점프가 진행되는 동안의 캐릭터의 속도에 따라 이미지가 변하도록 할 것이다.

올라가는 동안은 sprite의 12번 이미지로, 정점에선 13번, 내려가는 동안은 14번 이미지로 변경되게끔 처리할 것이다.

또한 `move()` 작성 시 x축 속도로만 상태를 변경하던 코드에 y축 속도를 통한 판별하도록 변경한다.

지상에 있는 경우(`onFloor()`) x와 y의 속도가 0이면 기본(`idle`), y속도가 0, x의 속도가 존재하면 이동(`walk`)이다.

공중에 있는 경우 y속도가 -5보다 작다면(위 방향의 속도는 **-**이다) 캐릭터의 상태를 점프(`jump`)로 변경하고 프레임을 12번으로 변경한다.

y속도가 `-5 < y < 5`라면 정점이라 판단하고 13번 프레임으로 변경한다. 이후 5보다 크다면 14번프레임으로 변경되게 처리한다.

```typescript
export class Player extends Phaser.Physics.Arcade.Sprite {
  update() {
    ...
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
}
```

이제 스페이스 바를 누르면 캐릭터가 점프할 것이다.
