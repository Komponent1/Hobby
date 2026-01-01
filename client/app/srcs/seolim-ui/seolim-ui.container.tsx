import React from 'react';
import { ThemeProvider } from '@seolim/designsystem';
import UiPage from "./seolim-ui.page";

const InformationsContainer: React.FC = () => (
  <ThemeProvider>
    <UiPage />
  </ThemeProvider>
);

export default InformationsContainer;
