import React, { useCallback } from 'react';
import Image from "next/image";
import { useRouter } from "next/router";
import GameList from './game-list.json';
import Navbar from "../common/common.components/common.components.navbar";
import { SimpleCard } from '../main/components/main.component.simplecard';

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
  const onClick = useCallback((path: string) => {
    router.push(path);
  }, [router]);

  return (
    <div className="bg-cover bg-center min-h-screen w-screen bg-linear-to-tr from-slate-600 to-slate-900 pt-32 px-12">
      <Navbar />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4 auto-rows-auto">
        {Object.values(GameList as GameConfig).map((game) => (
          <SimpleCard
            title={game.title}
            description={game.description}
            key={game.path}
            etc={(
              <div className="">
                <Image
                  key={game.path}
                  src={game.thumbnail}
                  alt={game.title}
                  width={300}
                  height={300}
                  className="object-cover"
                />
              </div>
            )}
            onLink={() => onClick(game.path)}
          />
        ))}
      </div>
    </div>
  );
};

export default GamePage;
