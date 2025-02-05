# Phaser 카메라 따라다니기

참고 [phaser follow camera example](https://labs.phaser.io/edit.html?src=src\camera\follow%20offset.js)

```typescript
export class S extneds Scene {
  this.cameras.main.setBounds(0, 0, 1920 * 1.5, 1080 * 1.5);
  this.physics.world.setBounds(0, 0, 1920 * 1.5, 1080 * 1.5);

  this.player = this.physics.add.srpite(...);
  this.player.setCollideWorldBounds(true);

  this.cameras.main.startFollow(this.player);
  this.cameras.main.followOffset.set(0, 0);
}
```