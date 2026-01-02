/* eslint-disable max-len */
import React from 'react';
import UiFloatButton from '../../srcs/seolim-ui/ui/float-button/seolim-ui.ui.float-button';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiFloatButtonPage: NextPageWithLayout = () => (
  <UiFloatButton />
);

UiFloatButtonPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiFloatButtonPage;
