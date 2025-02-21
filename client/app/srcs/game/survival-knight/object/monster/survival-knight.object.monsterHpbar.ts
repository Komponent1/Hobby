import { Hpbar } from "../base/survival-knight.object.hpbar";
import type { Stage } from "../../scenes/survival-knight.scene.stage";
import { HPbarType } from "../../constant/survival-knight.constant.hp";

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
