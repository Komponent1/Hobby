import { Scene } from "phaser";
import { Player } from "../object/game.object.player";
import { StageInfo } from "../object/ui/game.object.ui.stageInfo";
import { StageState } from "./game.scene.enum";

export class Shop extends Scene {
  public player!: Player;
  public stageInfo!: StageInfo;
  public upbtn!: Phaser.GameObjects.Text;
  public okbtn!: Phaser.GameObjects.Text;

  constructor() {
    super('Shop');
  }
  init(data: any) {
    this.player = data.player;
    this.stageInfo = data.stageInfo;
  }
  create() {
    this.add.rectangle(0, 0, 800, 600, 0x000000, 0.5).setOrigin(0, 0);
    this.add.text(100, 100, 'Shop', { color: '#0f0' });

    this.upbtn = this.add.text(100, 200, 'Upgrade', { color: '#0f0' }).setInteractive();
    this.upbtn.on('pointerdown', () => {
      this.player.setDamage(this.player.weapon.damage + 10);
    });
    this.okbtn = this.add.text(100, 300, 'OK', { color: '#0f0' }).setInteractive();
    this.okbtn.on('pointerdown', () => {
      this.stageInfo.setStageState(StageState.PLAYING);
      this.stageInfo.setStageLevel(this.stageInfo.currentStageLevel + 1);
      this.stageInfo.setStageStartTime(Date.now());
      this.scene.stop('Shop');
      this.scene.start('Stage', { player: this.player, stageInfo: this.stageInfo });
    });
  }
}
