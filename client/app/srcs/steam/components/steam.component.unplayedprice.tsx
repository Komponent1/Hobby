import React from 'react';
import { num2wonComma } from '../utils/steam.util.string';
import { GameData } from '../dto/steam.dto.game';

type Props = {
  unplayedGames: GameData[];
  totalUnplayedPrice: number;
};
const UnplayedGame: React.FC<Props> = ({ unplayedGames, totalUnplayedPrice }) => (
  <div className="text-white text-2xl font-bold relative z-10 items-center flex flex-col h-full p-6 text-shadow">
    <h1>플레이하지 않은 게임</h1>
    <div className="mt-10">
      <h1 className="text-5xl">
        {`${unplayedGames.length}개`}
      </h1>
    </div>
    <h1 className="text-5xl mt-2">{`${num2wonComma(totalUnplayedPrice / 100)}`}</h1>
  </div>
);

export default UnplayedGame;
