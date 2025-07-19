# Phaser Game - 1 기초

**Phaser**는 `canvas` 기반의 게임 개발 프레임워크이다. 해당 글에서는 phaser를 이용해 간단한 게임을 구성하는 과정에서 얻은 정보, 발생했던 이슈, 문제에 대해 이야기 해 볼 것이다.

이번장은 phaser의 구성, next와의 연결 등 기초적인 부분을 짚고 넘어갈 것이다.

### Phaser의 기본 구조

Phaser를 활용하기 전 phaser의 기본 구성을 살펴보자.

Phaser는 다른 게임 기반 프레임워크처럼 **Scene** 기반으로 각 화면을 구성한다. 아마 unity 등의 다른 프레임워크를 다뤄봤다면 익숙한 개념일 것이다.

`Scene`은 `preload`, `create`, `update` 라는 큰 틀에서 순서대로 동작한다.

> **preload**
>
> preload는 Scene을 구성하기 전 필요한 resouce를 불러와 메모리에 저장한다. 이후 이 리소스는 등록한 **key**를 통해 호출하여 화면에 그릴 수 있다.

> **create**
>
> Scene을 생성한다. 생성한다는 것은 화면을 처음으로 그리는 과정이다. 이 과정에서 각 데이터의 초기화 및 화면을 랜더링한다.

> **update**
>
> Scene이 생성된 후 설정된 프레임마다 호출된다. 호출마다 변경사항을 새로이 화면에 그린다.


### Phaser with next

Phaser로 개발한 게임을 Next로 개발된 개인 사이트에 추가 하고자 하였다. Next는 SSR기반이므로 서버에서 화면을 미리 그리는 동작이 기본이지만 Phaser는 canvas 기반이고 canvas는 브라우저에서 그려지므로 미리 랜더링 할 수 없다.

따라서 Next에서 SSR이 아닌 SPA와 같이 js와 껍데기(HTML)만을 넘겨서 클라이언트 사이드에서 랜더링 하도록 처리해야한다.

이에 대하여 `next/dynamic`에 의한 지연 로딩의 옵션을 활용할 수 있다. `next/dynamic`은 react의 `lazy` 와 같이 컴포넌트를 원하는 시점에 지연로딩 할 수 있도록 돕는 기능이다. 예를 들어 아래와 같이 특정 컴포넌트를 조건부에 맞춰 그릴 수 있다.

```tsx
import React, {useState} from 'react';
import dynamic from 'next/dynamic';

const Child = dynamic(() => import('./Child.tsx'));

const Comp = () => {
  const [flag, setFlag] = useState<boolean>(false);

  return (
    <div>
      {flag && <Child />}
    </div>
  );
}
```

위와 같이 flag가 true인 시점에서만 해당 컴포넌트를 불러올 수 있으며 번들링 대상에서 해당 부분은 별도의 청크(chunk)로 분리되어 호출 시점에 서버에서 불러와진다. 즉 초기 로드를 줄여 성능을 최적화 하는 용도로 주 사용된다.

이에 더해 `next/dynamic`은 `ssr` 옵션을 통해 import되는 컴포넌트가 클라이언트 사이드에서 불러와지도록 요청할 수 있다. 

```tsx
/**
 * pages/game/index.ts 참조
 */
import React from 'react';
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(
  () => import('../../srcs/game/game.page'),
  { ssr: false }, /** 좌 옵션 설정 시 클라이언트 사이드에서 해당 모듈을 불러온다 */
);

const GamePage: React.FC = () => (
  <div id="game">
    {/** 이하 phaser를 포함한 클라이언트 사이드에서 불러올 대상 */}
    <DynamicComponent />
  </div>
);

export default GamePage;
```

### GameConfig와 Container

앞서 DynamicComponent로 불러올 페이지는 phaser 객체를 불러와 화면에 그리도록 해야한다. 이룰 정의하는 config를 설정해야하고 이는 아래와 같이 설정한다.

**GameContainer.ts(page에 붙일 껍데기)**
```typescript
const GameContainer = forwardRef<RefPhaserGame, {}>((_, ref) => {
  const game = useRef<Phaser.Game | null>(null);

  useLayoutEffect(() => {
    if (game.current === null) {
      game.current = new Phaser.Game(gameConfig);
    }

    return () => {
      game.current?.destroy(true);
      if (game.current !== null) {
        game.current = null;
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (typeof ref === 'function') {
      ref({ game: game.current, scene: null });
    } else if (ref) {
      ref.current = { game: game.current, scene: null };
    }
  }, [ref]);

  return (
    <div id="game-container" />
  );
});

GameContainer.displayName = 'Game';
```

**GameConfig(Phaser 설정파일) 예시**
```typescript
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
    Stage, /** Phaser로 생성한 Scene */
  ],
};

```

### Phaser with React

해당 작업에 포함되지 않았지만 Phaser와 React상의 이벤트를 전달할 필요가 있을 수 있다(외부 버튼이 요구되는 경우 등)

