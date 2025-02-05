'use client';

import React from 'react';
import { InformationList } from "./dto/informations";
import { useGetData } from "./hooks/informations.hooks.getData";
import { useSearch } from "./hooks/informations.hooks.search";
import Navbar from "../common/common.components/common.components.navbar";
import Autocomplete from "./components/informations.components.autocomplete";
import Accordion from "./components/informations.components.accordion";

type Props = {
  informations: InformationList[];
};
const InformationPage: React.FC<Props> = ({informations}) => {
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
        <Accordion
          informations={filteredInformation}
          openId={openId}
          open={open}
          close={close}
        />
      </main>
    </div>
  );
};
export default InformationPage;
