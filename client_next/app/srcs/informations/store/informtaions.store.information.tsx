import React, {
  createContext, ReactNode, useContext, useMemo, useState,
} from "react";
import { InformationList } from "../dto/informations";

type InformationContext = {
  openId: number;
  informationList: InformationList[];
  actions: {
    init: (informations: InformationList[]) => void;
    open: (id: number) => void;
    close: () => void;
  };
};
const Context = createContext<InformationContext | undefined>(undefined);
const InformationProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [openId, setOpenId] = useState<number>(-1);
  const [informationList, setInformationList] = useState<InformationList[]>([]);
  const actions = useMemo(() => ({
    init: (informations: InformationList[]) => setInformationList(informations),
    open: (id: number) => setOpenId(id),
    close: () => setOpenId(-1),
  }), []);
  const value = useMemo(
    () => ({openId, informationList, actions}),
    [openId, informationList, actions],
  );

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};
export default InformationProvider;

export const useInformation = () => {
  const value = useContext(Context);
  if (value === undefined) {
    throw new Error("useInformation must be used within a InformationProvider");
  }
  return value;
};
