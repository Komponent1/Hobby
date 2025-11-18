/* eslint-disable max-len */
import React from 'react';
import UiContainer from '../../srcs/seolim-ui/seolim-ui.container';
import { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const SeolimUi: NextPageWithLayout = () => (
  <UiContainer />
);

SeolimUi.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default SeolimUi;
