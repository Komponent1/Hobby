import { MAP_RATIO, SCREEN_WIDTH } from "../../constant/game.constant.config";
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
      skeleton.create(scene, -100, -100);
    });
    this.skeletonShooters.forEach((shooter) => {
      shooter.create(scene, -100, -100);
    });
    this.skeletonBosses.forEach((boss) => {
      boss.create(scene, -100, -100);
    });
  }
  private spawnSkeleton(stageInfo: StageInfo) {
    if (Date.now() - stageInfo.genTime.skeleton <= SKELETON_GEN_TIME) return;
    stageInfo.setGenTime("skeleton", Date.now());
    const skeleton = this.skeletons.find((monster) => monster.status === CharactorStatus.WAIT);
    if (skeleton) {
      const x = Math.random() * MAP_RATIO * SCREEN_WIDTH;
      const y = Math.random() * MAP_RATIO * SCREEN_WIDTH;
      skeleton.spawn(x, y);
    }
  }
  private spawnShooter(stageInfo: StageInfo) {
    if (Date.now() - stageInfo.genTime.skeletonShooter <= SKELETON_SHOOTER_GEN_TIME) return;
    stageInfo.setGenTime("skeletonShooter", Date.now());
    const shooter = this.skeletonShooters.find(
      (monster) => monster.status === CharactorStatus.WAIT,
    );
    if (shooter) {
      const x = Math.random() * MAP_RATIO * SCREEN_WIDTH;
      const y = Math.random() * MAP_RATIO * SCREEN_WIDTH;
      shooter.spawn(x, y);
    }
  }
  private spawnBoss(stageInfo: StageInfo) {
    if (Date.now() - stageInfo.genTime.skeletonBoss <= SKELETON_BOSS_GEN_TIME) return;
    stageInfo.setGenTime("skeletonBoss", Date.now());
    const boss = this.skeletonBosses.find((monster) => monster.status === CharactorStatus.WAIT);
    if (boss) {
      const x = Math.random() * MAP_RATIO * SCREEN_WIDTH;
      const y = Math.random() * MAP_RATIO * SCREEN_WIDTH;
      boss.spawn(x, y);
    }
  }
  update(scene: Stage) {
    switch (scene.stageInfo.stageLevel) {
      case 1:
        this.spawnSkeleton(scene.stageInfo);

        this.skeletons.forEach((skeleton) => skeleton.update(scene));
        break;
      case 2:
        this.spawnSkeleton(scene.stageInfo);
        this.spawnShooter(scene.stageInfo);

        this.skeletons.forEach((skeleton) => skeleton.update(scene));
        this.skeletonShooters.forEach((shooter) => shooter.update(scene));
        break;
      case 3:
        this.spawnSkeleton(scene.stageInfo);
        this.spawnShooter(scene.stageInfo);
        this.spawnBoss(scene.stageInfo);

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
