/* eslint-disable max-len */
import React from 'react';
import UiCarousel from '../../srcs/seolim-ui/ui/seolim-ui.ui.carousel';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiCarouselPage: NextPageWithLayout = () => (
  <UiCarousel />
);

UiCarouselPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiCarouselPage;
