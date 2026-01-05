/* eslint-disable max-len */
import React from 'react';
import UiMediaQuery from '../../srcs/seolim-ui/ui/media-query/seolim-ui.ui.media-query';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiMediaQueryPage: NextPageWithLayout = () => (
  <UiMediaQuery />
);

UiMediaQueryPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiMediaQueryPage;
