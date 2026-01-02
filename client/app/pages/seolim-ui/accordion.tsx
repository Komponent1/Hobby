/* eslint-disable max-len */
import React from 'react';
import UiAccordion from '../../srcs/seolim-ui/ui/accordion/seolim-ui.ui.accordion';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiAccordionPage: NextPageWithLayout = () => (
  <UiAccordion />
);

UiAccordionPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiAccordionPage;
