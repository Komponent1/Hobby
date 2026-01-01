/* eslint-disable max-len */
import React from 'react';
import UiSkeleton from '../../srcs/seolim-ui/ui/skeleton/seolim-ui.ui.skeleton';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiSkeletonPage: NextPageWithLayout = () => (
  <UiSkeleton />
);

UiSkeletonPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiSkeletonPage;
