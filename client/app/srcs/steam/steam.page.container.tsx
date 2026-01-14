import React from "react";
import rootStore, { StoreContext } from "./store/store.root";
import SteamPage from "./steam.page";
import { ThemeProvider } from "@seolim/designsystem";

export const SteamPageContainer: React.FC = () => (
  <StoreContext.Provider value={rootStore}>
    <ThemeProvider>
      <SteamPage />
    </ThemeProvider>
  </StoreContext.Provider>
);
