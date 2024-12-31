import { action, makeObservable, observable } from 'mobx';
import { GameData } from '../dto/game';
import { OwnedGames } from '../dto/steam.api..dto';

export class GameStore {
  @observable playerSummaries: any = {};
  @observable ownedGames: OwnedGames[] = [];
  @observable ownedGameDatas: GameData[] = [];

  constructor() {
    makeObservable(this);
  }

  @action
  setPlayerSummaries(playerSummaries: any) { this.playerSummaries = playerSummaries; }

  @action
  setOwnedGame(ownedGames: OwnedGames[]) { this.ownedGames = ownedGames; }

  @action
  setOwnedGameData(ownedGameDatas: GameData[]) { this.ownedGameDatas = ownedGameDatas; }
}
