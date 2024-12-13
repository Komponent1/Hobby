import React from 'react';
import rootStore, { StoreContext } from './store/store.root';

const SteamPageContainer: React.FC = () => (
  <StoreContext.Provider value={rootStore}>
    <SteamPageContainer />
  </StoreContext.Provider>
);
