/* eslint-disable react/no-danger */
import React, { useCallback, useEffect, useState } from 'react';
import "highlight.js/styles/a11y-dark.css";
import { InformationList } from './dto/informations';
import Navbar from "../common/common.components/common.components.navbar";
import { useStores } from "./store/informations.store.root";
import Accordion from "./components/informations.components.accordion";
import SearchInput from "./components/informations.components.searchInput";

type Props = {
  informations: InformationList[];
};
const InformationsPage: React.FC<Props> = ({informations}) => {
  const {informationStore, tagStore} = useStores();
  const {
    openId, informationList, open, close, init: initInformation,
  } = informationStore;
  const {init: initTags} = tagStore;

  useEffect(() => {
    initInformation(informations);
    initTags(informations);
  }, [informations, initInformation, initTags]);

  const [filteredInformation, setFilteredInformation] = useState<InformationList[]>(
    informationList,
  );
  const [searchTag, setSearchTag] = useState<string>('');
  const search = useCallback((text: string) => {
    if (text === '') {
      setFilteredInformation(informationList);
    } else {
      setFilteredInformation(
        informationList.filter((information) => information.information.tags.includes(text)),
      );
    }
  }, [informationList]);

  return (
    <div>
      <Navbar />
      <main className="mx-7 lg:mx-6 mt-32 mb-32 flex-grow">
        <SearchInput searchTag={searchTag} setSearchTag={setSearchTag} search={search} />
        <Accordion informations={filteredInformation} openId={openId} open={open} close={close} />
      </main>
    </div>
  );
};
export default InformationsPage;
