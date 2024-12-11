import {useState} from 'react';
import {getGameData} from '../analystic/getGameData';
import { GameData } from '../dto/game';

export const useGetData = () => {
  const [games, setGames] = useState<GameData[]>([]);
  const getDataWithSteamCode = async (code: string) => {
    const raw = await fetch(`/api/owned_steam_games?steamid=${code}`);
    const ownedGamesRaw = await raw.json();
    const ownedGamesInfosRaw = await getGameData(ownedGamesRaw.response.games);

    setGames(ownedGamesInfosRaw);
  };

  return {games, getDataWithSteamCode};
};
