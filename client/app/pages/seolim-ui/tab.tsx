/* eslint-disable max-len */
import React from 'react';
import UiTab from '../../srcs/seolim-ui/ui/seolim-ui.ui.tab';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiTabPage: NextPageWithLayout = () => (
  <UiTab />
);

UiTabPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiTabPage;
