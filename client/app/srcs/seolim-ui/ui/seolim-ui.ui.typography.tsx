import React from 'react';
import { Typography } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../component';

const UiTypography: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Typography" />
      <Description text="Various typography styles available in the design system." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="Props" />
      <PropsTable
        datas={[
          { name: 'size', type: 'xs | sm | md | lg | xl | 2xl | 3xl | 4xl | 5xl | 6xl | 7xl | 8xl | 9xl', description: 'The size of the typography.' },
          { name: 'weight', type: 'light | regular | bold | extraBold', description: 'The weight of the typography.' },
          { name: 'color', type: 'string', description: 'The color of the typography.' },
          { name: 'type', type: 'p | span', description: 'The HTML element type of the typography.' },
        ]}
      />
    </div>

    <UiBox>
      <Title text="SIZE" />
      <Description text="Typography sizes range from xs to 9xl." />
      <div className="space-y-2 mt-4">
        <Typography size="xs" weight="regular">This is XS size typography.</Typography>
        <Typography size="sm" weight="regular">This is SM size typography.</Typography>
        <Typography size="md" weight="regular">This is MD size typography.</Typography>
        <Typography size="lg" weight="regular">This is LG size typography.</Typography>
        <Typography size="xl" weight="regular">This is XL size typography.</Typography>
        <Typography size="2xl" weight="regular">This is 2XL size typography.</Typography>
        <Typography size="3xl" weight="regular">This is 3XL size typography.</Typography>
        <Typography size="4xl" weight="regular">This is 4XL size typography.</Typography>
        <Typography size="5xl" weight="regular">This is 5XL size typography.</Typography>
        <Typography size="6xl" weight="regular">This is 6XL size typography.</Typography>
        <Typography size="7xl" weight="regular">This is 7XL size typography.</Typography>
        <Typography size="8xl" weight="regular">This is 8XL size typography.</Typography>
        <Typography size="9xl" weight="regular">This is 9XL size typography.</Typography>
      </div>
    </UiBox>

    <UiBox>
      <Title text="WEIGHT" />
      <Description text="Typography weights include Light, Regular, Medium, Bold, and ExtraBold." />
      <div className="space-y-3 mt-4">
        <Typography size="md" weight="light">This is Light weight typography.</Typography>
        <Typography size="md" weight="regular">This is Regular weight typography.</Typography>
        <Typography size="md" weight="bold">This is Bold weight typography.</Typography>
        <Typography size="md" weight="extraBold">This is ExtraBold weight typography.</Typography>
      </div>
    </UiBox>
  </div>
);

export default UiTypography;
