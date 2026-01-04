/* eslint-disable max-len */
import React from 'react';
import UiTheme from '../../srcs/seolim-ui/ui/theme/seolim-ui.ui.theme';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiThemePage: NextPageWithLayout = () => (
  <UiTheme />
);

UiThemePage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiThemePage;
