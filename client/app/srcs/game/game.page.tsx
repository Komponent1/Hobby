import React, { useCallback } from "react";
import { useRouter } from "next/router";
import GameList from "./game-list.json";
import Navbar from "../common/common.components/common.components.navbar";
import GameCard from "./component/game.component.gamecard";

export type GameConfig = {
  [key: string]: {
    title: string;
    path: string;
    description: string;
    thumbnail: string;
  };
};

const GamePage: React.FC = () => {
  const router = useRouter();
  const onClick = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  return (
    <div className="bg-cover bg-center w-screen bg-linear-to-tr from-slate-600 to-slate-900 min-h-screen">
      <Navbar />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 auto-rows-auto p-10">
        {Object.values(GameList as GameConfig).map((game) => (
          <GameCard
            key={game.path}
            {...game}
            onLink={() => onClick(game.path)}
          />
        ))}
      </div>
    </div>
  );
};

export default GamePage;
