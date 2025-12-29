/* eslint-disable max-len */
import React from 'react';
import UiAutocomplete from '../../srcs/seolim-ui/ui/seolim-ui.ui.autocomplete';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiAutocompletePage: NextPageWithLayout = () => (
  <UiAutocomplete />
);

UiAutocompletePage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiAutocompletePage;
