import React from 'react';
import Image from "next/image";
import { useRouter } from "next/router";
import GameList from './game-list.json';
import Navbar from "../common/common.components/common.components.navbar";
import FlipCard from "../main/components/main.components.flipcard";

type GameConfig = {
  [key: string]: {
    title: string;
    path: string;
    description: string;
    thumbnail: string;
  }
};

const GamePage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-cover bg-center min-h-screen w-screen bg-linear-to-tr from-slate-600 to-slate-900 pt-32 px-12">
      <Navbar />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4 auto-rows-auto">
        {Object.values(GameList as GameConfig).map((game) => (
          <FlipCard
            key={game.path}
            front={(
              <div className="">
                <Image
                  key={game.path}
                  src={game.thumbnail}
                  alt={game.title}
                  width={200}
                  height={200}
                  className="object-cover"
                />
                <h2 className="text-white mt-3">{game.title}</h2>
              </div>
          )}
            customClass="group w-64 h-72"
            back={(
              <div className="text-white">
                <p>{game.description}</p>
              </div>
          )}
            onClick={() => router.push(game.path)}
          />
        ))}
      </div>
    </div>
  );
};

export default GamePage;
