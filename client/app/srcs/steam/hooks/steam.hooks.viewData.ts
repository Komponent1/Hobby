import {useMemo} from 'react';
import {getAllPlayTime, getMostPlayTimeGame, getTotalPrice} from '../analystic/steam.analystic.sumarry';
import {GameData} from '../dto/steam.dto.game';

export const useViewData = (gameDatas: GameData[]) => {
  const mostPlayedGame = useMemo(() => getMostPlayTimeGame(gameDatas), [gameDatas]);
  const allPlayTime = useMemo(() => getAllPlayTime(gameDatas), [gameDatas]);
  const totalPrice = useMemo(() => getTotalPrice(gameDatas), [gameDatas]);

  return {
    mostPlayedGame,
    allPlayTime,
    totalPrice,
  };
};
