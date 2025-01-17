import { useCallback, useEffect, useState } from "react";
import { GameData, GameTable } from "../dto/steam.dto.game";
import { useStores } from "../store/store.root";
import analysticService from "../service/steam.service.analysitic";

export const TABLE_VIEW_NUM = 5;
export const useGetTable = (gameDatas: GameData[]) => {
  const {analyticStore} = useStores();
  const {gameTable} = analyticStore;
  const [viewData, setViewDatas] = useState<GameTable[]>([]);

  useEffect(() => {
    if (gameDatas.length === 0) return;
    analysticService.genTable(gameDatas);
  }, [gameDatas]);
  useEffect(() => {
    setViewDatas(gameTable.slice(0, TABLE_VIEW_NUM));
  }, [gameTable]);
  const setDataIndex = useCallback((index: number) => {
    setViewDatas(gameTable.slice((index - 1) * TABLE_VIEW_NUM, index * TABLE_VIEW_NUM));
  }, [gameTable]);

  const sortData = useCallback((key: keyof GameTable) => {
    const sorted = gameTable.sort((a, b) => {
      if (a[key].value > b[key].value) return 1;
      if (a[key].value < b[key].value) return -1;
      return 0;
    });
    setViewDatas(sorted.slice(0, TABLE_VIEW_NUM));
  }, [gameTable]);

  return {
    gameTable,
    viewData,
    setDataIndex,
    sortData,
  };
};
