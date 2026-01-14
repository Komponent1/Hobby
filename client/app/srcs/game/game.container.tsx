import { ThemeProvider } from "@seolim/designsystem";
import React from "react";
import GamePage from "./game.page";

const GameContainer: React.FC = () => (
    <ThemeProvider>
      <GamePage />
    </ThemeProvider>
  );

export default GameContainer;
