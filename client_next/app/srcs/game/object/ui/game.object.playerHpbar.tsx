import type { Stage } from "../../scenes/game.scene.stage";
import { Hpbar } from "../base/game.object.hpbar";

export class PlayerHpbar extends Hpbar {
  constructor(scene: Stage, x: number, y: number, hp: number, maxHp: number) {
    super(scene, x, y, hp, maxHp);
    this._hpbarWidth = 100;
    this._hpbarHeight = 10;
    scene.uiLayer.add(this._hpbar);
    scene.uiLayer.add(this._hpbarBg);
    this.draw();
  }
}
