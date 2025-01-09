# Phaser

### 충돌 구현 관련

overlap -> 겹침활용

- 특이사항
overlap을 위해 monster 클래스 내부로 scene(=this)을 파라미터로 받아 충돌설정을 하면 동작하지 않는다. why?

```javascript
class Monster {
  setCollision(scene: Phaser.Scene) {
    scene.physics.overlap(scene.player.sprite, this.sprite, () => {})
  }
}

class MainScene extends Phaser.Scene {
  player;
  monster;

  create() {
    this.player = Player.create();
    this.monster = monster.create();
    // 이하 동작하지 않음
    this.monster.setCollision(this);
    // 이하 동작함
    this.physics.overlap(this.player.sprite, monster.sprite, () => {})
  }
}
```


## information

1. phaser physics 선언위해서는 config에 physics 선언이 요구됨
2. player 객체는 `this.player = this.physics.add.sprite('sprite_name', pos).play(idle_anim)`
