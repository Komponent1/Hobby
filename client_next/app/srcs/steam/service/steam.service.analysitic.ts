import {getTagCounter, getTagList} from '../analystic/clustering';
import {AnalyticStore} from '../store/store.analystic';
import rootStore from '../store/store.root';
import {UserStore} from '../store/store.user';

class AnalyticService {
  constructor(
    private userStore: UserStore,
    private analysticStore: AnalyticStore,
  ) {}

  getPlayerInformation() {
    return this.userStore.playerSummaries;
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
}

export default new AnalyticService(rootStore.userStore, rootStore.analyticStore);
