import rootStore from '../store/store.root';
import { GameStore } from '../store/store.user';
import { getGameData } from '../utils/steam.util.game';

class UserGameService {
  constructor(
    private gameStore: GameStore,
  ) {}

  async loadPlayerSummaries(steamid: string) {
    try {
      const response = await fetch(`/api/steam/player_summarries?steamid=${steamid}`);
      const rawData = await response.json();
      this.gameStore.setPlayerSummaries(rawData);
    } catch (err) {
      /** TODO: Error 처리 */
    }
  }

  async loadOwendGame(steamid: string) {
    try {
      const response = await fetch(`/api/steam/owned_steam_games?steamid=${steamid}`);
      const rawData = await response.json();
      this.gameStore.setOwnedGame(rawData.games);
    } catch (err) {
      /** TODO: Error 처리 */
    }
  }

  async loadGameDataFromWebPage() {
    try {
      const gameDatas = await getGameData(this.gameStore.ownedGames);
      this.gameStore.setOwnedGameData(gameDatas);
    } catch (err) {
      /** TODO: Error 처리 */
    }
  }
}

export default new UserGameService(rootStore.gameStore);
