import { MAP_H, MAP_W } from "../constant/survival-knight.constant.config";
import { PLAYER, SWORD } from "../constant/survival-knight.constant.object";
import {StageState} from '../scenes/survival-knight.scene.enum';
import type {Stage} from '../scenes/survival-knight.scene.stage';
import {Character} from './survival-knight.object.character';
import {CharacterStatus} from './survival-knight.object.enum';
import { PlayerHpbar } from "./ui/survival-knight.object.playerHpbar";
import { Sword } from "./weapon/survival-knight.object.weapon.sword";

export class Player extends Character {
  protected _hp: PlayerHpbar;
  protected _physics!: Phaser.GameObjects.GameObject;
  protected _exp: number;
  protected _sword: Sword;

  constructor(
    name: string,
    attack: number,
    speed: number,
    hp: PlayerHpbar,
    sword: Sword,
  ) {
    super(name, hp, attack, speed);
    this._hp = hp;
    // this.weapon = sword;
    this._exp = 13;
    this._sword = sword;
  }
  static init() {
    const player = new Player(
      'player',
      PLAYER.ATTACK,
      PLAYER.SPEED,
      PlayerHpbar.init(),
      Sword.init(),
    );
    return player;
  }
  create(scene: Stage, x: number, y: number) {
    this._sprite = scene.add.sprite(0, 0, 'player').play('player_idle');
    this._hp.create(scene);
    this._container = scene.add.container(x, y, [this._sprite]).setSize(80, 80);
    this._container.setSize(80, 80).setDepth(5);
    this._physics = scene.matter.add.gameObject(this._container);

    scene.mapLayer.add(this._container);
  }
  get hp() { return this._hp; }
  get container() { return this._container; }
  get position() { return {x: this._container.x, y: this._container.y}; }
  get dir() { return this._dir; }
  get speed() { return this._speed; }
  get exp() { return this._exp; }
  get physics() { return this._physics; }
  get sword() { return this._sword; }

  changeState(state: CharacterStatus, scene: Stage) {
    if (this._status === CharacterStatus.ATTACK) return;
    switch (state) {
      case CharacterStatus.IDLE:
        if (this._status === CharacterStatus.IDLE) return;
        this._sprite.play('player_idle');
        break;
      case CharacterStatus.WALK:
        if (this._status === CharacterStatus.WALK) return;
        this._sprite.play('player_walk');
        break;
      case CharacterStatus.ATTACK: {
        let animKey;
        if (this._dir.x === 0) {
          animKey = this._dir.y > 0 ? 'player_attack_up' : 'player_attack_down';
        } else {
          animKey = 'player_attack';
        }
        this._sprite.play(animKey).once(`animationcomplete-${animKey}`, () => {
          this._sword.release(scene);
          this._status = CharacterStatus.IDLE;
          this._sprite.play('player_idle');
        });
        break;
      }
      case CharacterStatus.DEAD:
        if (this._status === CharacterStatus.DEAD) return;
        this._sprite.play('player_die');
        break;
      default:
        break;
    }
    this._status = state;
  }

  move(scene: Stage) {
    if (this._speed === 0) this.changeState(CharacterStatus.IDLE, scene);
    else this.changeState(CharacterStatus.WALK, scene);
    this._container.x += (this._speed * this._dir.x);
    this._container.y += (this._speed * this._dir.y);
    this._sword.setPosition(scene, this._container.x, this._container.y);
  }

  checkHp(scene: Stage) {
    if (this.hp.hp <= 0) {
      this._status = CharacterStatus.DEAD;
      this.sprite.play('player_die');
      scene.stageInfo.setStageState(StageState.GAMEOVER);
    }
  }
  setRange(range: number) {
    this._sword.setRange(range);
  }
  setDamage(damage: number) {
    this._sword.setDamage(damage);
  }
  addExp(earn: number) {
    this._exp += earn;
  }
  useExp(cost: number) {
    this._exp -= cost;
  }

  bodyAttack(scene: Stage, target: Character) {
    super.attackTo(scene, target);
  }
  swordAttack(scene: Stage) {
    if (this._hp.hp <= 0 || !this.sprite) return;
    this.changeState(CharacterStatus.ATTACK, scene);
    this._sword.attack(scene, this._dir);
  }
  flip(dir: boolean) {
    this._sprite.setFlipX(dir);
  }
  setPosition(x: number, y: number) {
    this._container.setPosition(x, y);
  }
  clear() {
    this._container.setPosition(
      MAP_W / 2,
      MAP_H / 2,
    );
    this._speed = PLAYER.SPEED;
    this._attack = PLAYER.ATTACK;
    this._sword.setDamage(SWORD.ATTACK);
    this._hp.setHp(PLAYER.HP);
  }
}
