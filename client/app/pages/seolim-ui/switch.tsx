/* eslint-disable max-len */
import React from 'react';
import UiSwitch from '../../srcs/seolim-ui/ui/switch/seolim-ui.ui.switch';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiSwitchPage: NextPageWithLayout = () => (
  <UiSwitch />
);

UiSwitchPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiSwitchPage;
