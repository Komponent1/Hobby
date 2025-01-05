import {useEffect, useMemo} from 'react';
import analysticService from '../service/steam.service.analysitic';
import {useStores} from '../store/store.root';
import {getAllPlayTime, getMostPlayTimeGame} from '../analystic/sumarry';
import {GameData} from '../dto/steam.dto.game';

export const useViewData = (gameDatas: GameData[]) => {
  const { analyticStore } = useStores();
  const { tagList, tagCounter } = analyticStore;

  const mostPlayedGame = useMemo(() => getMostPlayTimeGame(gameDatas), [gameDatas]);
  const allPlayTime = useMemo(() => getAllPlayTime(gameDatas), [gameDatas]);
  const mostPlayedTag = useMemo(() => {
    if (tagCounter.size === 0) return [];
    const tagArray = Array.from(tagCounter, ([tag, count]) => ({ tag, count }));
    tagArray.sort((a, b) => b.count - a.count);
    return tagArray;
  }, [tagCounter]);

  useEffect(() => {
    if (gameDatas.length === 0) return;
    analysticService.setTagCounter();
    analysticService.setTagList();
  }, [gameDatas]);

  const tagListWithCount = tagList.map((tag) => ({
    tag,
    count: tagCounter.get(tag),
  }));

  return {
    mostPlayedGame,
    allPlayTime,
    tagListWithCount,
    mostPlayedTag,
  };
};
