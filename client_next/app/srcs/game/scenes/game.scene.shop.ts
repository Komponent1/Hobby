import { Scene } from "phaser";
import { Player } from "../object/game.object.player";
import { StageInfo } from "../object/ui/game.object.ui.stageInfo";
import { StageState } from "./game.scene.enum";
import { Loader } from "../loader/loader";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constant/game.constant.config";

enum ItemType {
  HP = 'hp',
  RANGE = 'range',
  DAMAGE = 'damage',
  NONE = 'none',
}
export class Shop extends Scene {
  public player!: Player;
  public stageInfo!: StageInfo;
  public selectedupgrade: ItemType = ItemType.NONE;

  constructor() {
    super('Shop');
  }
  init(data: any) {
    this.player = data.player;
    this.stageInfo = data.stageInfo;
  }
  preload() {
    Loader.loadUi(this, 'ui');
  }

  create() {
    const shopbg = this.add.image(0, 0, 'ui', 'Window.png');
    const shopHeader = this.add.image(0, -200, 'ui', 'shop/Header.png');
    const cost = this.add.text(0, -150, `EXP: ${this.player?.exp || 0}`, { color: '#fff', fontStyle: 'bold', fontSize: 32 }).setOrigin(0.5);

    const hpupbtn = this.add.image(0, 0, 'ui', 'shop/HP_Icon.png').setScale(1.5);
    const hpText = this.add.image(0, 70, 'ui', 'shop/Health.png');
    const hpCost = this.add.text(0, 110, 'EXP -5', { color: '#fff', fontStyle: 'bold', fontSize: 32 }).setOrigin(0.5);
    const hpContainer = this.add.container(
      -100,
      0,
      [hpupbtn, hpText, hpCost],
    ).setSize(170, 150).setInteractive();
    const damageupbtn = this.add.image(0, 0, 'ui', 'shop/Damage_Icon.png').setScale(1.5);
    const damageText = this.add.image(0, 70, 'ui', 'shop/Damage.png');
    const damageCost = this.add.text(0, 110, 'EXP -5', { color: '#fff', fontStyle: 'bold', fontSize: 32 }).setOrigin(0.5);
    const damageContainer = this.add.container(
      100,
      0,
      [damageupbtn, damageText, damageCost],
    ).setSize(170, 150).setInteractive();

    const nextbtn = this.add.image(150, 250, 'ui', 'shop/Play_BTN.png').setInteractive();
    this.add.container(
      SCREEN_WIDTH / 2,
      SCREEN_HEIGHT / 2 - 50,
      [
        shopbg,
        shopHeader,
        cost,
        hpContainer,
        damageContainer,
        nextbtn,
      ],
    );

    const selecterBg = this.add.image(0, 0, 'ui', 'shop/Select_Window.png').setScale(0.9);
    const text = this.add.text(0, -50, 'Are you sure?', { color: '#fff', fontStyle: 'bold', fontSize: 32 }).setOrigin(0.5);
    const okbtn = this.add.image(-100, 60, 'ui', 'shop/Ok_BTN.png').setInteractive();
    const cancelbtn = this.add.image(100, 60, 'ui', 'shop/Close_BTN.png').setInteractive();
    const selectorContainer = this.add.container(
      SCREEN_WIDTH / 2,
      SCREEN_HEIGHT / 2,
      [selecterBg, okbtn, cancelbtn, text],
    ).setDepth(-1).setVisible(false);
    okbtn.on('pointerdown', () => {
      switch (this.selectedupgrade) {
        case ItemType.HP:
          this.player.setHp(this.player.hp.hp + 10);
          this.player.useExp(5);
          cost.setText(`EXP: ${this.player.exp}`);
          break;
        case ItemType.RANGE:
          this.player.setRange(this.player.weapon.range + 10);
          this.player.useExp(5);
          cost.setText(`EXP: ${this.player.exp}`);
          break;
        case ItemType.DAMAGE:
          this.player.setDamage(this.player.weapon.damage + 10);
          this.player.useExp(5);
          cost.setText(`EXP: ${this.player.exp}`);
          break;
        case ItemType.NONE:
          break;
        default:
          break;
      }
      selectorContainer.setDepth(-1).setVisible(false);
    });
    okbtn.on('pointerover', () => {
      okbtn.setScale(1.1);
    });
    okbtn.on('pointerout', () => {
      okbtn.setScale(1);
    });
    cancelbtn.on('pointerdown', () => {
      selectorContainer.setDepth(-1).setVisible(false);
    });
    cancelbtn.on('pointerover', () => {
      cancelbtn.setScale(1.1);
    });
    cancelbtn.on('pointerout', () => {
      cancelbtn.setScale(1);
    });

    hpContainer.on('pointerdown', () => {
      this.selectedupgrade = ItemType.HP;
      selectorContainer.setDepth(1).setVisible(true);
    });
    hpContainer.on('pointerover', () => {
      hpContainer.setScale(1.1);
    });
    hpContainer.on('pointerout', () => {
      hpContainer.setScale(1);
    });
    damageContainer.on('pointerdown', () => {
      this.selectedupgrade = ItemType.DAMAGE;
      selectorContainer.setDepth(1).setVisible(true);
    });
    damageContainer.on('pointerover', () => {
      damageContainer.setScale(1.1);
    });
    damageContainer.on('pointerout', () => {
      damageContainer.setScale(1);
    });
    nextbtn.on('pointerdown', () => {
      if (this.stageInfo.stageLevel === 3) {
        this.scene.stop('Shop');
        this.scene.stop('Stage');
        this.scene.start('Main');
        return;
      }
      this.stageInfo.setStageState(StageState.PLAYING);
      this.stageInfo.setStageLevel(this.stageInfo.stageLevel + 1);
      this.stageInfo.setStageStartTime(Date.now());
      this.scene.stop('Shop');
      this.scene.start('Stage', { player: this.player, stageInfo: this.stageInfo });
    });
    nextbtn.on('pointerover', () => {
      nextbtn.setScale(1.1);
    });
    nextbtn.on('pointerout', () => {
      nextbtn.setScale(1);
    });
  }
}
