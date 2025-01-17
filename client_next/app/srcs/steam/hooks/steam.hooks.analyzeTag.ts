import { useEffect, useMemo } from "react";
import { GameData } from "../dto/steam.dto.game";
import { useStores } from "../store/store.root";
import analysticService from '../service/steam.service.analysitic';
import { analyzeTagPercent } from "../analystic/steam.analystic.tag";

export const useAnalyzeTag = (gameDatas: GameData[]) => {
  const {analyticStore} = useStores();
  const {tagCounter} = analyticStore;

  const tagPercentage = useMemo(() => analyzeTagPercent(tagCounter), [tagCounter]);

  useEffect(() => {
    if (gameDatas.length === 0) return;
    analysticService.setTagCounter();
    analysticService.setTagList();
  }, [gameDatas]);

  return {
    tagPercentage,
  };
};
