import React from 'react';
import { Button } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../component';

const UiButton: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Button" />
      <Description text="Interactive button components for user actions." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="Props" />
      <PropsTable
        datas={[
          { name: 'content', type: 'React.ReactNode', description: 'The content to display inside the button.' },
          { name: 'label', type: 'string', description: 'The aria-label for accessibility.' },
          { name: 'onClick', type: '() => void', description: 'Callback function when button is clicked.' },
          { name: 'variant', type: 'outline | solid | text', description: 'The visual style of the button.' },
          { name: 'corner', type: 'rounded | square', description: 'The corner style of the button.' },
          { name: 'size', type: 'sm | md | lg', description: 'The size of the button.' },
          { name: 'full', type: 'boolean', description: 'Whether the button takes full width.' },
          { name: 'color', type: 'string', description: 'The background color of the button.' },
          { name: 'textColor', type: 'string', description: 'The text color of the button.' },
          { name: 'disabled', type: 'boolean', description: 'Whether the button is disabled.' },
        ]}
      />
    </div>

    <UiBox>
      <Title text="VARIANTS" />
      <Description text="Button variants include Outline, Solid, and Text styles." />
      <div className="space-y-3 mt-4">
        <Button content="Outline Button" variant="outline" onClick={() => {}} />
        <Button content="Solid Button" variant="solid" onClick={() => {}} />
        <Button content="Text Button" variant="text" onClick={() => {}} />
      </div>
    </UiBox>

    <UiBox>
      <Title text="SIZES" />
      <Description text="Button sizes range from small to large." />
      <div className="space-y-3 mt-4">
        <Button content="Small Button" size="sm" onClick={() => {}} />
        <Button content="Medium Button" size="md" onClick={() => {}} />
        <Button content="Large Button" size="lg" onClick={() => {}} />
      </div>
    </UiBox>

    <UiBox>
      <Title text="CORNERS" />
      <Description text="Button corner styles include Rounded and Square." />
      <div className="space-y-3 mt-4">
        <Button content="Rounded Button" corner="rounded" onClick={() => {}} />
        <Button content="Square Button" corner="square" onClick={() => {}} />
      </div>
    </UiBox>

    <UiBox>
      <Title text="STATES" />
      <Description text="Button states include Normal, Disabled, and Full Width." />
      <div className="space-y-3 mt-4">
        <Button content="Normal Button" onClick={() => {}} />
        <Button content="Disabled Button" disabled onClick={() => {}} />
        <Button content="Full Width Button" full onClick={() => {}} />
      </div>
    </UiBox>
  </div>
);

export default UiButton;
