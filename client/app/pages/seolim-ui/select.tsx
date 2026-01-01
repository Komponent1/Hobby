/* eslint-disable max-len */
import React from 'react';
import UiSelect from '../../srcs/seolim-ui/ui/select/seolim-ui.ui.select';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiSelectPage: NextPageWithLayout = () => (
  <UiSelect />
);

UiSelectPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiSelectPage;
