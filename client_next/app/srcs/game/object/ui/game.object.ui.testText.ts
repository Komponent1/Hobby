import type { Stage } from "../../scenes/game.scene.stage";

export class TestText {
  public hpText!: Phaser.GameObjects.Text;
  public damageText!: Phaser.GameObjects.Text;
  public rangeText!: Phaser.GameObjects.Text;
  public bg!: Phaser.GameObjects.Rectangle;
  public continer!: Phaser.GameObjects.Container;

  static create(scene: Stage) {
    const testText = new TestText();
    testText.hpText = scene.add.text(10, 10, 'HP: 100', { color: '#0f0' });
    testText.damageText = scene.add.text(10, 30, 'Damage: 10', { color: '#0f0' });
    testText.rangeText = scene.add.text(10, 50, 'Range: 10', { color: '#0f0' });
    testText.bg = scene.add.rectangle(0, 0, 200, 100, 0x000000, 0.5).setOrigin(0, 0);
    testText.continer = scene.add.container(
      1000,
      0,
      [testText.bg, testText.hpText, testText.damageText, testText.rangeText],
    );
    return testText;
  }
  draw(scene: Stage) {
    this.hpText.setText(`HP: ${scene.player.hp.hp}`);
    this.damageText.setText(`Damage: ${scene.player.weapon.damage}`);
    this.rangeText.setText(`Range: ${scene.player.weapon.range}`);
  }
}
