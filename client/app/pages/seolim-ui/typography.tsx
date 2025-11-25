/* eslint-disable max-len */
import React from 'react';
import UiTypography from '../../srcs/seolim-ui/ui/seolim-ui.ui.typography';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiTypographyPage: NextPageWithLayout = () => (
  <UiTypography />
);

UiTypographyPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiTypographyPage;
