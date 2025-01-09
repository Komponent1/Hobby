import rootStore from '../store/store.root';
import { UserStore } from '../store/store.user';
import { getGameData } from '../utils/steam.util.game';

class UserGameService {
  constructor(
    private userStore: UserStore,
  ) {}

  async loadPlayerSummaries(steamid: string) {
    try {
      const response = await fetch(`/api/steam/player_summarries?steamid=${steamid}`);
      const rawData = await response.json();
      this.userStore.setPlayerSummaries(rawData);
    } catch (err) {
      /** TODO: Error 처리 */
    }
  }

  async loadOwendGame(steamid: string) {
    try {
      const response = await fetch(`/api/steam/owned_steam_games?steamid=${steamid}`);
      const rawData = await response.json();
      this.userStore.setOwnedGame(rawData.games);
    } catch (err) {
      /** TODO: Error 처리 */
    }
  }

  async loadGameDataFromWebPage() {
    try {
      const gameDatas = await getGameData(this.userStore.ownedGames);
      this.userStore.setOwnedGameData(gameDatas);
    } catch (err) {
      /** TODO: Error 처리 */
    }
  }
}

export default new UserGameService(rootStore.userStore);
