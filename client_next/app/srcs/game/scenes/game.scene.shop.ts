import { Scene } from "phaser";
import { Player } from "../object/game.object.player";
import { StageInfo } from "../object/ui/game.object.ui.stageInfo";
import { StageState } from "./game.scene.enum";

enum ItemType {
  HP = 'hp',
  RANGE = 'range',
  DAMAGE = 'damage',
  NONE = 'none',
}
export class Shop extends Scene {
  public player!: Player;
  public stageInfo!: StageInfo;

  public hpupbtn!: Phaser.GameObjects.Text;
  public rangeupbtn!: Phaser.GameObjects.Text;
  public damageupbtn!: Phaser.GameObjects.Text;
  public shopbg!: Phaser.GameObjects.Rectangle;
  public nextbtn!: Phaser.GameObjects.Text;
  public cost!: Phaser.GameObjects.Text;
  public shopContainer!: Phaser.GameObjects.Container;

  public selecterBg!: Phaser.GameObjects.Rectangle;
  public okbtn!: Phaser.GameObjects.Text;
  public cancelbtn!: Phaser.GameObjects.Text;
  public selectorContainer!: Phaser.GameObjects.Container;

  public selectedupgrade: ItemType = ItemType.NONE;

  constructor() {
    super('Shop');
  }
  init(data: any) {
    this.player = data.player;
    this.stageInfo = data.stageInfo;
  }

  create() {
    this.selecterBg = this.add.rectangle(100, 150, 300, 300, 0x000000);
    this.okbtn = this.add.text(100, 200, 'Upgrade', { color: '#0f0', backgroundColor: "#fff" }).setInteractive();
    this.cancelbtn = this.add.text(100, 250, 'Cancel', { color: '#0f0', backgroundColor: "#fff" }).setInteractive();
    this.selectorContainer = this.add.container(
      100,
      150,
      [this.selecterBg, this.okbtn, this.cancelbtn],
    ).setDepth(-1).setVisible(false);
    this.okbtn.on('pointerdown', () => {
      switch (this.selectedupgrade) {
        case ItemType.HP:
          this.player.setHp(this.player.hp.hp + 10);
          this.player.useExp(5);
          this.cost.setText(`COST: ${this.player.exp}`);
          break;
        case ItemType.RANGE:
          this.player.setRange(this.player.weapon.range + 10);
          this.player.useExp(5);
          this.cost.setText(`COST: ${this.player.exp}`);
          break;
        case ItemType.DAMAGE:
          this.player.setDamage(this.player.weapon.damage + 10);
          this.player.useExp(5);
          this.cost.setText(`COST: ${this.player.exp}`);
          break;
        case ItemType.NONE:
          break;
        default:
          break;
      }
      this.selectorContainer.setDepth(-1).setVisible(false);
    });
    this.cancelbtn.on('pointerdown', () => {
      this.selectorContainer.setDepth(-1).setVisible(false);
    });

    this.shopbg = this.add.rectangle(0, 0, 800, 600, 0x000000, 0.5).setOrigin(0, 0);
    this.hpupbtn = this.add.text(100, 150, 'HP +10', { color: '#0f0' }).setInteractive();
    this.rangeupbtn = this.add.text(100, 200, 'Range +10', { color: '#0f0' }).setInteractive();
    this.damageupbtn = this.add.text(100, 250, 'Damage +10', { color: '#0f0' }).setInteractive();
    this.nextbtn = this.add.text(100, 300, 'OK', { color: '#0f0' }).setInteractive();
    this.cost = this.add.text(0, 0, `COST: ${this.player.exp}`, { color: '#fff'});
    this.shopContainer = this.add.container(
      100,
      100,
      [
        this.shopbg,
        this.hpupbtn,
        this.rangeupbtn,
        this.damageupbtn,
        this.nextbtn,
        this.selectorContainer,
        this.cost,
      ],
    );
    this.hpupbtn.on('pointerdown', () => {
      if (this.player.exp < 5) return;
      this.selectedupgrade = ItemType.HP;
      this.selectorContainer.setDepth(1).setVisible(true);
    });
    this.rangeupbtn.on('pointerdown', () => {
      if (this.player.exp < 5) return;
      this.selectedupgrade = ItemType.RANGE;
      this.selectorContainer.setDepth(1).setVisible(true);
    });
    this.damageupbtn.on('pointerdown', () => {
      if (this.player.exp < 5) return;
      this.selectedupgrade = ItemType.DAMAGE;
      this.selectorContainer.setDepth(1).setVisible(true);
    });
    this.nextbtn.on('pointerdown', () => {
      this.stageInfo.setStageState(StageState.PLAYING);
      this.stageInfo.setStageLevel(this.stageInfo.stageLevel + 1);
      this.stageInfo.setStageStartTime(Date.now());
      this.scene.stop('Shop');
      this.scene.start('Stage', { player: this.player, stageInfo: this.stageInfo });
    });
  }
}
