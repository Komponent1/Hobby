/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { GameAnalysticData } from '../dto/game';
import { OwnedGames } from '../dto/steam.api..dto';
import { getOwnedGames } from '../steam.api/steam.api.user';
import { TagParsingException } from '../steam.api/steam.exception';
import {
  getAppName, getAppPhoto, getCategories, getGameHtmlDOM, getTags,
} from '../utils/steam.util.crawling';
import { splitDataSet } from '../utils/steam.util.game';

class GameDataService {
  public games: OwnedGames[] | null = null;
  public analysisData: GameAnalysticData[] | null = null;

  async load(userId: number) {
    try {
      const response = await getOwnedGames(String(userId));
      this.games = response.response.games;
    } catch (err) {
      /** TODO: Error 처리 */
    }
  }

  async processingDataToAnalysis() {
    try {
      if (this.games === null) {
        /** 예외 처리 필요 */
        return;
      }
      const crawlingData = [];
      const splitSet = splitDataSet(this.games);
      for (const set of splitSet) {
        const gameDataWihtTags = await Promise.all(
          set.map((game) => this.getAnalysisData(game)),
        );
        crawlingData.push(...gameDataWihtTags.flat().filter((e) => e !== undefined));
      }
    } catch (err) {
    }
  }

  private async crawling(appid: number) {
    try {
      const dom = await getGameHtmlDOM(appid);

      const photoUrl = getAppPhoto(appid) as string;
      const categories = getCategories(dom);
      const name = getAppName(dom) as string;
      const tags = getTags(categories);

      return {
        photoUrl,
        categories,
        name,
        tags,
      };
    } catch (err) {
      throw new TagParsingException();
    }
  }
  private async generateCrawlingData(game: OwnedGames) {
    const { appid, playtime_forever: playtime } = game;
    const {
      photoUrl, categories, name, tags,
    } = await this.crawling(appid);
    return {
      appid,
      playtime,
      photoUrl,
      categories,
      name,
      tags,
    };
  }
  private generateTagVector() {
    
  }
}

export default new GameDataService();
