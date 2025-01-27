import { MAP_RATIO, SCREEN_WIDTH } from "../../constant/game.constant.config";
import {
  ATTACKER_EXP, ATTACKER_GEN_TIME, BOSS_EXP, BOSS_GEN_TIME, SHOOTER_EXP, SHOOTER_GEN_TIME,
} from "../../constant/game.constant.monster";
import type { Stage } from "../../scenes/game.scene.stage";
import type { StageInfo } from "../ui/game.object.ui.stageInfo";
import { Attacker } from "./game.object.attacker";
import { Boss } from "./game.object.boss";
import { Shooter } from "./game.object.shooter";

enum MonsterPreloadNum {
  ATTACKER = 20,
  SHOOTER = 20,
  BOSS = 1,
}

export class Pool {
  public attackers: Attacker[] = [];
  public shooters: Shooter[] = [];
  public bosses: Boss[] = [];

  static init() {
    const pool = new Pool();
    pool.attackers = Array.from(
      { length: MonsterPreloadNum.ATTACKER },
      () => Attacker.init(ATTACKER_EXP),
    );
    pool.shooters = Array.from(
      { length: MonsterPreloadNum.SHOOTER },
      () => Shooter.init(SHOOTER_EXP),
    );
    pool.bosses = Array.from(
      { length: MonsterPreloadNum.BOSS },
      () => Boss.init(BOSS_EXP),
    );
    return pool;
  }
  create(scene: Stage) {
    this.attackers.forEach((attacker) => {
      attacker.create(scene, -100, -100);
    });
    this.shooters.forEach((shooter) => {
      shooter.create(scene, -100, -100);
    });
    this.bosses.forEach((boss) => {
      boss.create(scene, -100, -100);
    });
  }
  private spawnAttacker(stageInfo: StageInfo) {
    if (Date.now() - stageInfo.genTime.attacker <= ATTACKER_GEN_TIME) return;
    stageInfo.setGenTime("attacker", Date.now());
    const attacker = this.attackers.find((monster) => monster.status === "DEAD");
    if (attacker) {
      const x = Math.random() * MAP_RATIO * SCREEN_WIDTH;
      const y = Math.random() * MAP_RATIO * SCREEN_WIDTH;
      attacker.spawn(x, y);
    }
  }
  private spawnShooter(stageInfo: StageInfo) {
    if (Date.now() - stageInfo.genTime.shooter <= SHOOTER_GEN_TIME) return;
    stageInfo.setGenTime("shooter", Date.now());
    const shooter = this.shooters.find((monster) => monster.status === "DEAD");
    if (shooter) {
      const x = Math.random() * MAP_RATIO * SCREEN_WIDTH;
      const y = Math.random() * MAP_RATIO * SCREEN_WIDTH;
      shooter.spawn(x, y);
    }
  }
  private spawnBoss(stageInfo: StageInfo) {
    if (Date.now() - stageInfo.genTime.boss <= BOSS_GEN_TIME) return;
    stageInfo.setGenTime("boss", Date.now());
    const boss = this.bosses.find((monster) => monster.status === "DEAD");
    if (boss) {
      const x = Math.random() * MAP_RATIO * SCREEN_WIDTH;
      const y = Math.random() * MAP_RATIO * SCREEN_WIDTH;
      boss.spawn(x, y);
    }
  }
  update(scene: Stage) {
    switch (scene.stageInfo.stageLevel) {
      case 1:
        this.spawnAttacker(scene.stageInfo);

        this.attackers.forEach((attacker) => attacker.update(scene));
        break;
      case 2:
        this.spawnAttacker(scene.stageInfo);
        this.spawnShooter(scene.stageInfo);

        this.attackers.forEach((attacker) => attacker.update(scene));
        this.shooters.forEach((shooter) => shooter.update(scene));
        break;
      case 3:
        this.spawnAttacker(scene.stageInfo);
        this.spawnShooter(scene.stageInfo);
        this.spawnBoss(scene.stageInfo);

        this.attackers.forEach((attacker) => attacker.update(scene));
        this.shooters.forEach((shooter) => shooter.update(scene));
        this.bosses.forEach((boss) => boss.update(scene));
        break;
      default:
        break;
    }
  }
  clear() {
    this.attackers.forEach((attacker) => attacker.dead());
    this.shooters.forEach((shooter) => shooter.dead());
    this.bosses.forEach((boss) => boss.dead());
  }
}
