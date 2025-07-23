import {useState} from 'react';
import gameDataService from '../service/steam.service.userGame';
import {LoadingRange, PageKey} from '../steam.enum';
import {useStores} from '../store/store.root';

export const useGetData = (
  setCurrentPage: (page: PageKey) => void,
) => {
  const [loadRange, setLoadRange] = useState<LoadingRange>(LoadingRange.PLAYER_SUMMARIES);
  const [error, setError] = useState<boolean>(false);
  const {userStore} = useStores();
  const {
    playerSummary, ownedGames, ownedGameDatas,
  } = userStore;

  const getDataWithSteamCode = async (steamid: string) => {
    if (steamid.trim() === '') return;

    try {
      setCurrentPage(PageKey.LOADING);
      setLoadRange(LoadingRange.PLAYER_SUMMARIES);
      await gameDataService.loadPlayerSummaries(steamid);
      setLoadRange(LoadingRange.OWNED_GAMES);
      await gameDataService.loadOwendGame(steamid);
      setLoadRange(LoadingRange.GAME_DATA);
      await gameDataService.loadGameDataFromWebPage();
      setLoadRange(LoadingRange.COMPLETE);
      setCurrentPage(PageKey.BOARD);
    } catch (err) {
      setError(true);
      setLoadRange(LoadingRange.PLAYER_SUMMARIES);
      setCurrentPage(PageKey.MAIN);
    }
  };

  return {
    error,
    setError,
    playerSummary,
    ownedGames,
    ownedGameDatas,
    getDataWithSteamCode,
    loadRange,
  };
};