이는 친절히도 제공된 [템플릿](https://github.com/phaserjs/template-nextjs?tab=readme-ov-file#react-bridge)이 있으므로 이를 참고한다.

예시에서 확인할 수 있듯이 Phaser는 이를 위해 `Events` 를 제공한다.

```javascript
import { Events } from 'phaser';

export const EventBus = new Events.EventEmitter();

EventBus.on('이벤트 키' , () => {
  /** 발생된 이벤트에 따른 동작 */
})
EventBus.emit('이벤트 키'); /** 발생 시킬 이벤트 */

/**
 * 예시>
 * scene 생성 시 이벤트 발생 -> Component에서 해당 이벤트에 대한 처리 등록
 */
class Scene extends Phaser.Scene {
  create() {
    EventBus.emit('scene-create', this);
  }
}

const Comp = () => {
  useEffect(() => {
    EventBus.on('scene-create', (scene: Phaser.Scene) => {
      ...
    })
  }, []);
}
```

### Scene과 Object

Scene은 화면이다. Scene에 그려질 요소들이 요구될텐데 Phaser에선 이를 GameObject라 한다.(이하 Object)

게임에 구상한 Charactor Object를 하나 만들어보자. 기본적으로 아래의 방법을 거쳐 만든다고 생각하자.

1. Object를 구성할 이미지를 로드한다.(preload)
2. 화면에 해당 이미지를 그린다.(create)
3. 해당 오브젝트의 동작을 정의한다.(update)

```typescript
class Scene extends Phaser.Scene {
  constructor() {
    super('scene name key');
  }

  public object!: Phaser.GameObject.Image;

  preload() {
    this.load.image('image name key', 'path');
  }
  create() {
    this.object = this.add.image(posX, posY, 'image name key');
  }
  update() {
    /** object는 우측으로 지속 이동한다 */
    object.x += 1;
  }
}
```

### physics

게임에서 Object의 충돌 등 Object간의 상호작용을 위한 연산을 추가해야한다. 게임엔진은 이를 위한 기능이 포함되어 있고 물리엔진은 그 중 하나이다.

간단히 두 Object가 겹치는지에 대한 여부를 체크하는 예시를 만들어보자.

Phaser에서는 기본적으로 2가지 물리엔진을 제공한다. Arcade, Matter 이 그것인데 간단히 말해서 후자가 더 세밀한 조정이 가능하다. 간단한 예시로 Arcade는 사각형, 원형 콜라이더(충돌 연산 객체)만 제공하는데 반해 Matter는 다양한 형태의 가능하다.

둘의 객체 용법이 약간 다르므로(둘의 namespace가 달라 호출방식이 다르다) Arcade 기준으로 간단한 예시를 적으면 아래와 같다.

```typescript
class Scene extends Phaser.Scene {
  constructor() {
    super('scene name key');
  }

  public obj1!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  public obj2!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

  preload() {
    this.load.image('obj1', 'path');
    this.load.image('obj2', 'path');
  }
  create() {
    /** 물리 객체 등록 */
    this.obj1 = this.physics.add.image(posX, posY, 'obj1');
    this.obj2 = this.physics.add.image(posX, posY, 'obj2');
    /** 혹은 아래와 같이 이미지 등록 후 물리 박스를 추가해도 된다
    *  const image = this.add.image(x, y, 'key');
    *  scene.physics.add.existing(image);
    */

    /** 두 object가 겹칠때 동작할 callback을 등록 */
    this.physics.add.overlap(this.obj1, this.obj2, () => {
      ...
    });
  }
}
```

이외 다양한 예시와 동작은 [phaser 공식 예저](https://phaser.io/examples/v3.85.0/physics)에서 쉽게 확인 할 수 있다.

### Input과 interactive

Phaser는 브라우저 및 기기에서 동작하는 입력 시스템을 받아 사용한다. 즉 모바일 터치, 게임 패드등에도 모두 대응된다는 의미이다. 이중 일부에 대응하기 위한 인터페이스또한 제공한다. 예를 들어 키보드의 화살표 입력은 아래와 같이 선언하여 이벤트를 처리할 수 있다.

```typescript
class Scene extends Phaser.Scene {
  public cursor!: Phaser.Types.Input.Keyboard.CursorKeys;

  create() {
    this.cursor = this.input.createCursorKeys();
  }

  update() {
    if (this.cursor.left.isDown) {
      ...
    }
  }
}
```

object는 액션에 대해 상호작용하기위한 선언을 할 수 있다. 선언된 object는 입력에 대한 이벤트를 등록할 수 있다. 아래는 버튼을 생성하는 예제이다.

```typescript
class Scene extends Phaser.Scene {
  public button!: Phaser.GameObject.Rectangle;

  preload() {
    this.load.image('key', 'path');
  }

  create() {
    this.button = this.add.image(x, y, 'key');
    /** 상호작용 객체로 선언 */
    this.button.setInteractive();
    this.button.on('pointerdown', () => {
      ...
    });
  }
}
```


이후 장에서는 해당 게임을 구성하면서 만든 객체의 구성에 대해 예시를 들 것이다.
