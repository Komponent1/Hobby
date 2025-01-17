import {getGenres, getGenresCounter} from '../analystic/steam.analystic.genres';
import { genTable } from "../analystic/steam.analystic.table";
import {getTagList, getTagCounter} from '../analystic/steam.analystic.tag';
import { GameData } from "../dto/steam.dto.game";
import {AnalyticStore} from '../store/store.analystic';
import rootStore from '../store/store.root';
import {UserStore} from '../store/store.user';

class AnalyticService {
  constructor(
    private userStore: UserStore,
    private analysticStore: AnalyticStore,
  ) {}

  getPlayerInformation() {
    return this.userStore.playerSummary;
  }

  setTagCounter() {
    this.analysticStore.setTagCounter(
      getTagCounter(this.userStore.ownedGameDatas),
    );
  }
  setTagList() {
    this.analysticStore.setTagList(
      getTagList(this.analysticStore.tagCounter),
    );
  }
  setGenresCounter() {
    this.analysticStore.setGenresCounter(
      getGenresCounter(this.userStore.ownedGameDatas),
    );
  }
  setGenres() {
    this.analysticStore.setGenres(
      getGenres(this.userStore.ownedGameDatas),
    );
  }
  genTable(gameDatas: GameData[]) {
    this.analysticStore.setGameTable(
      genTable(gameDatas),
    );
  }
}

export default new AnalyticService(rootStore.userStore, rootStore.analyticStore);
