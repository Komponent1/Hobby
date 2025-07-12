# Phaser Game - 6 발판 만들기

이번엔 발판을 만들고 캐릭터와의 충돌을 구현할 것이다.

발판은 공중에 떠 있으며 캐릭터는 발판을 밟고 계속 위로 올라갈 것이므로 발판은 중력의 영향을 받으면 안되며 캐릭터와 충돌해야한다.

### 블록 만들기

해당 발판에 사용한 이미지는 [무료 에셋](https://free-game-assets.itch.io/free-swamp-2d-tileset-pixel-art)에서 일부 이미지를 사용했다.

이미지 3개를 결합하여 구성할 것이므로 `container`를 사용할 것이다. `container`는 phaser의 `gameobject`를 한번에 작업할 수 있는 객체의 묶음이다.

먼저 이미지를 로드하자.

```typescript
export class Loader {
  static loadScaffoldingComp(scene: Phaser.Scene) {
    scene.load.image("scaffolding_left", "/assets/jumfrog/scaffolding_left.png");
    scene.load.image("scaffolding_middle", "/assets/jumfrog/scaffolding_middle.png");
    scene.load.image("scaffolding_right", "/assets/jumfrog/scaffolding_right.png");
  }
}

class Stage extends Phaser.Scene {
  create() {
    Loader.loadScaffoldingComp(this);
  }
}
```

로드된 이미지를 하나의 컨테이너에 묶어서 처리할 예정이다. 묶인 이미지를 한번에 콜라이더(충돌을 담당하는 물리적 body 영역)를 적용해야하므로 `physic`가 아닌 상태로 화면에 그린다.

먼저 발판(Scaffolding) class를 `Container`를 상속하여 작성하고 물리엔진을 추가해보자.(`physics.add.existing`)

앞서 말했듯이 해당 발판은 공중에 떠 있으므로 중력의 영향을 받아선 안되고(`setAllowGravity(false)`) 충돌해도 이동해선 안된다(`setImmvable(true)`)

지상처럼 미끄러짐이 없어야 하며(`setFriction(0)`) 튕겨서도 안된다(`setBounce(0.2)`)

```typescript
export class Scaffolding extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.physics.world.enable(this);

    /** 좌, 중, 우 이미지 화면에 그리기 */
    const left = scene.add.image(0, 0, 'scaffolding_left');
    const middle = scene.add.image(left.width, 0, 'scaffolding_middle');
    const right = scene.add.image(left.width + middle.width, 0, 'scaffolding_right');

    /** container에 생성한 이미지 오브젝트 추가 */
    this.add([left, middle, right]);
    this.setSize(left.width + middle.width + right.width, left.height);
    this.setInteractive();

    scene.physics.add.existing(this);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.width, this.height);
    body.setImmovable(true);
    body.setCollideWorldBounds(true);
    body.setAllowGravity(false);
    body.setFriction(0);
    body.setBounce(0.2);
    /** 물리적 바디와 이미지 위치 맞게 조정 */
    body.setOffset(left.width, 0);
  }

  static create(scene: Phaser.Scene, x: number, y: number): Scaffolding {
    return new Scaffolding(scene, x, y);
  }
}
```

이제 맵에 블록을 추가하고 캐릭터와의 충돌을 설정한다.

`Phaser.Arcade`에서 충돌은 physics가 담당한다. 두 오브젝트간 충돌을 `collider`를 통해 설정해보자.

아래와 같이 작성하면 캐릭터를 만든 블록에 충돌 시키면 가로막히는 것을 볼 수 있다.

```typescript
export class Stage extends Scene {
  this.scaffolding!: Scaffolding;

  create() {
    this.scaffoding = Scaffolding.create(this);

    this.physics.add.collider(this.player, this.scaffolding);
  }
}
```
