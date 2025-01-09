import { createContext, useContext } from 'react';
import { UserStore } from './store.user';
import {AnalyticStore} from './store.analystic';

class RootStore {
  readonly userStore: UserStore;
  readonly analyticStore: AnalyticStore;

  constructor() {
    this.userStore = new UserStore();
    this.analyticStore = new AnalyticStore();
  }
}

const rootStore = new RootStore();
export default rootStore;
export const StoreContext = createContext(rootStore);
export const useStores = () => useContext(StoreContext);
