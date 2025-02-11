/* eslint-disable react/no-danger */
import React from 'react';
import "highlight.js/styles/a11y-dark.css";
import { InformationList } from './dto/informations';
import Navbar from "../common/common.components/common.components.navbar";
import Accordion from "./components/informations.components.accordion";
import Autocomplete from './components/informations.components.autocomplete';
import {useGetData} from './hooks/informations.hooks.getData';
import {useSearch} from './hooks/informations.hooks.search';

type Props = {
  informations: InformationList[];
};
const InformationsPage: React.FC<Props> = ({informations}) => {
  const {
    informationList, openId, open, close, tags,
  } = useGetData(informations);
  const {
    text, setText, search, searchTags, deleteSearchTag, filteredInformation,
  } = useSearch({informationList, informations});

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
