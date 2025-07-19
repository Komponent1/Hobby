# Phaser Game - 8 UI 만들기

이번엔 UI를 만들어 보자.

만들 것은 점수와 타이머이고 해당 UI는 항상 화면에 존재해야한다.

### UI생성하기

UI 클래스를 만든다. 해당 클래스는 container를 상속한다. phaser는 텍스트를 제공(`add.text`)하므로 해당 기능을 사용한다.

시간은 게임을 시작한 시간을 기준으로 몇초가 지났는지 표기할 것이다. 따라서 시작시간을 기록할 변수(`_startTime`)을 작성하자.

높이는 현재 캐릭터가 맵의 최하단으로 부터 얼마나 위로 올라가 있는지를 체크할 것이다.

둘다 지속적으로 갱신해줘야하므로 `update`에 갱신을 작성해야한다.

```typescript
export class UI extends Phaser.GameObjects.Container {
  private _height: number;
  private _startTime: number;

  public timeText!: Phaser.GameObjects.Text;
  public heightText!: Phaser.GameObjects.Text;

  constructor(scene: Stage, x: number, y: number) {
    super(scene, x, y);
    this._height = 0;
    this._startTime = Date.now();
    this.timeText = scene.add.text(10, 10, 'Time: 0s', {
      fontSize: '16px',
      color: '#000000',
    });
    this.heightText = scene.add.text(10, 30, 'Height: 0m', {
      fontSize: '16px',
      color: '#000000',
    });

    scene.add.existing(this);
  }

  static create(scene: Stage): UI {
    const ui = new UI(scene, 0, 0);

    return ui;
  }

  update(scene: Stage) {
    const elapsedTime = Math.floor((Date.now() - this._startTime) / 1000);
    this.timeText.setText(`Time: ${elapsedTime}s`);

    const {player} = scene;
    if (player) {
      this._height = Math.floor((mapConfig.height - player.y - 10) / 100);
      this.heightText.setText(`Height: ${this._height}m`);
    }
  }
}

export class Stage extends Scene {
  public ui!: UI;

  create() {
    ...
    this.ui = UI.create(this);
  }

  update() {
    this.player.update();
    this.ui.update(this);
  }
}
```

### Layer, Camera

위와같이 작성하면 UI가 화면에 지속적으로 보이지 않는다. 이는 캐릭터를 비추는 camera와 다른 카메라로 UI를 그리고 항상 화면에 위치하도록 해야함을 의미한다.

해당 카메라는 기존의 캐릭터나 오브젝트를 그리면 안되므로 이를 layer를 통해 해결할 것이다.

layer는 오브젝트를 묶어서 처리하는 하나의 그룹이다. 카메라는 해당 layer를 무시(`ignore`)하도록 설정할 수 있고 무시된 layer를 카메라는 그리지 않는다.

아래처럼 새로운 카메라(`uiCamera`)를 생성하고, 캐릭터/Ui를 담을 layer를 각각 생성한다.

layer에 각 오브젝트를 추가(`add`)하고 해당 layer를 `uiCamera`가 무시하도록 설정한다.

```typescript
export class Stage extends Scene {
  public objLayer!: Phaser.GameObjects.Layer;
  public uiLayer!: Phaser.GameObjects.Layer;

  create() {
    this.objLayer = this.add.layer();
    this.uiLayer = this.add.layer();
    const uiCamera = this.cameras.add(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    this.cameras.main.ignore(this.uiLayer);
    uiCamera.ignore(this.objLayer);
    /** 개발 중 debug를 켜 두었다면 해당 옵션도 uiCamera에서 안보이도록 처리 */
    uiCamera.ignore(this.physics.world.debugGraphic);
  }
}

/** Player말고 발판(Scaffolding)도 동일하게 objLayer에 추가하자 */
export class Player extends Phaser.Physics.Arcade.Sprite {
  /** 기존까지 scene은 Phaser.Scene를 타입으로 가쪘으나 이제 Stage를 가지도록 수정 */
  constructor(scene: Stage, x: number, y: number) {
    ...
    /** 레이어에 추가 */
    scene.objLayer.add(this);
    ...
  }
}

export class UI extends Phaser.GameObjects.Container {
  constructor(scene: Stage, x: number, y: number) {
    ...
    scene.uiLayer.add(this);
  }
}
```
