'use client';

import React from 'react';
import { InformationList } from "./dto/informations";
import ContextProvider from "./store/informations.store.root";
import InformationPage from "./information.page";

type Props = {
  informations: InformationList[];
};
const InformationContainer: React.FC<Props> = ({informations}) => (
  <ContextProvider>
    <InformationPage informations={informations} />
  </ContextProvider>
);
export default InformationContainer;
