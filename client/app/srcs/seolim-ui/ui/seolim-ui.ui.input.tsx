import React from 'react';
import { Input } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../component';

const UiInput: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Input" />
      <Description text="Text input components for user data entry." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="Props" />
      <PropsTable
        datas={[
          { name: 'value', type: 'string', description: 'The value of the input field.' },
          { name: 'placeholder', type: 'string', description: 'Placeholder text for the input field.' },
          { name: 'disabled', type: 'boolean', description: 'Whether the input is disabled.' },
          { name: 'error', type: 'boolean', description: 'Whether the input has an error state.' },
          { name: 'onChange', type: '(value: string) => void', description: 'Callback function when input value changes.' },
        ]}
      />
    </div>

    <UiBox>
      <Title text="BASIC" />
      <Description text="Basic input field for text entry." />
      <div className="mt-4">
        <Input value="" onChange={() => {}} placeholder="Enter text here" />
      </div>
    </UiBox>

    <UiBox>
      <Title text="STATES" />
      <Description text="Input states include Normal, Disabled, and Error." />
      <div className="space-y-3 mt-4">
        <Input value="" onChange={() => {}} placeholder="Normal input" />
        <Input value="Disabled Input" onChange={() => {}} disabled />
        <Input value="Error Input" onChange={() => {}} error />
      </div>
    </UiBox>

    <UiBox>
      <Title text="PLACEHOLDERS" />
      <Description text="Different placeholder examples." />
      <div className="space-y-3 mt-4">
        <Input value="" onChange={() => {}} placeholder="Enter your name" />
        <Input value="" onChange={() => {}} placeholder="Enter your email" />
        <Input value="" onChange={() => {}} placeholder="Enter your message" />
      </div>
    </UiBox>
  </div>
);

export default UiInput;
