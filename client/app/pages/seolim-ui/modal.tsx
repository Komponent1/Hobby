/* eslint-disable max-len */
import React from 'react';
import UiModal from '../../srcs/seolim-ui/ui/modal/seolim-ui.ui.modal';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiModalPage: NextPageWithLayout = () => (
  <UiModal />
);

UiModalPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiModalPage;
