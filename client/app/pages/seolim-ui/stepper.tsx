/* eslint-disable max-len */
import React from 'react';
import UiStepper from '../../srcs/seolim-ui/ui/stepper/seolim-ui.ui.stepper';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const UiStepperPage: NextPageWithLayout = () => (
  <UiStepper />
);

UiStepperPage.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default UiStepperPage;
