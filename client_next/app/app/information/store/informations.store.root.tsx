'use client';

import { ReactNode } from "react";
import InformationProvider, { useInformation } from "./informtaions.store.information";
import TagProvider, { useTag } from "./informations.store.tags";

const ContextProvider: React.FC<{children: ReactNode}> = ({children}) => (
  <InformationProvider>
    <TagProvider>
      {children}
    </TagProvider>
  </InformationProvider>
);

export default ContextProvider;

export const useStores = () => ({
  informationStore: useInformation(),
  tagStore: useTag(),
});
