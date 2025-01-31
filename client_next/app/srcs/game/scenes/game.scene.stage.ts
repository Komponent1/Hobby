import { Scene } from 'phaser';
import {Player} from '../object/game.object.player';
import {Keyboard} from '../control/keyboard';
import {
  BULLET_SPEED,
} from '../constant/game.constant.monster';
import { MAP_RATIO, SCREEN_HEIGHT, SCREEN_WIDTH } from "../constant/game.constant.config";
import { StageState } from "./game.scene.enum";
import { StageInfo } from "../object/ui/game.object.ui.stageInfo";
import { TestText } from "../object/ui/game.object.ui.testText";
import {Bullet} from '../object/game.object.bullet';
import { Pool } from "../object/monster/game.object.pool";
import { Loader } from "../loader/loader";
import {TileMap} from '../object/game.object.tileMap';

/** https://bdragon1727.itch.io/pixel-character-part-5 */

export class Stage extends Scene {
  constructor() {
    super('Stage');
  }

  public keyboard = new Keyboard();

  public uiLayer!: Phaser.GameObjects.Layer;
  public mapLayer!: Phaser.GameObjects.Layer;
  public shopLayer!: Phaser.GameObjects.Layer;
  public uiCamera!: Phaser.Cameras.Scene2D.Camera;
  public stageInfo!: StageInfo;
  public testUI!: TestText;

  public player!: Player;
  public pool!: Pool;
  public tileMap!: TileMap;

  public bullets: Bullet[] = [];

  init(data: any) {
    if (data.player) {
      this.player = data.player;
    } else {
      this.player = Player.init();
    }
    if (data.stageInfo) {
      this.stageInfo = data.stageInfo;
    } else {
      this.stageInfo = StageInfo.init();
    }
    this.pool = Pool.init();
    for (let i = 0; i < 100; i += 1) {
      this.bullets.push(Bullet.init(BULLET_SPEED));
    }
    this.tileMap = TileMap.init();
  }

  preload() {
    Loader.loadCharacterAtlas(this, 'player');
    Loader.loadCharacterAtlas(this, 'skeleton');
    Loader.loadCharacterAtlas(this, 'skeleton_shooter');
    Loader.loadCharacterAtlas(this, 'skeleton_boss');
    Loader.loadEffectAtlas(this, 'slash');
    Loader.loadTile(this, 'tile');
    Loader.loadUi(this, 'ui');
    Loader.loadBullet(this);
  }

  create() {
    /**
     * 레이어 생성
     * 1. uiLayer: UI 레이어
     * 2. mapLayer: object(플레이어, 몬스터 등) 레이어
     */
    this.uiLayer = this.add.layer();
    this.mapLayer = this.add.layer();
    this.shopLayer = this.add.layer();
    /** world bound setting */
    this.physics.world.setBounds(0, 0, SCREEN_WIDTH * MAP_RATIO, SCREEN_HEIGHT * MAP_RATIO);
    /** 카메라 세팅 */
    this.cameras.main.setBounds(0, 0, SCREEN_WIDTH * MAP_RATIO, SCREEN_HEIGHT * MAP_RATIO);
    this.uiCamera = this.cameras.add(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    /** 카메라별 필요없는 비추적 object 등록 */
    this.cameras.main.ignore(this.uiLayer);
    this.cameras.main.ignore(this.shopLayer);
    this.uiCamera.ignore(this.mapLayer);
    /** debug 옵션 (TODO: production 삭제) */
    // this.uiCamera.ignore(this.physics.world.debugGraphic);
    /** 입력 초기화 */
    this.keyboard.init(this);
    /** 타일맵 생성 및 레이어 등록 */
    this.tileMap.draw(this);
    /** 스테이지 정보 생성 */
    this.stageInfo.create(this);
    /** 애니메이션 생성 */
    Loader.createPlayerAnimation(this);
    Loader.createCharacterAnimation(this, 'skeleton');
    Loader.createCharacterAnimation(this, 'skeleton_shooter');
    Loader.createCharacterAnimation(this, 'skeleton_boss');
    Loader.createEffectAnimation(this, 'slash');
    /** 플레이어 생성(맵 중앙) */
    this.player.create(
      this,
      (SCREEN_WIDTH * MAP_RATIO) / 2,
      (SCREEN_HEIGHT * MAP_RATIO) / 2,
    );
    /** 플레이어 바운드 제한 생성 */
    this.player.sprite.setCollideWorldBounds(true);
    /** 매안 카메라에 player를 앵커로 설정 */
    this.cameras.main.startFollow(this.player.container);
    this.cameras.main.followOffset.set(0, 0);
    /** 적 풀 생성 */
    this.pool.create(this);
    /** 무기 등록 */
    this.bullets.forEach((bullet) => {
      bullet.create(this);
    });
    /** 테스트 옵션(prod 삭제) */
    this.testUI = TestText.create(this);
    this.uiLayer.add(this.testUI.continer);
  }

  update(): void {
    this.testUI.draw(this);
    if (this.stageInfo.stageState === StageState.PLAYING) {
      /** 클리어 체크 */
      if (this.stageInfo.checkClear()) return;
      this.stageInfo.updateTime();

      /** 조작 등록 */
      this.keyboard.setMoveControl(this);
      this.keyboard.setAttackControl(this);
      /** 몬스터 스폰 및 업데이트 & 사망체크 */
      this.pool.update(this);
      /** 총알 이동 및 업데이트 */
      this.bullets.forEach((bullet) => {
        bullet.move();
        bullet.checkOutOfScreen();
      });
      /** 플레이어 이동 및 사망 체크 */
      this.player.move();
      this.player.checkHp(this);
    } else if (this.stageInfo.stageState === StageState.CLEAR) {
      this.pool.clear();
      this.stageInfo.setStageState(StageState.SHOP);
      this.scene.launch('Shop', { player: this.player, stageInfo: this.stageInfo });
    } else if (this.stageInfo.stageState === StageState.GAMEOVER) {
      this.stageInfo.setStageState(StageState.RETRY_CHECK);
      this.scene.launch('RetryCheck', { player: this.player, stageInfo: this.stageInfo });
    }
  }
}
