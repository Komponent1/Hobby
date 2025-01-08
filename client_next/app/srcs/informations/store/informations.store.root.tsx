import { ReactNode } from "react";
import InformationProvider from "./informtaions.store.information";

const ContextProvider: React.FC<{children: ReactNode}> = ({children}) => (
  <InformationProvider>
    {children}
  </InformationProvider>
);

export default ContextProvider;
