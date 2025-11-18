/* eslint-disable max-len */
import React from 'react';
import UiInput from '../../srcs/seolim-ui/ui/seolim-ui.ui.input';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiInputPage: NextPageWithLayout = () => (
  <UiInput />
);

UiInputPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiInputPage;
