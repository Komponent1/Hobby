# Phaser Button

```typescript
class S extneds Scene {
  create() {
    const button = this.add.text("This is Button", {});
    button.setInteractive();

    button.on("pointerdown", () => {
      ...
    })
  }
}
```