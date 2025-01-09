import React, {useState} from 'react';
import { observer } from 'mobx-react';
import {useGetData} from './hooks/steam.hooks.getData';
import SteamViewMain from './view/steam.view.main';
import {PageKey} from './steam.enum';
import SteamViewBoard from './view/steam.view.board';
import SteamViewLoading from './view/steam.view.loading';
import Navbar from '../common/common.components/common.components.navbar';

const SteamPage: React.FC = observer(() => {
  const [currentPage, setCurrentPage] = useState<PageKey>(PageKey.MAIN);
  const {ownedGameDatas, getDataWithSteamCode, loadRange} = useGetData(setCurrentPage);

  return (
    <div>
      <Navbar />
      {currentPage === PageKey.MAIN
        && <SteamViewMain getDataWithSteamCode={getDataWithSteamCode} />}
      {currentPage === PageKey.BOARD
        && <SteamViewBoard owedGameDatas={ownedGameDatas} />}
      {currentPage === PageKey.LOADING
        && <SteamViewLoading loadRange={loadRange} />}
    </div>
  );
});

export default SteamPage;
