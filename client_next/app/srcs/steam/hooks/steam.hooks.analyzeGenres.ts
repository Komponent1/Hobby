import {useEffect, useMemo} from 'react';
import {GameData} from '../dto/steam.dto.game';
import {useStores} from '../store/store.root';
import analysticService from '../service/steam.service.analysitic';
import {analyzeGenrePercent} from '../analystic/steam.analystic.genres';

export const useAnalyzeGenres = (gameDatas: GameData[]) => {
  const { analyticStore } = useStores();
  const { genresCounter, genres } = analyticStore;

  const genrePercentage = useMemo(
    () => analyzeGenrePercent(genresCounter, genres),
    [genresCounter, genres],
  );
  useEffect(() => {
    if (gameDatas.length === 0) return;
    analysticService.setGenres();
    analysticService.setGenresCounter();
  }, [gameDatas]);

  return {
    genres,
    genresCounter,
    genrePercentage,
  };
};
