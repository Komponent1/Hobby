import React from 'react';
import Image from 'next/image';
import { GameAnalysticData } from './dto/game';
import CodeInput from './components/steam.components.codeInput';
import {useGetData} from './hooks/steam.hooks.getData';

type Props = {
  gameDatas: GameAnalysticData[];
};const SteamPage: React.FC<Props> = () => {
  const {games, getDataWithSteamCode} = useGetData();

  return (
    <div>
      <CodeInput onSubmit={getDataWithSteamCode} />
      {games.map((game) => <Image src={game.photoUrl} width={200} height={200} key={game.appid} alt="no photo" />)}
    </div>
  );
};

export default SteamPage;
