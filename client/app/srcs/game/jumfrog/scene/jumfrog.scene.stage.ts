import {Scene} from 'phaser';
import { Loader } from '../loader/jumfrog,loader';
import { Player } from '../object/jumfrog.object.player';

export class Stage extends Scene {
  constructor() {
    super("Stage");
  }

  public player!: Player;

  preload() {
    Loader.loadFrog(this);
  }
  create() {
    this.physics.world.setBounds(0, 0, 1000, 500);
    Loader.createFrogAnimation(this);
    this.player = Player.create(this, 500, 500);
  }
  update() {
    this.player.update();
  }
}
