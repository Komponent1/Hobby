# Phaser 카메라와 관계없이 그려지는 object

```typescript
class S extends Scene {
  create() {    
    this.cameras.main.ignore(/** ignore object **/)
  }
}
```

## Layer 활용하여 UI camera
```typescript
class S extends Scene {
  create() {
    const objLayer = this.add.layer();

    const uiCamera = this.cameras.add(0, 0, ui);
    const otherMovingObject = this.scene.add(...)
    objLayer.add(otherMovingObject)

    uiCamera.ignore(objLayer);
    uiCamera.ignore(this.physics.world.debugGraphic);
  }
}
```