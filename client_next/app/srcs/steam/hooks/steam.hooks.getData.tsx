import gameDataService from '../service/steam.service.userGame';
import { useStores } from '../store/store.root';

export const useGetData = () => {
  const {gameStore} = useStores();
  const {ownedGames, ownedGameDatas} = gameStore;

  const getDataWithSteamCode = async (steamid: string) => {
    await gameDataService.load(steamid);
    await gameDataService.loadGameDataFromWebPage();
  };

  return {ownedGames, ownedGameDatas, getDataWithSteamCode};
};
