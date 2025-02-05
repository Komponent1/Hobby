import { useCallback, useEffect, useState } from "react";
import { GameData, GameTable } from "../dto/steam.dto.game";
import { useStores } from "../store/store.root";
import analysticService from "../service/steam.service.analysitic";

export const TABLE_VIEW_NUM = 5;
export enum SortOrder {
  ASC = 1,
  DESC = -1,
}
export const useGetTable = (gameDatas: GameData[]) => {
  const {analyticStore} = useStores();
  const {gameTable} = analyticStore;
  const [viewData, setViewDatas] = useState<GameTable[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);

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
    if (gameTable.length === 0) return;
    if (!Object.keys(gameTable[0][key]).includes('sort')) return;
    const sorted = gameTable.sort((a, b) => {
      if ((a[key] as any).sort > (b[key] as any).sort) return sortOrder === SortOrder.ASC ? 1 : -1;
      if ((a[key] as any).sort < (b[key] as any).sort) return sortOrder === SortOrder.ASC ? -1 : 1;
      return 0;
    });
    setViewDatas(sorted.slice(0, TABLE_VIEW_NUM));
    setSortOrder(sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC);
  }, [gameTable, sortOrder]);

  return {
    gameTable,
    viewData,
    setDataIndex,
    sortData,
    sortOrder,
  };
};
