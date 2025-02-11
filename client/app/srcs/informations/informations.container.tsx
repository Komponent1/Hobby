import React from 'react';
import InformationsPage from "./informations.page";
import ContextProvider from "./store/informations.store.root";
import { InformationList } from "./dto/informations";

type Props = {
  informations: InformationList[];
};
const InformationsContainer: React.FC<Props> = ({informations}) => (
  <ContextProvider>
    <InformationsPage informations={informations} />
  </ContextProvider>
);

export default InformationsContainer;
