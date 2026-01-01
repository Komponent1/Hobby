/* eslint-disable max-len */
import React from 'react';
import UiCard from '../../srcs/seolim-ui/ui/card/seolim-ui.ui.card';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiCardPage: NextPageWithLayout = () => (
  <UiCard />
);

UiCardPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiCardPage;
