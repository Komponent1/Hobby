import {GameData, Genre, GenrePercentage} from '../dto/steam.dto.game';

export const getGenres = (gameDatas: GameData[]) => {
  const genres: {id: number; description: string}[] = [];

  gameDatas.forEach((gameData) => {
    if (gameData.system_data) {
      gameData.system_data.genres.forEach((genre) => {
        const found = genres.find((g) => g.id === genre.id);
        if (!found) {
          genres.push(genre);
        }
      });
    }
  });
  return genres;
};
export const getGenresCounter = (gameDatas: GameData[]) => {
  const genresCounter = new Map<number, number>();
  gameDatas.forEach((gameData) => {
    if (gameData.system_data) {
      gameData.system_data.genres.forEach((genre) => {
        if (genresCounter.has(genre.id)) {
          genresCounter.set(genre.id, genresCounter.get(genre.id) as number + 1);
        } else {
          genresCounter.set(genre.id, 1);
        }
      });
    }
  });
  return genresCounter;
};
export const analyzeGenrePercent = (
  genresCounter: Map<number, number>,
  genres: Genre[],
): GenrePercentage[] => {
  const percentage: GenrePercentage[] = [];
  const total = Array.from(genresCounter.values()).reduce((acc, cur) => acc + cur, 0);
  genres.forEach((genre) => {
    const count = genresCounter.get(genre.id) || 0;
    const percent = (count / total) * 100;
    percentage.push({
      id: genre.id,
      description: genre.description,
      count,
      percent,
    });
  });
  percentage.sort((a, b) => b.percent - a.percent);

  return percentage;
};
