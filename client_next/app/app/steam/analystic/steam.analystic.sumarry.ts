import {GameData} from '../dto/steam.dto.game';

export const getAllPlayTime = (game: GameData[]) => game.reduce(
  (acc, cur) => acc + cur.personal_data.playtime_forever,
  0,
);
export const getMostPlayTimeGame = (games: GameData[]) => games.reduce(
  (acc, cur) => (
    acc.personal_data.playtime_forever > cur.personal_data.playtime_forever
      ? acc
      : cur
  ),
);
export const getTotalPrice = (games: GameData[]) => games.map(
  (game) => (game.system_data.price_overview ? game.system_data.price_overview.final : 0),
).reduce((acc, cur) => acc + cur);
