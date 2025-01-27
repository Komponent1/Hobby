import { Hpbar } from "../base/game.object.hpbar";
import type { Stage } from "../../scenes/game.scene.stage";

export class MonsterHpbar extends Hpbar {
  static init(hp: number) {
    const monsterhpBar = new MonsterHpbar(
      hp,
      hp,
    );
    return monsterhpBar;
  }
  create(scene: Stage, x: number, y: number): void {
    super.create(scene, x, y);
    scene.mapLayer.add(this._hpbar);
    scene.mapLayer.add(this._hpbarBg);
  }

  public move(x: number, y: number) {
    this._hpbarX = x;
    this._hpbarY = y;
    this.draw();
  }
}
