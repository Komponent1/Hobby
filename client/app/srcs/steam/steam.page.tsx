/* eslint-disable no-alert */
import React from "react";
import { observer } from "mobx-react";
import SteamViewMain from "./view/steam.view.main";
import SteamViewBoard from "./view/steam.view.board";
import SteamViewLoading from "./view/steam.view.loading";
import Navbar from "../common/common.components/common.components.navbar";
import { useGame } from "./serviceV2/hook/steam.hook.game";

const SteamPage: React.FC = observer(() => {
  const { setSteamid, gameDetails, playerSummary, range, isPending } =
    useGame();

  const shouldShowMain = !playerSummary || !gameDetails;
  const shouldShowBoard = playerSummary && gameDetails.length > 0 && !isPending;

  return (
    <div>
      <Navbar navbarType="fixed" />
      {shouldShowMain && <SteamViewMain onSubmit={setSteamid} />}
      {isPending && !shouldShowMain && <SteamViewLoading loadRange={range} />}
      {shouldShowBoard && (
        <SteamViewBoard
          owedGameDatas={gameDetails}
          playerSummary={playerSummary}
        />
      )}
    </div>
  );
});

export default SteamPage;
