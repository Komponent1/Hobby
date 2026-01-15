import {
  getGenres,
  getGenresCounter,
} from "../../analystic/steam.analystic.genres";
import { genTable } from "../../analystic/steam.analystic.table";
import { getTagList, getTagCounter } from "../../analystic/steam.analystic.tag";
import { GameData } from "../../dto/steam.dto.game";
import { AnalyticStore } from "../../store/store.analystic";
import rootStore from "../../store/store.root";

class AnalyticService {
  constructor(private analysticStore: AnalyticStore) {}

  setTagCounter(ownedGameDatas: GameData[]) {
    this.analysticStore.setTagCounter(getTagCounter(ownedGameDatas));
  }
  setTagList() {
    this.analysticStore.setTagList(getTagList(this.analysticStore.tagCounter));
  }
  setGenresCounter(ownedGameDatas: GameData[]) {
    this.analysticStore.setGenresCounter(getGenresCounter(ownedGameDatas));
  }
  setGenres(ownedGameDatas: GameData[]) {
    this.analysticStore.setGenres(getGenres(ownedGameDatas));
  }
  genTable(gameDatas: GameData[]) {
    this.analysticStore.setGameTable(genTable(gameDatas));
  }
}

const analyticServiceInstance = new AnalyticService(rootStore.analyticStore);
export default analyticServiceInstance;
