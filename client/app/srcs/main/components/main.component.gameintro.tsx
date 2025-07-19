import React, { useMemo } from 'react';
import Image from 'next/image';
import GameJson from '../../game/game-list.json';
import FlipCard from './main.components.flipcard';

type Props = {
  onLink: (path: string) => void;
};
const GameIntro: React.FC<Props> = ({ onLink }) => {
  const GameList = useMemo(() => Object.values(GameJson).splice(-3).reverse(), []);

  return (
    <div className="flex">
      <FlipCard
        front={(
          <div className="flex flex-col items-center h-full justify-center">
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-white">
              게임
            </h1>
          </div>
        )}
        back={(
          <div className="flex flex-col items-center h-full justify-center">
            <p className="font-normal text-gray-400">
              게임 저장소
            </p>
          </div>
        )}
        onClick={() => onLink('/game')}
      />
      <div className="flex-col justify-center items-start ml-4 hidden lg:flex">
        <h2 className="mb-4 text-xl font-bold tracking-tight text-white">
          게임 목록
        </h2>
        <div className="flex flex-row">
          {GameList.map((game) => (
            <div key={game.title} className="mb-2 mr-4">
              <a
                href={`${game.path}`}
                className="text-gray-400 hover:text-white"
              >
                <figure style={{width: '150px', height: '80px', position: 'relative'}}>
                  <Image
                    src={game.thumbnail}
                    alt={game.title}
                    layout="fill"
                    objectFit="cover"
                    className="inline-block mr-2"
                    style={{borderRadius: '8px'}}
                  />
                </figure>
                <p className="text-center mt-1">{game.title}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameIntro;
