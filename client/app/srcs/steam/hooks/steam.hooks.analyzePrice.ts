import { useEffect, useState } from 'react';
import { GameData } from '../dto/steam.dto.game';
import { getUnplayedGames, getUnplayedGamesPrice } from '../analystic/steam.analystic.sumarry';

export const useAnalyzeUnplayedGame = (gameDatas: GameData[]) => {
  const [unplayedGames, setUnplayedGames] = useState<GameData[]>([]);
  const [unplayedGamesPrice, setUnplayedGamesPrice] = useState<number>(0);

  useEffect(() => {
    if (gameDatas.length === 0) return;
    setUnplayedGames(getUnplayedGames(gameDatas));
  }, [gameDatas]);
  useEffect(() => {
    if (unplayedGames.length === 0) return;
    setUnplayedGamesPrice(getUnplayedGamesPrice(unplayedGames));
  }, [unplayedGames]);

  return { unplayedGames, unplayedGamesPrice };
};
