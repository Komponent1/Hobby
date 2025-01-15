import { useEffect } from "react";
import { GameData } from "../dto/steam.dto.game";
import { useStores } from "../store/store.root";
import analysticService from "../service/steam.service.analysitic";

export const useGetTable = (gameDatas: GameData[]) => {
  const {analyticStore} = useStores();
  const {gameTable} = analyticStore;

  useEffect(() => {
    if (gameDatas.length === 0) return;
    analysticService.genTable(gameDatas);
  }, [gameDatas]);

  return {
    gameTable,
  };
};
