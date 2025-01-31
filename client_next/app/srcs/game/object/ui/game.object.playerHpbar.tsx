import { HPbarType } from "../../constant/game.constant.hp";
import { PLAYER_INIT_HP } from "../../constant/game.constant.player";
import type { Stage } from "../../scenes/game.scene.stage";
import { Hpbar } from "../base/game.object.hpbar";

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
