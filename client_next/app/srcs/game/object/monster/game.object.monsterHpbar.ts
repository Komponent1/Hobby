import { Hpbar } from "../base/game.object.hpbar";
import type { Stage } from "../../scenes/game.scene.stage";
import { MONSTER_HP } from "../../constant/game.constant.monster";

/* eslint-disable function-paren-newline */
export class MonsterHpbar extends Hpbar {
  static init() {
    const monsterhpBar = new MonsterHpbar(
      MONSTER_HP,
      MONSTER_HP,
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
