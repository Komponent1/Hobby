import { Hpbar } from "../base/game.object.hpbar";
import type { Stage } from "../../scenes/game.scene.stage";

/* eslint-disable function-paren-newline */
export class MonsterHpbar extends Hpbar {
  constructor(scene: Stage, x: number, y: number, hp: number, maxHp: number) {
    super(scene, x, y, hp, maxHp);
    scene.mapLayer.add(this._hpbar);
    scene.mapLayer.add(this._hpbarBg);
  }

  public move(x: number, y: number) {
    this._hpbarX = x;
    this._hpbarY = y;
    this.draw();
  }
}
