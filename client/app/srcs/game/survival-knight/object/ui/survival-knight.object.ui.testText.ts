import { SCREEN_WIDTH } from "../../constant/survival-knight.constant.config";
import type { Stage } from "../../scenes/survival-knight.scene.stage";
import { BulletStatus } from "../survival-knight.object.enum";

export class TestText {
  public hpText!: Phaser.GameObjects.Text;
  public damageText!: Phaser.GameObjects.Text;
  public rangeText!: Phaser.GameObjects.Text;
  public costText!: Phaser.GameObjects.Text;
  public bulletText!: Phaser.GameObjects.Text;
  public playerDir!: Phaser.GameObjects.Text;

  public bg!: Phaser.GameObjects.Rectangle;
  public continer!: Phaser.GameObjects.Container;

  static create(scene: Stage) {
    const testText = new TestText();
    testText.hpText = scene.add.text(10, 10, 'HP: 100', { color: '#0f0' });
    testText.damageText = scene.add.text(10, 30, 'Damage: 10', { color: '#0f0' });
    testText.rangeText = scene.add.text(10, 50, 'Range: 10', { color: '#0f0' });
    testText.costText = scene.add.text(10, 70, "COST: 0", { color: '#0f0' });
    testText.bulletText = scene.add.text(10, 90, "BULLET: 0", { color: '#0f0' });
    testText.bg = scene.add.rectangle(0, 0, 200, 200, 0x000000, 0.5).setOrigin(0, 0);
    testText.playerDir = scene.add.text(10, 110, "Dir: (1, 0)", { color: '#0f0' });
    testText.continer = scene.add.container(
      SCREEN_WIDTH - 200,
      0,
      [
        testText.bg,
        testText.hpText,
        testText.damageText,
        testText.rangeText,
        testText.bulletText,
        testText.playerDir,
        testText.costText,
      ],
    );
    return testText;
  }
  draw(scene: Stage) {
    this.hpText.setText(`HP: ${scene.player.hp.hp}`);
    this.damageText.setText(`Damage: ${scene.player.sword.damage}`);
    this.rangeText.setText(`Range: ${scene.player.sword.range}`);
    this.costText.setText(`COST: ${scene.player.exp}`);
    this.bulletText.setText(`BULLET: ${scene.bullets.filter((bullet) => bullet.status === BulletStatus.LOADED).length}`);
    this.playerDir.setText(`Dir: (${scene.player.dir.x}, ${scene.player.dir.y})`);
  }
}
