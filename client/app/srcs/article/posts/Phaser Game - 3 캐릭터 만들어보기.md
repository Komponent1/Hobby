# Phaser Game - 3 화면과 캐릭터 만들어보기

이제 게임을 만들어보자. 만들 게임은 점프킹(jumpking)처럼 맵을 등반하는 게임을 간단하게 구성해볼것이다.

이번엔 화면에서 움직일 캐릭터를 만들것이다. 그럼 먼저 캐릭터가 가질 조작 요소를 간단히 정의해보자.

1. 캐릭터의 상태는 일반, 이동, 점프 준비, 점프 4가지 상황이 있고 각각에 맞는 동작이 있다.

2. 캐릭터는 바라보는 방향으로 점프하고, 키다운 시간에 따라 점프 높이가 달라진다.

3. 캐릭터가 공중에 있는 동안은 조작할 수 없다.

위 상황을 기반으로 캐릭터를 만들어볼것이다.

### 기본 설정

먼저 메인 Scene을 하나 만들기 위해 config와 scene을 하나씩 작성한다. 일단은 테스트를 위해 월드(캐릭터가 움직일 공간)를 간단히 설정하고 캐릭터를 그릴것이다.

GameConfig는 게임의 속성을 설정한다. 게임화면의 크기, 물리엔진 여부, 입력 방법등을 설정한다. 

게임의 크기는 1920 * 1080으로 설정하고 브라우저의 크기에 따라 가변적으로 변할 수 있도록 설정한다. (`scale 설정 참고`)

해당 게임은 간단한 물리법칙만 사용할 것이므로 arcade로 만들고 중력을 적용한다.(`physics 설정 참고`)

입력은 마우스/키보드를 허용한다. (`input 설정 참고`)

이외의 설정등은 [공식문서](https://docs.phaser.io/api-documentation/class/core-config)를 참고하자.

**GameConfig.ts**
```typescript
import Phaser from 'phaser';
import { Stage } from '../scene/jumfrog.scene.stage';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  parent: 'game-container',
  scale: {
    width: 1920,
    height: 1080,
    mode: Phaser.Scale.FIT,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { x: 0, y: 980 },
    },
  },
  input: {
    keyboard: true,
    mouse: true,
  },
  dom: {
    createContainer: true,
  },
  backgroundColor: '#ffffff',
  scene: [
    Stage,
  ],
};
```

 Stage(`Scene`)은 아래처럼 작성해둔다.

`this.physics.world.setBounds`는 1000 * 500 크기의 박스 안에서 캐릭터가 움직일 수 있도록 게임 월드 크기를 설정하는 코드이다. 테스트만 할 예정이미 임시로 설정해두자.

```typescript
export class Stage extends Phaser.Scene {
  preload() {}
  init() {}
  create() {
    /** 임시로 캐릭터를 그릴 월드 */
    this.physics.world.setBounds(0, 0, 1000, 500);
  }
  update() {}
}
```

### Sprite 로드 및 애니메이션 생성

작업에 사용할 이미지는 [itch에서 무료 개구리 스프라이트](https://eduardscarpato.itch.io/toxic-frog-animations-pixel-art-2d-free)를 하나 다운로드 받았다.

먼저 파일을 로드하기 위해 이미지를 public 경로에 위치시키고 load한다.

```typescript
/** loader.ts */
export class Loader {
  static loadPlayer(scene: Phaser.Scene) {
    scene.load.spritesheet("player", "/assets/jumfrog/player.png", {
      frameWidth: 48,
      frameHeight: 48,
    })
  }
}

export class Stage extends Phaser.Scene {
  preload() {
    Loader.loadPlayer(this);
  }
}
```

이제 개구리를 화면에 그릴 것이다. 앞으로의 관리 작업을 위해 Player class 하나 만들자. 해당 class는 `Phaser.Physics.Arcade.Sprite`를 상속받아 작성한다.

캐릭터가 설정한 월드의 물리영향을 받을 수 있도록 world에 캐릭터를 등록해야한다. (하단 `create` 참조)

```typescript
export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    /** staticBody 타입은 사용 안할 예정이므로 type을 강제한다 */
    this.body as Phaser.Physics.Arcade.Body;
  }

  static create(scene: Phaser.Scene, x: number, y: number): Player {
    const player = new Player(scene, x, y);
    
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.world.enable(player);
    player.setCollideWorldBounds(true);

    return player;
  }
}

export class Stage extends Phaser.Scene {
  public player!: Player;
  
  create() {
    this.player = Player.create(this, 500, 500);  
  }
}
```

여기까지 진행하면 캐릭터가 화면에 그려진다. 이제 캐릭터가 움직일 수 있도록 좌우 입력을 등록해보자.

키보드 입력이벤트는 `Phaser.Types.Input.Keyboard.CursorKeys`를 통해 등록할 수 있다. 좌측/우측 화살표를 누르고 있으면 좌/우로 이동하도록 아래와 같이 속도를 줄 수 있게(`setVelocityX`) 작성한다.

각 방향에 맞게 캐릭터의 방향을 돌리도록 `flipX` 설정하는것을 잊지말자.

작성된 코드는 Scene의 update에 등록한다.

```typescript
export class Player extends Phaser.Physics.Arcade.Sprite {
  private _cursor: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  move() {
    if (!this._cursor) return;
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
    this.move();
  }

  static create() {
    ...
    player._cursor = scene.input.keyboard?.createCursorKeys();
  }
}

export class Stage extends Phaser.Scene {
  update() {
    this.player.update();
  }
}
```

이제 좌축/우측 화살표를 누르면 캐릭터가 좌/우로 이동한다.
