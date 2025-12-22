/* eslint-disable max-len */
import React from 'react';
import UiContextMenu from '../../srcs/seolim-ui/ui/seolim-ui.ui.context-menu';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiContextMenuPage: NextPageWithLayout = () => (
  <UiContextMenu />
);

UiContextMenuPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiContextMenuPage;
