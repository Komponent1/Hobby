import { useEffect, useState } from 'react';
import { GameData } from '../dto/steam.dto.game';
import { getUnplayedGamesPrice } from '../analystic/steam.analystic.sumarry';

export const useAnalyzePrice = (gameDatas: GameData[]) => {
  const [unplayedGamesPrice, setUnplayedGamesPrice] = useState<number>(0);

  useEffect(() => {
    if (gameDatas.length === 0) return;
    setUnplayedGamesPrice(getUnplayedGamesPrice(gameDatas));
  }, [gameDatas]);

  return { unplayedGamesPrice };
};
