import React, { useMemo } from 'react';
import Image from 'next/image';
import GameJson from '../../game/game-list.json';
import FlipCard from './main.components.flipcard';

type Props = {
  onLink: (path: string) => void;
};
const GameIntro: React.FC<Props> = ({ onLink }) => {
  const GameList = useMemo(() => Object.values(GameJson), []);

  return (
    <div className="flex">
      <FlipCard
        front={(
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-white">
            게임
          </h1>
        )}
        back={(
          <p className="font-normal text-gray-400">
            게임 저장소
          </p>
        )}
        onClick={() => onLink('/game')}
      />
      <div className="flex flex-col justify-center items-start ml-4">
        <h2 className="mb-4 text-xl font-bold tracking-tight text-white">
          최신 게임
        </h2>
        <div className="flex flex-row">
          {GameList.map((game) => (
            <div key={game.title} className="mb-2 mr-4">
              <a
                href={`${game.path}`}
                className="text-gray-400 hover:text-white"
              >
                <Image
                  src={game.thumbnail}
                  alt={game.title}
                  width={150}
                  height={150}
                  className="inline-block mr-2"
                />
                <p className="text-gray-400">{game.title}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameIntro;
