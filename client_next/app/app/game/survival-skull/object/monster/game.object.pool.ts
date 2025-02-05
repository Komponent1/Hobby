import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constant/game.constant.config";
import {
  SKELETON_EXP, SKELETON_GEN_TIME,
  SKELETON_BOSS_EXP, SKELETON_BOSS_GEN_TIME,
  SKELETON_SHOOTER_EXP, SKELETON_SHOOTER_GEN_TIME,
} from "../../constant/game.constant.monster";
import type { Stage } from "../../scenes/game.scene.stage";
import type { StageInfo } from "../ui/game.object.ui.stageInfo";
import { Skeleton } from "./game.object.skeleton";
import { SkeletonBoss } from "./game.object.boss";
import { SkeletonShooter } from "./game.object.skeletonShooter";
import {CharactorStatus} from '../game.object.enum';

enum MonsterPreloadNum {
  SKELETON = 20,
  SKELETON_SHOOTER = 20,
  SKELETON_BOSS = 1,
}

export class Pool {
  public skeletons: Skeleton[] = [];
  public skeletonShooters: SkeletonShooter[] = [];
  public skeletonBosses: SkeletonBoss[] = [];

  static init() {
    const pool = new Pool();
    pool.skeletons = Array.from(
      { length: MonsterPreloadNum.SKELETON },
      () => Skeleton.init(SKELETON_EXP),
    );
    pool.skeletonShooters = Array.from(
      { length: MonsterPreloadNum.SKELETON_SHOOTER },
      () => SkeletonShooter.init(SKELETON_SHOOTER_EXP),
    );
    pool.skeletonBosses = Array.from(
      { length: MonsterPreloadNum.SKELETON_BOSS },
      () => SkeletonBoss.init(SKELETON_BOSS_EXP),
    );
    return pool;
  }
  create(scene: Stage) {
    this.skeletons.forEach((skeleton) => {
      skeleton.create(scene, -400, -400);
    });
    this.skeletonShooters.forEach((shooter) => {
      shooter.create(scene, -400, -400);
    });
    this.skeletonBosses.forEach((boss) => {
      boss.create(scene, -400, -400);
    });
  }
  private spawnSkeleton(stageInfo: StageInfo, scene: Stage) {
    if (Date.now() - stageInfo.genTime.skeleton <= SKELETON_GEN_TIME) return;
    stageInfo.setGenTime("skeleton", Date.now());
    const skeleton = this.skeletons.find((monster) => monster.status === CharactorStatus.WAIT);
    if (skeleton) {
      const x = Math.random() * (SCREEN_WIDTH * 0.8) + 100;
      const y = Math.random() * (SCREEN_HEIGHT * 0.8) + 100;
      skeleton.spawn(x, y, scene);
    }
  }
  private spawnShooter(stageInfo: StageInfo, scene: Stage) {
    if (Date.now() - stageInfo.genTime.skeletonShooter <= SKELETON_SHOOTER_GEN_TIME) return;
    stageInfo.setGenTime("skeletonShooter", Date.now());
    const shooter = this.skeletonShooters.find(
      (monster) => monster.status === CharactorStatus.WAIT,
    );
    if (shooter) {
      const x = Math.random() * (SCREEN_WIDTH * 0.8) + 100;
      const y = Math.random() * (SCREEN_HEIGHT * 0.8) + 100;
      shooter.spawn(x, y, scene);
    }
  }
  private spawnBoss(stageInfo: StageInfo, scene: Stage) {
    if (Date.now() - stageInfo.genTime.skeletonBoss <= SKELETON_BOSS_GEN_TIME) return;
    stageInfo.setGenTime("skeletonBoss", Date.now());
    const boss = this.skeletonBosses.find((monster) => monster.status === CharactorStatus.WAIT);
    if (boss) {
      const x = Math.random() * (SCREEN_WIDTH * 0.8) + 100;
      const y = Math.random() * (SCREEN_HEIGHT * 0.8) + 100;
      boss.spawn(x, y, scene);
    }
  }
  update(scene: Stage) {
    switch (scene.stageInfo.stageLevel) {
      case 1:
        this.spawnSkeleton(scene.stageInfo, scene);

        this.skeletons.forEach((skeleton) => skeleton.update(scene));
        break;
      case 2:
        this.spawnSkeleton(scene.stageInfo, scene);
        this.spawnShooter(scene.stageInfo, scene);

        this.skeletons.forEach((skeleton) => skeleton.update(scene));
        this.skeletonShooters.forEach((shooter) => shooter.update(scene));
        break;
      case 3:
        this.spawnSkeleton(scene.stageInfo, scene);
        this.spawnShooter(scene.stageInfo, scene);
        this.spawnBoss(scene.stageInfo, scene);

        this.skeletons.forEach((skeleton) => skeleton.update(scene));
        this.skeletonShooters.forEach((shooter) => shooter.update(scene));
        this.skeletonBosses.forEach((boss) => boss.update(scene));
        break;
      default:
        break;
    }
  }
  clear() {
    this.skeletons.forEach((skeleton) => skeleton.dead());
    this.skeletonShooters.forEach((shooter) => shooter.dead());
    this.skeletonBosses.forEach((boss) => boss.dead());
  }
}
