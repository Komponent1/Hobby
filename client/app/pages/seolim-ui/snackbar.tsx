/* eslint-disable max-len */
import React from 'react';
import UiSnackbar from '../../srcs/seolim-ui/ui/snackbar/seolim-ui.ui.snackbar';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiSnackbarPage: NextPageWithLayout = () => (
  <UiSnackbar />
);

UiSnackbarPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiSnackbarPage;
