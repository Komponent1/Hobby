import React from 'react';
import InformationsPage from "./infomations.page";
import ContextProvider from "./store/informtaions.store.information";
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
