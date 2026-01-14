import React from "react";
import { ThemeProvider } from "@seolim/designsystem";
import rootStore, { StoreContext } from "./store/store.root";
import SteamPage from "./steam.page";

export const SteamPageContainer: React.FC = () => (
  <StoreContext.Provider value={rootStore}>
    <ThemeProvider>
      <SteamPage />
    </ThemeProvider>
  </StoreContext.Provider>
);
