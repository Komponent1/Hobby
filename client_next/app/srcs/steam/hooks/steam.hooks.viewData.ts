import {useMemo} from 'react';
import {getAllPlayTime, getMostPlayTimeGame} from '../analystic/steam.analystic.sumarry';
import {GameData} from '../dto/steam.dto.game';

export const useViewData = (gameDatas: GameData[]) => {
  const mostPlayedGame = useMemo(() => getMostPlayTimeGame(gameDatas), [gameDatas]);
  const allPlayTime = useMemo(() => getAllPlayTime(gameDatas), [gameDatas]);

  return {
    mostPlayedGame,
    allPlayTime,
  };
};
