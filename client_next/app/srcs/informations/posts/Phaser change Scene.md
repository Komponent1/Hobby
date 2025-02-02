# Phaser change Scene

```typescript
class S extends Scene {
  create() {
    ...
    this.scene.start("next-scene name", { fadeIn: true } /** 옵션 **/)
  }
}
```