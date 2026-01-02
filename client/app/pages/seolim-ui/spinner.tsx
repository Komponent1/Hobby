/* eslint-disable max-len */
import React from 'react';
import UiSpinner from '../../srcs/seolim-ui/ui/spinner/seolim-ui.ui.spinner';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiSpinnerPage: NextPageWithLayout = () => (
  <UiSpinner />
);

UiSpinnerPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiSpinnerPage;
