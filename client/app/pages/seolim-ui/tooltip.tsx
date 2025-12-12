/* eslint-disable max-len */
import React from 'react';
import UiTooltip from '../../srcs/seolim-ui/ui/seolim-ui.ui.tooltip';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiTooltipPage: NextPageWithLayout = () => (
  <UiTooltip />
);

UiTooltipPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiTooltipPage;
