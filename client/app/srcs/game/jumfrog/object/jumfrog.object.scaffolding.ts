export class Scaffolding {
  private _container!: Phaser.GameObjects.Container;
  private _body!: Phaser.Physics.Arcade.Body;

  get x(): number {
    return this._container.x;
  }
  get y(): number {
    return this._container.y;
  }
  get body(): Phaser.Physics.Arcade.Body {
    return this._body;
  }
  get container(): Phaser.GameObjects.Container {
    return this._container;
  }
  setPosition(x: number, y: number) {
    this._container.setPosition(x, y);
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this._container = scene.add.container(x, y);

    const left = scene.add.image(0, 0, "scaffolding_left");
    const middle = scene.add.image(left.width, 0, "scaffolding_middle");
    const right = scene.add.image(left.width + middle.width, 0, "scaffolding_right");

    this._container.add([left, middle, right]);
    this._container.setSize(left.width + middle.width + right.width, left.height);
    this._container.setInteractive();

    this._container = scene.physics.add.existing(this._container) as Phaser.GameObjects.Container;
    scene.physics.world.enable(this._container);
    this._body = this._container.body as Phaser.Physics.Arcade.Body;
    this._body.setSize(this._container.width, this._container.height);
    this._body.setImmovable(true);
    this._body.setCollideWorldBounds(true);
    this._body.setAllowGravity(false);
    this._body.setFriction(0);
    this._body.setBounce(0.2);
    this._body.setOffset(
      left.width,
      0,
    );
  }

  static create(scene: Phaser.Scene, x: number, y: number): Scaffolding {
    const scaffolding = new Scaffolding(scene, x, y);

    return scaffolding;
  }
}
