import {Scene} from 'phaser';
import {StageInfo} from '../object/ui/game.object.ui.stageInfo';

export class GameOver extends Scene {
  public stageInfo!: StageInfo;

  public gameoverText!: Phaser.GameObjects.Text;
  public retryButton!: Phaser.GameObjects.Text;
  public menuButton!: Phaser.GameObjects.Text;
  public bg!: Phaser.GameObjects.Rectangle;
  public container!: Phaser.GameObjects.Container;

  constructor() {
    super('GameOver');
  }
  init(data: any) {
    this.stageInfo = data.stageInfo;
  }
  create() {
    this.bg = this.add.rectangle(100, 150, 300, 300, 0x00000);
    this.gameoverText = this.add.text(100, 200, 'GAME OVER', {color: '#fff'});
    this.retryButton = this.add.text(100, 300, 'retry', {color: '#0f0'}).setInteractive();
    this.menuButton = this.add.text(100, 400, 'Menu', {color: '#0f0'}).setInteractive();
    this.container = this.add.container(
      100,
      100,
      [this.bg, this.retryButton, this.menuButton, this.gameoverText],
    );

    this.retryButton.on('pointerdown', () => {
      this.scene.stop('GameOver');
      this.scene.start('Stage');
    });
    this.menuButton.on('pointerdown', () => {
      this.scene.stop('Stage');
      this.scene.stop('GameOver');
      this.scene.start('Main');
    });
  }
}
