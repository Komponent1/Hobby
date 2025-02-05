'use client';

import React from 'react';
import rootStore, { StoreContext } from './store/store.root';
import SteamPage from './steam.page';

export const SteamContainer: React.FC = () => (
  <StoreContext.Provider value={rootStore}>
    <SteamPage />
  </StoreContext.Provider>
);
