# Phaser Game - 7 맵 구성 기초

맵을 간단히 구성해보자. 게임성을 위해 움직이는 발판을 생성하고 맵에 띄워보자.

캐릭터는 해당 발판을 타고 위로 올라갈 것이다.

또한 올라감에 따라 카메라가 캐릭터를 따라갈 수 있도록 해보자.

### 발판 배치하기

발판을 지상으로 부터 몇개 배치할 수 있도록 만들어보자.

먼저 맵은 위로 쭉 뻗은 형태를 가지게 될 것이고 위쪽 방향으로 발판이 배치될 것이다.

이를 통합 관리하기 위한 `map.config`를 만들어 보자.

해당 값들은 각각 `gameConfig`와 `Stage`에서 발판을 생성할 때 활용할 것이다.

```typescript
export const mapConfig = {
  width: MAP_W,
  height: MAP_H,
  scaffoldings: [
    {
      x: 200,
      y: MAP_H - 100,
      /** 이후 움직이는 발판 때 사용될 flag */
      movable: false,
    },
    {
      x: 400,
      y: MAP_H - 200,
      movable: true,
    },
    {
      x: 600,
      y: MAP_H - 300,
      movable: true,
    },
    {
      x: 400,
      y: MAP_H - 400,
      movable: false,
    },
    {
      x: 200,
      y: MAP_H - 500,
      movable: false,
    },
  ],
};

export const gameConfig: Phaser.Types.Core.GameConfig = {
  ...
  scale: {
    width: 800,
    height: 600,
  },
  ...
};
```

먼저 일괄적으로 발판을 관리할 pool을 만들어보자.

pool은 일괄적으로 발판을 관리하기 위해 발판을 모아두는 클래스로 관리 용이성을 위해 아래와 같이 작성한다.

```typescript
export class ScaffoldingPool {
  private _scaffoldings: Scaffolding[] = [];
  private _scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this._scene = scene;
  }

  add(scaffolding: Scaffolding) {
    this._scaffoldings.push(scaffolding);
    this._scene.add.existing(scaffolding);
    this._scene.physics.add.existing(scaffolding);
  }

  getAll(): Scaffolding[] {
    return this._scaffoldings;
  }

  clear() {
    this._scaffoldings.forEach((scaffolding) => scaffolding.destroy());
    this._scaffoldings = [];
  }

  static create(scene: Phaser.Scene): ScaffoldingPool {
    const pool = new ScaffoldingPool(scene);
    mapConfig.scaffoldings.forEach((scaffoldingConfig) => {
      const scaffolding = Scaffolding.create(
        scene,
        scaffoldingConfig.x,
        scaffoldingConfig.y,
      );
      pool.add(scaffolding);
    });

    return pool;
  }
}


export class Stage extends Scene {
  public scaffoldings!: ScaffoldingPool;

  create() {
    ...
    this.scaffoldings = ScaffoldingPool.create(this);
    ...
    this.physics.add.collider(this.player, this.scaffoldings.getAll());
  }
```

### 움직이는 발판 만들기

게임성을 위해 일부 발판이 특정 구간을 좌/우로 이동을 반복하게 만들어보자.

phaser엔 `tween`을 통해 오브젝트의 시간당 변화를 구현할 수 있다.

상세한 내용은 [공식문서](https://docs.phaser.io/phaser/concepts/tweens)를 참고하고 여기선 간단한 좌/우 이동의 구현만 작업할 것이다.

특정 발판들만이 움직이도록 `movable` 값을 추가하고 이 값이 `true`인 경우에한 `tween`을 실행한다.

간단히 아래와 같이 작성할 수 있다.

```typescript
export const mapConfig = {

}

export class Scaffolding extends Phaser.GameObjects.Container {
  private _movable = false;

  constructor(scene: Phaser.Scene, x: number, y: number, movable: boolean = false) {
    ...
    this._movable = movable;
    ...
  }

  static create(scene: Phaser.Scene, x: number, y: number, movable: boolean = false): Scaffolding {
    const scaffolding = new Scaffolding(scene, x, y, movable);
    ...
    if (scaffolding._movable) {
      scene.tweens.add({
        targets: scaffolding,
        x: {from: 50, to: MAP_W - scaffolding.width}, /** 좌/우로 움직일 범위*/
        duration: 5000,
        yoyo: true,
        repeat: -1,
      });
    }
  }
```

위와 같이 작성하면 50 ~ 맵끝에서 길이를 뺀 거리 만큼 5초동안 좌/우로 이동한다.

다만 위와 같이 작성하게 되면 최초 위치가 모두 50으로 강제 고정되어 발판이 모두 같은 x축 위치에서 좌우로 이동하게 된다.

따라서 아래와 같이 초기 이동과 이후 이동이 다를 수 있도록 `onComplete`를 활용하여 수정하자.

```typescript
export class Scaffolding extends Phaser.GameObjects.Container {
  static create(scene: Phaser.Scene, x: number, y: number, movable: boolean = false): Scaffolding {
    ...
    if (scaffolding._movable) {
      scene.tweens.add({
        targets: scaffolding,
        x: 50,
        duration: ((scaffolding.x - 50) / (MAP_W - scaffolding.width)) * 5000,
        onComplete: () => {
          scene.tweens.add({
            targets: scaffolding,
            x: { from: 50, to: MAP_W - scaffolding.width },
            duration: 5000,
            yoyo: true,
            repeat: -1,
          });
        },
      });
    }
  }
}
```

### 발판과 캐릭터의 이동

위와같이 작성하고 움직이는 발판에 캐릭터가 올라가면 캐릭터와 발판이 같이 이동하지 않고 발판만 이동하여 캐릭터가 떨어지게 된다.

phaser는 오브젝트의 이동에따라 속도를 계산하는지 여부를 설정하는 `setDirectControl`을 제공한다. 해당 코드를 발판에 추가하자

```typescript
export class Scaffolding extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number, movable: boolean = false) {
    ...
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setDirectControl();
    ...
  }
}
```
