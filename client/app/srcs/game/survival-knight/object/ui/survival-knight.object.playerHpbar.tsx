import { HPbarType } from "../../constant/survival-knight.constant.hp";
import { PLAYER_INIT_HP } from "../../constant/survival-knight.constant.player";
import type { Stage } from "../../scenes/survival-knight.scene.stage";
import { Hpbar } from "../base/survival-knight.object.hpbar";

export class PlayerHpbar extends Hpbar {
  constructor(hp: number, maxHp: number) {
    super(hp, maxHp, HPbarType.PLAYER);
  }
  static init() {
    return new PlayerHpbar(PLAYER_INIT_HP, PLAYER_INIT_HP);
  }
  public create(scene: Stage): void {
    super.create(scene, 10, 10);
    scene.uiLayer.add(this._hpContainer);
  }
}
