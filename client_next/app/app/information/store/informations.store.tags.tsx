'use client';

import React, {
  createContext, useCallback, useMemo, useState,
} from 'react';
import { InformationList } from "../dto/informations";

type TagContext = {
  tags: string[];
  init: (informations: InformationList[]) => void;
};
const Context = createContext<TagContext | undefined>(undefined);
const TagProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [tags, setTags] = useState<string[]>([]);
  const init = useCallback(
    (informations: InformationList[]) => setTags(
      [
        ...new Set(
          informations.map((information) => information.information.tags).flat(),
        ),
      ],
    ),
    [],
  );
  const value = useMemo(() => ({tags, init}), [tags, init]);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};
export default TagProvider;

export const useTag = () => {
  const value = React.useContext(Context);
  if (value === undefined) {
    throw new Error("useTag must be used within a TagProvider");
  }
  return value;
};
