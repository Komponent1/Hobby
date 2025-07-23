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
      this.userStore.setPlayerSummaries(rawData.players[0]);
    } catch (err) {
      throw new Error('Failed to load player summaries');
    }
  }

  async loadOwendGame(steamid: string) {
    try {
      const response = await fetch(`/api/steam/owned_steam_games?steamid=${steamid}`);
      const rawData = await response.json();
      this.userStore.setOwnedGame(rawData.games);
    } catch (err) {
      throw new Error('Failed to load owned games');
    }
  }

  async loadGameDataFromWebPage() {
    try {
      const gameDatas = await getGameData(this.userStore.ownedGames);
      this.userStore.setOwnedGameData(gameDatas);
    } catch (err) {
      throw new Error('Failed to load game data from web page');
    }
  }
}

const userGameService = new UserGameService(rootStore.userStore);
export default userGameService;
