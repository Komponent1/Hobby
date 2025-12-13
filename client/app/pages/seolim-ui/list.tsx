/* eslint-disable max-len */
import React from 'react';
import UiList from '../../srcs/seolim-ui/ui/seolim-ui.ui.list';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiListPage: NextPageWithLayout = () => (
  <UiList />
);

UiListPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiListPage;
