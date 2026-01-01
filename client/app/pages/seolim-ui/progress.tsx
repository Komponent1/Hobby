/* eslint-disable max-len */
import React from 'react';
import UiProgress from '../../srcs/seolim-ui/ui/progress/seolim-ui.ui.progress';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiProgressPage: NextPageWithLayout = () => (
  <UiProgress />
);

UiProgressPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiProgressPage;
