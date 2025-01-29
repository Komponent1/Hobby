import {Scene} from 'phaser';
import {MAP_H, MAP_W} from '../constant/game.constant.config';

const tile = (code: string) => `Tile_${code}.png`;
export class TileMap {
  private tiles = {
    lt: tile('07'),
    rt: tile('08'),
    lb: tile('15'),
    rb: tile('16'),
    b: tile('05'),
    t: tile('21'),
    l: tile('14'),
    r: tile('12'),
    center: tile('01'),
  };
  public mapContainer!: Phaser.GameObjects.Container;
  static init() {
    return new TileMap();
  }
  draw(scene: Scene) {
    const rowNum = Math.floor(MAP_W / 64);
    const colNum = Math.floor(MAP_H / 64);

    this.mapContainer = scene.add.container(0, 0);
    for(let i = 0; i <= rowNum; i++) {
      for(let j = 0; j <= colNum; j++) {
        this.mapContainer.add(scene.add.image(i * 64, j * 64, 'tile', this.tiles.center));
      }
    }
    for(let i = 0; i <= rowNum; i++) {
      this.mapContainer.add(scene.add.image(i * 64, 64, 'tile', this.tiles.t));
      this.mapContainer.add(scene.add.image(i * 64, MAP_H - 64, 'tile', this.tiles.b));
    }
    for(let i = 0; i <= colNum; i++) {
      this.mapContainer.add(scene.add.image(64, i * 64, 'tile', this.tiles.l));
      this.mapContainer.add(scene.add.image(MAP_W - 64, i * 64, 'tile', this.tiles.r));
    }
    this.mapContainer.add(scene.add.image(0, 0, 'tile', this.tiles.lt));
    this.mapContainer.add(scene.add.image(MAP_W - 64, 0, 'tile', this.tiles.rt));
    this.mapContainer.add(scene.add.image(0, MAP_H - 64, 'tile', this.tiles.lb));
    this.mapContainer.add(scene.add.image(MAP_W - 64, MAP_H - 64, 'tile', this.tiles.rb));

    if (Object.keys(scene).findIndex(key => key === 'mapLayer') !== -1) {
      (scene as any).mapLayer.add(this.mapContainer);
    }
  }
}