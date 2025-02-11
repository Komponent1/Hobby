import { Hpbar } from "../base/game.object.hpbar";
import type { Stage } from "../../scenes/game.scene.stage";
import { HPbarType } from "../../constant/game.constant.hp";

export class MonsterHpbar extends Hpbar {
  static init(hp: number, type: HPbarType) {
    const monsterhpBar = new MonsterHpbar(
      hp,
      hp,
      type,
    );
    return monsterhpBar;
  }
  create(scene: Stage, x: number, y: number): void {
    super.create(scene, x, y);
    scene.mapLayer.add(this._hpContainer);
  }

  public move(x: number, y: number) {
    this._hpbarX = x;
    this._hpbarY = y;
    this.draw();
  }
}
