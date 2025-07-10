import {Scene} from 'phaser';
import { Loader } from '../loader/jumfrog,loader';
import { Player } from '../object/jumfrog.object.player';

import { ScaffoldingPool } from '../object/jumfrog.object.scaffoldingpool';
import { mapConfig } from '../config/jumfrog.map.config';

export class Stage extends Scene {
  constructor() {
    super("Stage");
  }

  public player!: Player;
  public scaffoldings!: ScaffoldingPool;

  preload() {
    Loader.loadFrog(this);
    Loader.loadScaffoldingComp(this);
  }
  create() {
    this.physics.world.setBounds(0, 0, mapConfig.width, mapConfig.height);
    this.cameras.main.setBounds(0, 0, mapConfig.width, mapConfig.height);

    Loader.createFrogAnimation(this);

    this.player = Player.create(this, mapConfig.width / 2, mapConfig.height);
    this.scaffoldings = ScaffoldingPool.create(this);

    this.cameras.main.startFollow(this.player);
    this.cameras.main.followOffset.set(0, 0);

    this.physics.add.collider(this.player, this.scaffoldings.getAll().map((s) => s.container));
  }
  update() {
    this.player.update();
  }
}
