import {useEffect} from 'react';
import {useStores} from '../store/informations.store.root';
import {InformationList} from '../dto/informations';

export const useGetData = (informations: InformationList[]) => {
  const {informationStore, tagStore} = useStores();
  const {
    openId, informationList, open, close, init: initInformation,
  } = informationStore;
  const {tags, init: initTags} = tagStore;
  useEffect(() => {
    initInformation(informations);
    initTags(informations);
  }, [informations, initInformation, initTags]);

  return {
    openId,
    informationList,
    open,
    close,
    tags,
  };
};
