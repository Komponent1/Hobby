import { Scene } from 'phaser';
import {Player} from '../object/game.object.player';
import {Keyboard} from '../control/keyboard';
import {
  PLAYER_HEIGHT, PLAYER_MARGIN, PLAYER_SPACING, PLAYER_WIDTH,
} from '../constant/game.constant.player';
import {
  BOSS_EXP,
  BOSS_GEN_TIME,
  MONSTER1_EXP,
  MONSTER1_GEN_TIME,
  MONSTER2_EXP,
  MONSTER2_GEN_TIME,
  MONSTER_HEIGHT, MONSTER_MARGIN, MONSTER_SPACING, MONSTER_WIDTH,
} from '../constant/game.constant.monster';
import { MAP_RATIO, SCREEN_HEIGHT, SCREEN_WIDTH } from "../constant/game.constant.config";
import { StageState } from "./game.scene.enum";
import { StageInfo } from "../object/ui/game.object.ui.stageInfo";
import { TestText } from "../object/ui/game.object.ui.testText";
import {Monster1} from '../object/monster/game.object.monster1';
import {Monster2} from '../object/monster/game.object.monster2';
import {Bullet} from '../object/game.object.bullet';
import { Boss } from "../object/monster/game.object.boss";

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

  public monster1s: Monster1[] = [];
  public monster2s: Monster2[] = [];
  public boss: Boss[] = [];
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
    for (let i = 0; i < 10; i += 1) {
      this.monster1s.push(Monster1.init(MONSTER1_EXP));
    }
    for (let i = 0; i < 10; i += 1) {
      this.monster2s.push(Monster2.init(MONSTER2_EXP));
    }
    this.boss.push(Boss.init(BOSS_EXP));
    for (let i = 0; i < 100; i += 1) {
      this.bullets.push(Bullet.init());
    }
  }

  preload() {
    this.load.image('tile_38', 'assets/tiles/FieldTile_38png');
    this.load.spritesheet('player', 'assets/charator/player.png', {
      frameWidth: PLAYER_WIDTH,
      frameHeight: PLAYER_HEIGHT,
      margin: PLAYER_MARGIN,
      spacing: PLAYER_SPACING,
    });
    this.load.spritesheet('monster1', 'assets/charator/monster1.png', {
      frameWidth: MONSTER_WIDTH,
      frameHeight: MONSTER_HEIGHT,
      margin: MONSTER_MARGIN,
      spacing: MONSTER_SPACING,
    });
    this.load.spritesheet('monster2', 'assets/charator/monster2.png', {
      frameWidth: MONSTER_WIDTH,
      frameHeight: MONSTER_HEIGHT,
      margin: MONSTER_MARGIN,
      spacing: MONSTER_SPACING,
    });
    this.load.spritesheet('boss', 'assets/charator/boss.png', {
      frameWidth: MONSTER_WIDTH,
      frameHeight: MONSTER_HEIGHT,
      margin: MONSTER_MARGIN,
      spacing: MONSTER_SPACING,
    });
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
    /** 카메라 세팅 */
    this.cameras.main.setBounds(0, 0, SCREEN_WIDTH * MAP_RATIO, SCREEN_HEIGHT * MAP_RATIO);
    this.uiCamera = this.cameras.add(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    /** 카메라별 필요없는 비추적 object 등록 */
    this.cameras.main.ignore(this.uiLayer);
    this.cameras.main.ignore(this.shopLayer);
    this.uiCamera.ignore(this.mapLayer);
    /** debug 옵션 (TODO: production 삭제) */
    this.uiCamera.ignore(this.physics.world.debugGraphic);
    /** 입력 초기화 */
    this.keyboard.init(this);
    /** 플레이어 생성(맵 중앙) */
    this.stageInfo.create(this);
    this.player.create(
      this,
      (SCREEN_WIDTH * MAP_RATIO) / 2,
      (SCREEN_HEIGHT * MAP_RATIO) / 2,
    );
    /** 매안 카메라에 player를 앵커로 설정 */
    this.cameras.main.startFollow(this.player.container);
    this.cameras.main.followOffset.set(0, 0);
    /** 적 풀 생성 */
    this.monster1s.forEach((monster) => {
      monster.create(this, -100, -100);
    });
    this.monster2s.forEach((monster) => {
      monster.create(this, -100, -100);
    });
    this.boss.forEach((monster) => {
      monster.create(this, -100, -100);
    });
    this.bullets.forEach((bullet) => {
      bullet.create(this);
    });
    /** 충돌 등록 */
    this.monster1s.forEach((monster) => {
      this.physics.add.overlap(this.player.sprite, monster.sprite, () => {
        this.player.bodyAttack(monster);
        monster.attackTo(this.player);
      });
    });
    this.monster2s.forEach((monster) => {
      this.physics.add.overlap(this.player.sprite, monster.sprite, () => {
        this.player.bodyAttack(monster);
        monster.attackTo(this.player);
      });
    });
    this.boss.forEach((monster) => {
      this.physics.add.overlap(this.player.sprite, monster.sprite, () => {
        this.player.bodyAttack(monster);
        monster.attackTo(this.player);
      });
    });
    this.bullets.forEach((bullet) => {
      this.physics.add.overlap(this.player.sprite, bullet.bullet, () => {
        bullet.attackTo(this.player);
      });
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
      /** 몬스터 스폰 */
      if (Date.now() - this.stageInfo.genTime.monster1 > MONSTER1_GEN_TIME) {
        this.stageInfo.setGenTime('monster1', Date.now());
        const x = Math.random() * 800;
        const y = Math.random() * 600;
        this.monster1s.find((monster) => monster.status === 'DEAD')?.spawn(x, y);
      }
      if (Date.now() - this.stageInfo.genTime.monster2 > MONSTER2_GEN_TIME) {
        this.stageInfo.setGenTime('monster2', Date.now());
        const x = Math.random() * 800;
        const y = Math.random() * 600;
        this.monster2s.find((monster) => monster.status === 'DEAD')?.spawn(x, y);
      }
      if (Date.now() - this.stageInfo.genTime.boss > BOSS_GEN_TIME) {
        const x = Math.random() * 800;
        const y = Math.random() * 600;
        this.boss.find((monster) => monster.status === 'DEAD')?.spawn(x, y);
      }
      /** 몬스터 이동 및 사망 체크 */
      this.monster1s.forEach((monster) => {
        monster.update(this);
      });
      this.monster2s.forEach((monster) => {
        monster.update(this);
      });
      this.boss.forEach((monster) => {
        monster.update(this);
      });
      /** 총알 이동 및 업데이트 */
      this.bullets.forEach((bullet) => {
        bullet.move();
        bullet.checkOutOfScreen();
      });
      /** 플레이어 이동 및 사망 체크 */
      this.player.move();
      this.player.checkHp(this);
    } else if (this.stageInfo.stageState === StageState.CLEAR) {
      this.monster1s.forEach((monster) => {
        monster.dead();
      });
      this.stageInfo.setStageState(StageState.SHOP);
      this.scene.launch('Shop', { player: this.player, stageInfo: this.stageInfo });
    } else if (this.stageInfo.stageState === StageState.GAMEOVER) {
      this.scene.start('GameOver');
    }
  }
}
