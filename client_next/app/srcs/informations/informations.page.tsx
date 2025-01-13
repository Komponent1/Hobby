/* eslint-disable react/no-danger */
import React, { useCallback, useEffect, useState } from 'react';
import "highlight.js/styles/a11y-dark.css";
import { InformationList } from './dto/informations';
import Navbar from "../common/common.components/common.components.navbar";
import { useStores } from "./store/informations.store.root";
import Accordion from "./components/informations.components.accordion";
import Autocomplete from './components/informations.components.autocomplete';

type Props = {
  informations: InformationList[];
};
const InformationsPage: React.FC<Props> = ({informations}) => {
  const {informationStore, tagStore} = useStores();
  const {
    openId, informationList, open, close, init: initInformation,
  } = informationStore;
  const {tags, init: initTags} = tagStore;
  const [filteredInformation, setFilteredInformation] = useState<InformationList[]>(
    informationList,
  );
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [text, setText] = useState<string>('');
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

  useEffect(() => {
    initInformation(informations);
    initTags(informations);
    setFilteredInformation(informations);
  }, [informations, initInformation, initTags]);

  const search = useCallback((inputText: string) => {
    setSearchTags((data) => ([...data, inputText]));
  }, []);
  const deleteSearchTag = useCallback((closeText: string) => {
    setSearchTags((data) => data.filter((tag) => tag !== closeText));
  }, []);

  return (
    <div>
      <Navbar />
      <main className="mx-7 lg:mx-6 mt-32 mb-32 flex-grow">
        <Autocomplete
          text={text}
          setText={setText}
          search={search}
          searchTags={searchTags}
          tags={tags}
          deleteSearchTags={deleteSearchTag}
        />
        <Accordion informations={filteredInformation} openId={openId} open={open} close={close} />
      </main>
    </div>
  );
};
export default InformationsPage;
