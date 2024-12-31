import React, {useState} from 'react';
import { observer } from 'mobx-react';
import {useGetData} from './hooks/steam.hooks.getData';
import SteamViewMain from './view/steam.view.main';
import {PageKey} from './steam.enum';
import SteamViewBoard from './view/steam.view.board';
import SteamViewLoading from './view/steam.view.loading';

const SteamPage: React.FC = observer(() => {
  const [currentPage, setCurrentPage] = useState<PageKey>(PageKey.MAIN);
  const {ownedGameDatas, getDataWithSteamCode, loadRange} = useGetData(setCurrentPage);

  switch (currentPage) {
    case PageKey.MAIN:
      return <SteamViewMain getDataWithSteamCode={getDataWithSteamCode} />;
    case PageKey.BOARD:
      return <SteamViewBoard owedGameDatas={ownedGameDatas} />;
    case PageKey.LOADING:
      return <SteamViewLoading loadRange={loadRange} />;
    default:
      return <SteamViewMain getDataWithSteamCode={getDataWithSteamCode} />;
  }
});

export default SteamPage;
