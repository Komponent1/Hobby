import { createContext, useContext } from 'react';
import { GameStore } from './store.user';

class RootStore {
  readonly gameStore: GameStore;

  constructor() {
    this.gameStore = new GameStore();
  }
}

const rootStore = new RootStore();
export default rootStore;
export const StoreContext = createContext(rootStore);
export const useStores = () => useContext(StoreContext);
