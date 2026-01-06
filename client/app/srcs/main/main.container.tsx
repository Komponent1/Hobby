import {ThemeProvider} from '@seolim/designsystem';
import React from 'react';

type Props = {
  children: React.ReactNode;
};
const MainContainer: React.FC<Props> = ({ children }) => (
  <ThemeProvider>
    {children}
  </ThemeProvider>
);

export default MainContainer;
