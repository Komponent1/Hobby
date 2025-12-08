/* eslint-disable max-len */
import React from 'react';
import UiAlert from '../../srcs/seolim-ui/ui/seolim-ui.ui.alert';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiAlertPage: NextPageWithLayout = () => (
  <UiAlert />
);

UiAlertPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiAlertPage;
