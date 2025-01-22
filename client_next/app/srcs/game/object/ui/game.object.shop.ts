import { StageState } from "../../scenes/game.scene.enum";
import type { Stage } from "../../scenes/game.scene.stage";

enum ItemType {
  HP = 'hp',
  RANGE = 'range',
  DAMAGE = 'damage',
}
export class Shop {
  public container!: Phaser.GameObjects.Container;
  public shopBox!: Phaser.GameObjects.Rectangle;
  public hpItem!: Phaser.GameObjects.Text;
  public rangeItem!: Phaser.GameObjects.Text;
  public damageItem!: Phaser.GameObjects.Text;
  public closeBtn!: Phaser.GameObjects.Text;

  public concernContainer!: Phaser.GameObjects.Container;
  public concernSelector!: Phaser.GameObjects.Rectangle;
  public concernYes!: Phaser.GameObjects.Text;
  public concernNo!: Phaser.GameObjects.Text;

  public show() {
    this.container.setVisible(true);
  }
  public buyItem(itemType: ItemType, scene: Stage) {
    this.concernContainer.setVisible(true);
    this.concernYes.on('pointerdown', () => {
      if (itemType === ItemType.HP) {
        scene.player.setHp(scene.player.hp.hp + 10);
        // 구매
        this.concernYes.off('pointerdown');
        this.concernContainer.setVisible(false);
      }
      if (itemType === ItemType.RANGE) {
        scene.player.setRange(scene.player.weapon.range + 10);
        // 구매
        this.concernYes.off('pointerdown');
        this.concernContainer.setVisible(false);
      }
      if (itemType === ItemType.DAMAGE) {
        scene.player.setDamage(scene.player.weapon.damage + 10);
        // 구매
        this.concernYes.off('pointerdown');
        this.concernContainer.setVisible(false);
      }
    });
  }
  public close(scene: Stage) {
    this.container.setVisible(false);
    scene.stageInfo.setStageStartTime(Date.now());
    scene.stageInfo.setStageState(StageState.PLAYING);
  }

  static create(scene: Stage) {
    const shop = new Shop();
    shop.shopBox = scene.add.rectangle(0, 0, 500, 500, 0x000000);
    shop.hpItem = scene.add.text(0, 0, 'HP +10', { color: '#ffff00', backgroundColor: '#0000ff' }).setInteractive();
    shop.rangeItem = scene.add.text(100, 0, 'Range +10', { color: '#ff00ff', backgroundColor: '#00ff00' }).setInteractive();
    shop.damageItem = scene.add.text(200, 0, 'Damage +10', { color: '#00ffff', backgroundColor: '#ff0000' }).setInteractive();
    shop.closeBtn = scene.add.text(300, 0, 'Close', { color: '#ffffff', backgroundColor: '#000000' }).setInteractive();
    shop.hpItem.on('pointerdown', () => {
      shop.buyItem(ItemType.HP, scene);
    });
    shop.rangeItem.on('pointerdown', () => {
      shop.buyItem(ItemType.RANGE, scene);
    });
    shop.damageItem.on('pointerdown', () => {
      shop.buyItem(ItemType.DAMAGE, scene);
    });
    shop.closeBtn.on('pointerdown', () => {
      shop.close(scene);
    });

    shop.concernYes = scene.add.text(0, 0, 'Yes', { color: '#ffffff', backgroundColor: '#000000' }).setInteractive();
    shop.concernNo = scene.add.text(100, 0, 'No', { color: '#ffffff', backgroundColor: '#000000' }).setInteractive();
    shop.concernNo.on('pointerdown', () => {
      shop.concernSelector.setVisible(false);
    });
    shop.concernSelector = scene.add.rectangle(0, 0, 300, 200, 0xffffff, 0.5);
    shop.concernContainer = scene.add.container(
      600,
      600,
      [shop.concernSelector, shop.concernYes, shop.concernNo, shop.concernYes],
    );
    shop.concernContainer.setVisible(false);

    shop.container = scene.add.container(
      500,
      500,
      [
        shop.shopBox,
        shop.hpItem,
        shop.rangeItem,
        shop.damageItem,
        shop.closeBtn,
        shop.concernSelector,
      ],
    );
    scene.uiLayer.add(shop.container);
    shop.container.setVisible(false);

    return shop;
  }
}
