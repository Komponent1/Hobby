# Phaser3 arcade-matter

### 대응

```typescript
scene.physics => scene.matter
```

### object에 body 추가
```typescript
const obj: Phaser.GameObject.any;
const body: Phaser.MatterJs.BodyType = scene.matter.add.some(...)
/** ex = scene.matter.add.fromVerties(...) */

scene.matter.add(obj, body);
```

### Container에 body 추가
```typescript
const container: Phaser.GameObject.Container;

container.setSize(x, y);
const physics = scene.matter.add.gameObject(container);
```

### move physics body
```typescript
const body: Phaser.MatterJs.BodyType;

scene.matter.body.setPosition(body, {x: , y: }, true);
```

### overlap event on
```typescript
scene.matter.world.on('collisionstart', (event) => {
  event.pairs.forEach((pair: Phaser.Types.Physics.Matter.MatterCollisionPair) => {
    const { bodyA, bodyB } = pair;
    if ((bodyA === someBody && bodyB === someBody2)
        || (bodyB === sombBody && bodyA === someBody2)) {
      callbackFunc();
    }
  });
})
```


