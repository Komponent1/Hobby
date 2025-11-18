import React from 'react';
import {Input} from '@seolim/designsystem';

const SeolimUiInput: React.FC = () => (
  <div>
    <Input value="" onChange={() => {}} placeholder="Enter text here" />
    <Input value="Disabled Input" onChange={() => {}} disabled />
    <Input value="Error Input" onChange={() => {}} error />
  </div>
);

export default SeolimUiInput;
