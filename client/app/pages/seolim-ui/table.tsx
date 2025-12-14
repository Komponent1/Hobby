/* eslint-disable max-len */
import React from 'react';
import UiTable from '../../srcs/seolim-ui/ui/seolim-ui.ui.table';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiTablePage: NextPageWithLayout = () => (
  <UiTable />
);

UiTablePage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiTablePage;
