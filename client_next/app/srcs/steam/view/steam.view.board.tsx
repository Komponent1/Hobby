import React from 'react';
import Image from 'next/image';
import {GameData} from '../dto/steam.dto.game';
import {useViewData} from '../hooks/steam.hooks.viewData';
import {Typography} from '../../common/common.components';

type Props = {
  owedGameDatas: GameData[];
};
const SteamViewBoard: React.FC<Props> = ({
  owedGameDatas,
}) => {
  const {mostPlayedGame, allPlayTime, mostPlayedTag} = useViewData(owedGameDatas);
  return (
    <div className="bg-gradient-to-tr from-slate-600 to-slate-900 min-h-screen w-screen grid place-items-center">
      <div className="">
        <Typography type="h6" color="text-white">
          {`총 플레이 타임: ${Math.floor(allPlayTime / 60)} 시간`}
        </Typography>
        <Typography type="h6" color="text-white">
          {`가장 많이 플레이한 게임: ${mostPlayedGame.system_data.name}(${Math.floor(mostPlayedGame.personal_data.playtime_forever / 60)}시간)`}
        </Typography>
        <Typography type="h6" color="text-white">
          {`가장 많이 플레이한 태그: ${mostPlayedTag[0].tag}`}
        </Typography>
        {owedGameDatas.map((game) => (
          <Image
            src={game.crawling_data?.photoUrl as string}
            width={200}
            height={200}
            key={game.system_data.steam_appid}
            alt={game.system_data.name}
          />
        ))}
      </div>
    </div>
  );
};
export default SteamViewBoard;
