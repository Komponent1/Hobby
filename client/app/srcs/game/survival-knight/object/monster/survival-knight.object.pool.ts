import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constant/survival-knight.constant.config";
import type { Stage } from "../../scenes/survival-knight.scene.stage";
import type { StageInfo } from "../ui/survival-knight.object.ui.stageInfo";
import { GoblinTorch } from "./survival-knight.object.goblien_torch";
import {CharacterStatus} from '../survival-knight.object.enum';
import { MONSTER_GEN_TIME, MonsterPreloadNum } from "../../constant/survival-knight.constant.stage";
import { Fire } from "./survival-knight.object.fire";
import { Boss } from "./survival-knight.object.boss";

export class Pool {
  public monsters = {
    goblin_torch: [] as GoblinTorch[],
    fire: [] as Fire[],
    boss: [] as Boss[],
  };

  static init() {
    const pool = new Pool();
    pool.monsters.goblin_torch = Array.from(
      { length: MonsterPreloadNum.goblin_torch },
      () => GoblinTorch.init(),
    );
    pool.monsters.fire = Array.from(
      { length: MonsterPreloadNum.fire },
      () => Fire.init(),
    );
    pool.monsters.boss = Array.from(
      { length: MonsterPreloadNum.boss },
      () => Boss.init(),
    );
    return pool;
  }
  create(scene: Stage) {
    this.monsters.goblin_torch.forEach((monster) => {
      monster.create(scene, -400, -400);
    });
    this.monsters.fire.forEach((monster) => {
      monster.create(scene, -400, -400);
    });
    this.monsters.boss.forEach((monster) => {
      monster.create(scene, -400, -400);
    });
  }
  private spawnMonster(stageInfo: StageInfo, scene: Stage, key: keyof typeof MonsterPreloadNum) {
    if (Date.now() - stageInfo.genTime[key] <= MONSTER_GEN_TIME[key]) return;
    stageInfo.setGenTime(key, Date.now());
    const mob = this.monsters[key].find(
      (monster) => monster.status === CharacterStatus.WAIT,
    );
    if (mob) {
      const x = Math.random() * (SCREEN_WIDTH * 0.8) + 100;
      const y = Math.random() * (SCREEN_HEIGHT * 0.8) + 100;
      mob.spawn(x, y, scene);
    }
  }
  update(scene: Stage) {
    switch (scene.stageInfo.stageLevel) {
      case 1:
        this.spawnMonster(scene.stageInfo, scene, 'goblin_torch');

        this.monsters.goblin_torch.forEach((monster) => monster.update(scene));
        break;
      case 2:
        this.spawnMonster(scene.stageInfo, scene, 'goblin_torch');
        this.spawnMonster(scene.stageInfo, scene, 'fire');

        this.monsters.goblin_torch.forEach((monster) => monster.update(scene));
        this.monsters.fire.forEach((monster) => monster.update(scene));
        break;
      default:
        this.spawnMonster(scene.stageInfo, scene, 'goblin_torch');
        this.spawnMonster(scene.stageInfo, scene, 'fire');
        this.spawnMonster(scene.stageInfo, scene, 'boss');

        this.monsters.goblin_torch.forEach((monster) => monster.update(scene));
        this.monsters.fire.forEach((monster) => monster.update(scene));
        this.monsters.boss.forEach((monster) => monster.update(scene));
        break;
    }
  }
  clear() {
    this.monsters.goblin_torch.forEach((monster) => monster.dead());
    this.monsters.fire.forEach((monster) => monster.dead());
    this.monsters.boss.forEach((monster) => monster.dead());
  }
}
