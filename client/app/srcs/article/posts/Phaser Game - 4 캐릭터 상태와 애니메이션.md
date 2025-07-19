# Phaser Game - 4 캐릭터 상태와 애니메이션

이번엔 저번에 만든 캐릭터에 애니메이션을 추가할 것이다. 기본 상태(idle)의 애니메이션과 좌우 이동(walk) 시의 애니메이션을 추가해보자.

### 애니메이션 생성 및 플레이

먼저 로드한 sprite를 통해 애니메이션을 생성한다. loader.ts에 작성해보자.

로드한 sprite는 로드 시 정의한 크기(frameWidth, frameHeight)를 기반으로 이미지를 나눠 번호(0 ~ )로 저장해둔다. 이를 이미지로 그릴 수 도 있다.(`this.add.image(x, y, 'key', frameNumber)`)

우리가 사용하는 이미지는 0 ~ 7 까지가 기본상태(idle) 프레임이고 9 ~ 15까지가 이동(walk) 프레임이다.

애니메이션은 Phaser의 `anims` 를 통해 생성할 수 있다. 우리는 sprite를 통해 구성할 것이므로 `generateFrameNumbers`를 통해 생성한다. 사용할 키값과 frame 설정을 넣어 생성한다.

```typescript
export const IDLE_FRAME_START = 0;
export const IDLE_FRAME_END = 7;
export const WALK_FRAME_START = 9;
export const WALK_FRAME_END = 15;

export class Loader {
  static createPlayerAnimation(scene: Phaser.Scene) {
    scene.anims.create({
      key: "idle",
      /** 사용할 스프라이트 키, 시작 프레임, 종료 프레임을 넣는다. */
      frames: scene.anims.generateFrameNumbers("player", {
        start: IDLE_FRAME_START,
        end: IDLE_FRAME_END,
      }),
      /** 애니메이션이 재성될 총 프레임 수 이다. */
      frameRate: 10,
      /** -1은 무한 반복 */
      repeat: -1,
    });
    scene.anims.create({
      key: "walk",
      frames: scene.anims.generateFrameNumbers("player", {
        start: WALK_FRAME_START,
        end: WALK_FRAME_END,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}

class Stage extends Phaser.Scene {
  create() {
    Loader.createPlayerAnimation(this);
  }
}
```

이제 설정한 키 값인 `idle`, `walk` 를 통해 애니메이션을 재생할 수 있다. 이미 작성해둔 player가 가만히 있을 때 애니메이션을 생성 시 재생하도록 한다.

```typescript
export class Player extends Phaser.Physics.Arcade.Sprite {
  static create(scene: Phaser.Scene, x: number, y: number): Player {
    ...
    player.play('idle');
    return player;
  }
}
```

### 캐릭터의 상태

이제 움직이는 `walk` 애니메이션을 적용할 차례이다. 캐릭터가 움직이기 시작할 때 애니메이션의 상태를 전환해야 하므로 `play`는 단 한번만 동작하게끔 처리해야한다.

예를 들어 `left.isDown`의 조건에 애니메이션을 `play` 하면 update마다 애니메이션을 시작하므로 문제가 생긴다.

이를 캐릭터의 상태 변경을 통해 구현할 것이다.

캐릭터의 상태(state)는 현재 캐릭터가 하고 있는 동작의 상태를 의미하고 해당 상태로 변경될 때 애니메이션을 동작하게하면 위와 같은 문제가 발생하지 않는다.

Phaser의 object는 내부적으로 이미 아무 값이 할당되지 않은 state를 멤버변수로 가지고 있으므로 이를 활용하자.

캐릭터의 상태는 현재 `IDLE` 과 `WALK`만 생성한다. 관리 용이를 위해 `enum`으로 생성하자.

캐릭터의 상태는 이전과 같은 상태라면 변경되지 않도록 한다.

```typescript
enum CharacterState {
  IDLE = 'idle',
  WALK = 'walk',
};

export class Player extends Phaser.Physics.Arcade.Sprite {
  changeState(state: CharacterState) {
    if (this.state === state) return;
    switch (state) {
      case CharacterState.IDLE:
        this.play('idle');
        break;
      case CharacterState.WALK:
        this.play('walk');
        break;
      default:
        break;
    }
    this.setState(state);
  }
}
```

이제 어떤 상황에 해당 상태로 변경되는지만 처리하면 된다. 캐릭터가 속도를 가지고 있다면 이동, 아니라면 정지로 처리할 것이다. `setVelocity`로 설정한 캐릭터의 속도는 `body` 객체에 등록된다.

```typescript
export class Player extends Phaser.Physics.Arcade.Sprite {
  ...
  update() {
    if (this.body.velocity.x === 0) {
      this.changeState(CharacterState.IDLE);
    } else if (this.body.velocity.x !== 0) {
      this.changeState(CharacterState.WALK);
    }
  }
}
```

이제 좌측/우측 키보드를 눌러 이동할 때 걷는 애니메이션이 재생될 것이다.
