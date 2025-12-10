/* eslint-disable max-len */
import React from 'react';
import UiPagination from '../../srcs/seolim-ui/ui/seolim-ui.ui.pagination';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiPaginationPage: NextPageWithLayout = () => (
  <UiPagination />
);

UiPaginationPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiPaginationPage;
