import {GameData} from '../dto/steam.dto.game';

export const getAllPlayTime = (game: GameData[]) => game.reduce(
  (acc, cur) => acc + cur.personal_data.playtime_forever,
  0,
);
export const getMostPlayTimeGame = (games: GameData[], type: 'free' | 'paid' | 'all' = 'all') => {
  let filterGames: GameData[] = [...games];
  switch (type) {
    case 'free':
      filterGames = games.filter((game) => game.system_data.is_free);
      break;
    case 'paid':
      filterGames = games.filter((game) => !game.system_data.is_free);
      break;
    default:
      break;
  }
  return filterGames.reduce(
    (acc, cur) => (
      acc.personal_data.playtime_forever > cur.personal_data.playtime_forever
        ? acc
        : cur
    ),
  );
};
export const getTotalPrice = (games: GameData[]) => games.map(
  (game) => (game.system_data.price_overview ? game.system_data.price_overview.initial : 0),
).reduce((acc, cur) => acc + cur);
export const getUnplayedGames = (games: GameData[]) => games.filter(
  (game) => game.personal_data.playtime_forever === 0,
);
export const getUnplayedGamesPrice = (unplayedGames: GameData[]) => unplayedGames
  .map((game) => (game.system_data.price_overview ? game.system_data.price_overview.initial : 0))
  .reduce(
    (acc, cur) => acc + cur,
    0,
  );
