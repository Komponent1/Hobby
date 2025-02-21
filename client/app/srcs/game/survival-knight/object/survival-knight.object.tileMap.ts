import {Scene} from 'phaser';
import {MAP_H, MAP_W} from '../constant/survival-knight.constant.config';
import { Loader } from "../loader/survival-knight.loader";

export class TileMap {
  public mapContainer!: Phaser.GameObjects.Container;
  static init() {
    return new TileMap();
  }
  create(scene: Scene) {
    Loader.createBoundaryAnimation(scene);

    const rowNum = Math.floor(MAP_W / 64);
    const colNum = Math.floor(MAP_H / 64);

    this.mapContainer = scene.add.container(0, 0);
    for (let i = 0; i <= rowNum; i += 1) {
      this.mapContainer.add(scene.add.image(i * 64, 0, 'water'));
      this.mapContainer.add(scene.add.image(i * 64, MAP_H - 64, 'water'));
    }
    for (let i = 0; i <= colNum; i += 1) {
      this.mapContainer.add(scene.add.image(0, i * 64, 'water'));
      this.mapContainer.add(scene.add.image(MAP_W - 64, i * 64, 'water'));
    }
    for (let i = 1; i <= rowNum - 2; i += 1) {
      this.mapContainer.add(scene.add.sprite(i * 64, 64, 'boundary').play('boundary_wave'));
      this.mapContainer.add(scene.add.sprite(i * 64, MAP_H - 128, 'boundary').play('boundary_wave'));
      this.mapContainer.add(scene.add.sprite(i * 64, MAP_H, 'water'));
    }
    for (let i = 1; i <= colNum - 2; i += 1) {
      this.mapContainer.add(scene.add.sprite(64, i * 64, 'boundary').play('boundary_wave'));
      this.mapContainer.add(scene.add.sprite(MAP_W - 128, i * 64, 'boundary').play('boundary_wave'));
      this.mapContainer.add(scene.add.sprite(MAP_W, i * 64, 'water'));
    }
    this.mapContainer.add(scene.add.image(MAP_W, MAP_H, 'water'));

    this.mapContainer.add(scene.add.image(64, 64, 'grass', 0));
    this.mapContainer.add(scene.add.image(MAP_W - 128, 64, 'grass', 2));
    this.mapContainer.add(scene.add.image(64, MAP_H - 128, 'grass', 20));
    this.mapContainer.add(scene.add.image(MAP_W - 128, MAP_H - 128, 'grass', 22));

    for (let i = 2; i <= rowNum - 3; i += 1) {
      this.mapContainer.add(scene.add.image(i * 64, 64, 'grass', 1));
      this.mapContainer.add(scene.add.image(i * 64, MAP_H - 128, 'grass', 21));
    }
    for (let i = 2; i <= colNum - 3; i += 1) {
      this.mapContainer.add(scene.add.image(64, i * 64, 'grass', 10));
      this.mapContainer.add(scene.add.image(MAP_W - 128, i * 64, 'grass', 12));
    }
    for (let i = 2; i <= rowNum - 3; i += 1) {
      for (let j = 2; j <= colNum - 3; j += 1) {
        this.mapContainer.add(scene.add.image(i * 64, j * 64, 'grass', 11));
      }
    }

    for (let i = 0; i <= 10; i += 1) {
      this.mapContainer.add(scene.add.image(
        64 * Math.floor(Math.random() * (rowNum - 3)) + 64,
        64 * Math.floor(Math.random() * (colNum - 3)) + 64,
        'deco_rock',
      ));
    }
    for (let i = 0; i <= 10; i += 1) {
      this.mapContainer.add(scene.add.image(
        64 * Math.floor(Math.random() * (rowNum - 3)) + 64,
        64 * Math.floor(Math.random() * (colNum - 3)) + 64,
        'deco_grass',
      ));
    }

    if (Object.keys(scene).findIndex((key) => key === 'mapLayer') !== -1) {
      (scene as any).mapLayer.add(this.mapContainer);
    }
  }
}
