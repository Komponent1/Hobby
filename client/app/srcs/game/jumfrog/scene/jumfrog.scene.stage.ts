import {Scene} from 'phaser';
import { Loader } from '../loader/jumfrog,loader';
import { Player } from '../object/jumfrog.object.player';

import { ScaffoldingPool } from '../object/jumfrog.object.scaffoldingpool';
import {
  BOTTOM, mapConfig, SCREEN_HEIGHT, SCREEN_WIDTH,
} from '../config/jumfrog.map.config';
import { UI } from '../object/ui/jumfrog.object.ui';
import { Tile } from '../object/jumfrog.object.tile';
import { Background } from '../object/jumfrog.object.background';
import { Map } from '../object/jumfrog.object.map';

export class Stage extends Scene {
  constructor() {
    super("Stage");
  }

  public player!: Player;
  public scaffoldings!: ScaffoldingPool;
  public ui!: UI;
  public background!: Background;
  public objLayer!: Phaser.GameObjects.Layer;
  public uiLayer!: Phaser.GameObjects.Layer;

  preload() {
    Loader.loadFrog(this);
    Loader.loadScaffoldingComp(this);
    Loader.loadTile(this);
    Loader.loadUi(this);
    Loader.loadSound(this);
  }
  create() {
    this.objLayer = this.add.layer();
    this.uiLayer = this.add.layer();
    const uiCamera = this.cameras.add(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    uiCamera.ignore(this.objLayer);
    uiCamera.ignore(this.physics.world.debugGraphic);
    this.cameras.main.ignore(this.uiLayer);

    Loader.createFrogAnimation(this);

    this.background = Background.create(this);
    Tile.create(this);
    Map.create(this);
    this.ui = UI.create(this);

    this.physics.world.setBounds(
      SCREEN_WIDTH / 2 - mapConfig.width / 2,
      0,
      mapConfig.width,
      mapConfig.height - BOTTOM,
    );
    this.cameras.main.setBounds(0, 0, mapConfig.width, mapConfig.height);
    this.cameras.main.ignore(this.uiLayer);

    this.player = Player.create(this, mapConfig.width / 2, mapConfig.height - BOTTOM);
    this.scaffoldings = ScaffoldingPool.create(this);

    this.cameras.main.startFollow(this.player);
    this.cameras.main.followOffset.set(0, 0);

    this.physics.add.collider(this.player, this.scaffoldings.getAll());
  }
  update() {
    this.player.update(this);
    this.ui.update(this);
  }
}
