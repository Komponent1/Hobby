import React from 'react';
import Image from 'next/image';
import { observer } from 'mobx-react';
import CodeInput from './components/steam.components.codeInput';
import {useGetData} from './hooks/steam.hooks.getData';

const SteamPage: React.FC = observer(() => {
  const {ownedGameDatas, getDataWithSteamCode} = useGetData();

  return (
    <div>
      <CodeInput onSubmit={getDataWithSteamCode} />
      {ownedGameDatas.map((game) => <Image src={game.photoUrl} width={200} height={200} key={game.appid} alt="no photo" />)}
    </div>
  );
});

export default SteamPage;
