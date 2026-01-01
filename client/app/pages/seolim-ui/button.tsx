/* eslint-disable max-len */
import React from 'react';
import UiButton from '../../srcs/seolim-ui/ui/button/seolim-ui.ui.button';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiButtonPage: NextPageWithLayout = () => (
  <UiButton />
);

UiButtonPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiButtonPage;
