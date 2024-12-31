import React from 'react';
import Image from 'next/image';
import {GameData} from '../dto/game';

type Props = {
  owedGameDatas: GameData[];
};
const SteamViewBoard: React.FC<Props> = ({
  owedGameDatas,
}) => (
  <div className="bg-gradient-to-tr from-slate-600 to-slate-900 min-h-screen w-screen grid place-items-center">
    <div className="">
      {owedGameDatas.map((game) => <Image src={game.photoUrl} width={200} height={200} key={game.appid} alt="no photo" />)}
    </div>
  </div>
);
export default SteamViewBoard;
