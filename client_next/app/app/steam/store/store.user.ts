import {
  action, makeObservable, observable,
} from 'mobx';
import { GameData } from '../dto/steam.dto.game';
import { OwnedGames, PlayerSummary } from '../dto/steam.dto.api';

export class UserStore {
  @observable playerSummary!: PlayerSummary;
  @observable ownedGames: OwnedGames[] = [];
  @observable ownedGameDatas: GameData[] = [];

  constructor() {
    makeObservable(this);
  }

  @action
  setPlayerSummaries(playerSummary: PlayerSummary) { this.playerSummary = playerSummary; }

  @action
  setOwnedGame(ownedGames: OwnedGames[]) { this.ownedGames = ownedGames; }

  @action
  setOwnedGameData(ownedGameDatas: GameData[]) { this.ownedGameDatas = ownedGameDatas; }
}
