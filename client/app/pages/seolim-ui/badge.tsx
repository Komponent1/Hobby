/* eslint-disable max-len */
import React from 'react';
import UiBadge from '../../srcs/seolim-ui/ui/badge/seolim-ui.ui.badge';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiBadgePage: NextPageWithLayout = () => (
  <UiBadge />
);

UiBadgePage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiBadgePage;
