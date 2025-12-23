/* eslint-disable max-len */
import React from 'react';
import UiDivider from '../../srcs/seolim-ui/ui/seolim-ui.ui.divider';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiDividerPage: NextPageWithLayout = () => (
  <UiDivider />
);

UiDividerPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiDividerPage;
