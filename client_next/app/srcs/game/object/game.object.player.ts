import {
  ATTACK_COOLTIME,
  PLAYER_IDLE_FRAME, PLAYER_INIT_ATTACK, PLAYER_INIT_SPEED,
} from '../constant/game.constant.player';
import {StageState} from '../scenes/game.scene.enum';
import type {Stage} from '../scenes/game.scene.stage';
import {Charactor} from './game.object.charator';
import {CharactorStatus} from './game.object.enum';
import { PlayerHpbar } from "./ui/game.object.playerHpbar";
import { Sword } from "./weapon/game.object.weapon.sword";

export class Player extends Charactor {
  protected _hp: PlayerHpbar;
  public weapon!: Sword;
  protected _container!: Phaser.GameObjects.Container;
  protected _exp: number;

  constructor(
    name: string,
    attack: number,
    speed: number,
    hp: PlayerHpbar,
    sword: Sword,
  ) {
    super(name, hp, attack, speed);
    this._hp = hp;
    this.weapon = sword;
    this._exp = 13;
  }
  static init() {
    const player = new Player(
      'player',
      PLAYER_INIT_ATTACK,
      PLAYER_INIT_SPEED,
      PlayerHpbar.init(),
      Sword.init(),
    );
    return player;
  }
  create(scene: Stage, x: number, y: number) {
    const idle = {
      key: 'idle_player',
      frames: scene.anims.generateFrameNumbers('player', {start: PLAYER_IDLE_FRAME[0], end: PLAYER_IDLE_FRAME[1]}),
      frameRate: 10,
      repeat: -1,
    };
    const attack = {
      key: 'attack_player',
      frames: scene.anims.generateFrameNumbers('player', {start: 0, end: 3}),
      frameRate: 10,
      repeat: 0,
    };
    scene.anims.create(idle);
    scene.anims.create(attack);

    this._sprite = scene.physics.add.sprite(0, 0, 'player').play('idle_player');
    this._hp.create(scene);
    this.weapon.create(scene, 0, 0);
    this._container = scene.add.container(x, y, [this._sprite, this.weapon.hitbox]);

    scene.mapLayer.add(this._container);
  }
  get hp() { return this._hp; }
  get container() { return this._container; }
  get position() { return {x: this._container.x, y: this._container.y}; }
  get dir() { return this._dir; }
  get speed() { return this._speed; }
  get exp() { return this._exp; }

  move() {
    this._container.x += this._speed * this._dir.x;
    this._container.y += this._speed * this._dir.y;
  }

  checkHp(scene: Stage) {
    if (this.hp.hp <= 0) {
      scene.stageInfo.setStageState(StageState.GAMEOVER);
    }
  }
  setRange(range: number) {
    this.weapon.setRange(range);
  }
  setDamage(damage: number) {
    this.weapon.setDamage(damage);
  }
  addExp(earn: number) {
    this._exp += earn;
  }
  useExp(cost: number) {
    this._exp -= cost;
  }

  bodyAttack(target: Charactor) {
    super.attackTo(target);
  }
  swordAttack(scene: Stage) {
    if (this._hp.hp <= 0 || !this.sprite) return;
    this._status = CharactorStatus.ATTACK;
    this.weapon.attack(scene, this);
    this.sprite.play('attack_player').once('animationcomplete', () => {
      this.weapon.init();
      setTimeout(() => {
        this._status = CharactorStatus.IDLE;
      }, ATTACK_COOLTIME);
      this.sprite.play('idle_player');
    });
  }
}
