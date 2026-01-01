/* eslint-disable max-len */
import React from 'react';
import UiNavbar from '../../srcs/seolim-ui/ui/navbar/seolim-ui.ui.navbar';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiNavbarPage: NextPageWithLayout = () => (
  <UiNavbar />
);

UiNavbarPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiNavbarPage;
