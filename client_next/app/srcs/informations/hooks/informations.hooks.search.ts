import {useCallback, useEffect, useState} from 'react';
import {InformationList} from '../dto/informations';

export const useSearch = ({
  informations,
  informationList,
}: {
  informations: InformationList[];
  informationList: InformationList[];
}) => {
  const [filteredInformation, setFilteredInformation] = useState<InformationList[]>(
    informationList,
  );
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [text, setText] = useState<string>('');
  useEffect(() => {
    setFilteredInformation(informations);
  }, [informations]);
  useEffect(() => {
    if (searchTags.length === 0) {
      setFilteredInformation(informationList);
    } else {
      setFilteredInformation(
        informationList.filter(
          (information) => searchTags.every((tag) => information.information.tags.includes(tag)),
        ),
      );
    }
  }, [searchTags, informationList]);
  const search = useCallback((inputText: string) => {
    setSearchTags((data) => ([...data, inputText]));
  }, []);
  const deleteSearchTag = useCallback((closeText: string) => {
    setSearchTags((data) => data.filter((tag) => tag !== closeText));
  }, []);
  return {
    searchTags,
    text,
    setText,
    search,
    deleteSearchTag,
    filteredInformation,
  };
};
