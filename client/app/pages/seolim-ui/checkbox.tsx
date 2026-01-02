/* eslint-disable max-len */
import React from 'react';
import UiCheckbox from '../../srcs/seolim-ui/ui/checkbox/seolim-ui.ui.checkbox';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiCheckboxPage: NextPageWithLayout = () => (
  <UiCheckbox />
);

UiCheckboxPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiCheckboxPage;
