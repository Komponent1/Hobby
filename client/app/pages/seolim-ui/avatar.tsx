/* eslint-disable max-len */
import React from 'react';
import UiAvatar from '../../srcs/seolim-ui/ui/avatar/seolim-ui.ui.avatar';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiAvatarPage: NextPageWithLayout = () => (
  <UiAvatar />
);

UiAvatarPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiAvatarPage;
