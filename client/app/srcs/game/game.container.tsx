import { ThemeProvider } from "@seolim/designsystem";
import React from "react";
import GamePage from "./game.page";

const GameContainer: React.FC = () => {
  return (
    <ThemeProvider>
      <GamePage />
    </ThemeProvider>
  );
};

export default GameContainer;
