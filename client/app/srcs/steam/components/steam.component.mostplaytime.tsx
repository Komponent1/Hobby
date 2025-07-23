import React, { useMemo } from 'react';
import { GameData } from '../dto/steam.dto.game';

type Props = {
  free: boolean;
  mostPlayedGame: GameData;
};
const MostPlayedGame: React.FC<Props> = ({ free, mostPlayedGame }) => {
  const hours = useMemo(
    () => Math.floor(mostPlayedGame.personal_data.playtime_forever / 60),
    [mostPlayedGame],
  );

  return (
    <div className="text-white text-2xl font-bold relative z-10 justify-between items-center flex flex-col h-full p-6 text-shadow">
      <h1>{free ? '무료 최다 플레이 게임' : '유료 최다 플레이 게임'}</h1>
      <div>
        <h1 className="text-4xl">
          {mostPlayedGame.system_data.name}
        </h1>
      </div>
      <p>
        {`${hours} 시간+`}
      </p>
    </div>
  );
};

export default MostPlayedGame;
