/* eslint-disable max-len */
import React from 'react';
import UiRadio from '../../srcs/seolim-ui/ui/radio/seolim-ui.ui.radio';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiRadioPage: NextPageWithLayout = () => (
  <UiRadio />
);

UiRadioPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiRadioPage;
