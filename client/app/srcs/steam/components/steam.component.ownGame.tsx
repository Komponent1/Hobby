import React, { useMemo } from 'react';
import { GameData } from '../dto/steam.dto.game';

type Props = {
  ownedGameDatas: GameData[];
};
const OwnGame: React.FC<Props> = ({ ownedGameDatas }) => {
  const free = useMemo(
    () => ownedGameDatas.filter((game) => game.system_data.is_free).length,
    [ownedGameDatas],
  );
  const priced = useMemo(
    () => ownedGameDatas.filter((game) => !game.system_data.is_free).length,
    [ownedGameDatas],
  );
  return (
    <div className="text-white text-2xl font-bold relative z-10 justify-between items-center flex flex-col h-full p-6 text-shadow">
      <h1>보유한 게임 수</h1>
      <div>
        <h1 className="text-5xl">
          {`${priced + free} 개`}
        </h1>
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center items-center mr-4">
          <p className="text-green-500">유료</p>
          <p className="text-green-500">{priced}</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-red-500">무료</p>
          <p className="text-red-500">{free}</p>
        </div>
      </div>
    </div>
  );
};

export default OwnGame;
