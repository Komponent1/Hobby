import { Scene } from 'phaser';
import {Player} from '../object/survival-knight.object.player';
import {Keyboard} from '../control/survival-knight.keyboard';
import {
  BULLET_SPEED,
} from '../constant/survival-knight.constant.monster';
import {
  MAP_H, MAP_W, SCREEN_HEIGHT, SCREEN_WIDTH,
} from "../constant/survival-knight.constant.config";
import { StageState } from "./survival-knight.scene.enum";
import { StageInfo } from "../object/ui/survival-knight.object.ui.stageInfo";
import { TestText } from "../object/ui/survival-knight.object.ui.testText";
import {Bullet} from '../object/survival-knight.object.bullet';
import { Pool } from "../object/monster/survival-knight.object.pool";
import { Loader } from "../loader/survival-knight.loader";
import {TileMap} from '../object/survival-knight.object.tileMap';

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
    Loader.loadTilemap(this);
    Loader.loadUi(this, 'ui');
    Loader.loadBullet(this);
    Loader.loadCharacterSprite(this, 'player');
    Loader.loadCharacterSprite(this, 'goblin_torch');
    Loader.loadCharacterSprite(this, 'fire', 128);
    Loader.loadCharacterSprite(this, 'boss');
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
    this.matter.world.setBounds(64, 64, MAP_W - 192, MAP_H - 192);
    /** 카메라 세팅 */
    this.cameras.main.setBounds(0, 0, MAP_W, MAP_H);
    this.uiCamera = this.cameras.add(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    /** 카메라별 필요없는 비추적 object 등록 */
    this.cameras.main.ignore(this.uiLayer);
    this.cameras.main.ignore(this.shopLayer);
    this.uiCamera.ignore(this.mapLayer);
    /** debug 옵션 (TODO: production 삭제) */
    this.uiCamera.ignore(this.matter.world.debugGraphic);
    /** 입력 초기화 */
    this.keyboard.init(this);
    /** 타일맵 생성 및 레이어 등록 */
    this.tileMap.create(this);
    /** 스테이지 정보 생성 */
    this.stageInfo.create(this);
    /** 애니메이션 생성 */
    Loader.createAnimationV2(this, 'player');
    Loader.createAnimationV2(this, 'goblin_torch');
    Loader.createAnimationV2(this, 'fire');
    Loader.createAnimationV2(this, 'boss');
    /** 플레이어 생성(맵 중앙) */
    this.player.create(
      this,
      MAP_W / 2,
      MAP_H / 2,
    );

    // /** 플레이어 바운드 제한 생성 */
    // this.player.container.setCollideWorldBounds(true);
    // /** 매안 카메라에 player를 앵커로 설정 */
    this.cameras.main.startFollow(this.player.container);
    this.cameras.main.followOffset.set(0, 0);
    /** 적 풀 생성 */
    this.pool.create(this);
    // /** 무기 등록 */
    this.bullets.forEach((bullet) => {
      bullet.create(this);
    });

    this.events.on('retry', () => {
      this.stageStartTime = Date.now();
      this.stageInfo.clear();
      this.pool.clear();
      this.bullets.forEach((bullet) => {
        bullet.clear();
      });
      this.player.clear();
      this.stageInfo.setStageState(StageState.LOADING);
    }, this);
    this.events.on('next-level', (data: {player: Player, stageInfo: StageInfo}) => {
      this.stageInfo = data.stageInfo;
      this.player = data.player;
      this.player.setPosition(MAP_W / 2, MAP_H / 2);
      this.stageStartTime = Date.now();

      this.pool.clear();
      this.bullets.forEach((bullet) => {
        bullet.clear();
      });
      this.stageInfo.setStageState(StageState.LOADING);
    });
    // /** 테스트 옵션(prod 삭제) */
    this.testUI = TestText.create(this);
    this.uiLayer.add(this.testUI.continer);
  }

  stageStartTime = Date.now();
  loadTime!: Phaser.GameObjects.Text | null;

  update(): void {
    this.testUI.draw(this);
    if (this.stageInfo.stageState === StageState.LOADING) {
      if (!this.loadTime) {
        this.loadTime = this.add.text(
          SCREEN_WIDTH / 2,
          SCREEN_HEIGHT / 2,
          '1',
          {
            color: '#fff', fontStyle: 'bold', fontSize: 96, fontFamily: 'noto',
          },
        ).setOrigin(0.5);
        this.uiLayer.add(this.loadTime);
      } else {
        this.loadTime.setText(`${Math.ceil((Date.now() - this.stageStartTime) / 1000)}`);
        if (Date.now() - this.stageStartTime > 3000) {
          this.stageInfo.setStageState(StageState.PLAYING);
          this.stageInfo.setStageStartTime(Date.now());
          this.loadTime.destroy();
          this.loadTime = null;
        }
      }
    } else if (this.stageInfo.stageState === StageState.PLAYING) {
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
      this.player.move(this);
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
