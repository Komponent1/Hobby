/* eslint-disable no-alert */
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useGetData } from "./hooks/steam.hooks.getData";
import SteamViewMain from "./view/steam.view.main";
import { PageKey } from "./steam.enum";
import SteamViewBoard from "./view/steam.view.board";
import SteamViewLoading from "./view/steam.view.loading";
import Navbar from "../common/common.components/common.components.navbar";

const SteamPage: React.FC = observer(() => {
  const [currentPage, setCurrentPage] = useState<PageKey>(PageKey.MAIN);
  const {
    error,
    setError,
    playerSummary,
    ownedGameDatas,
    getDataWithSteamCode,
    loadRange,
  } = useGetData(setCurrentPage);

  useEffect(() => {
    if (error) {
      alert("An error occurred while fetching data. Please try again.");
      setError(false);
    }
  }, [error, setError]);

  return (
    <div>
      <Navbar navbarType="fixed" />
      {currentPage === PageKey.MAIN && (
        <SteamViewMain getDataWithSteamCode={getDataWithSteamCode} />
      )}
      {currentPage === PageKey.BOARD && (
        <SteamViewBoard
          owedGameDatas={ownedGameDatas}
          playerSummary={playerSummary}
        />
      )}
      {currentPage === PageKey.LOADING && (
        <SteamViewLoading loadRange={loadRange} />
      )}
    </div>
  );
});

export default SteamPage;
