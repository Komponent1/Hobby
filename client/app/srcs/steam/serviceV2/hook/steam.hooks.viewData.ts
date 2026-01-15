import { useMemo } from "react";
import {
  getAllPlayTime,
  getMostPlayTimeGame,
  getTotalPrice,
} from "../../analystic/steam.analystic.sumarry";
import { GameData } from "../../dto/steam.dto.game";

export const useViewData = (gameDatas: GameData[]) => {
  const freeMostPlayedGame = useMemo(
    () => getMostPlayTimeGame(gameDatas, "free"),
    [gameDatas]
  );
  const paidMostPlayedGame = useMemo(
    () => getMostPlayTimeGame(gameDatas, "paid"),
    [gameDatas]
  );
  const allPlayTime = useMemo(() => getAllPlayTime(gameDatas), [gameDatas]);
  const totalPrice = useMemo(() => getTotalPrice(gameDatas), [gameDatas]);

  return {
    freeMostPlayedGame,
    paidMostPlayedGame,
    allPlayTime,
    totalPrice,
  };
};
