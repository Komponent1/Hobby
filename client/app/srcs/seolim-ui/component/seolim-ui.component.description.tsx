import React from 'react';
import {Typography, useTheme} from '@seolim/designsystem';

type Props = {
  text: string;
};
const Description: React.FC<Props> = ({ text }) => {
  const { theme } = useTheme();
  return (
    <div className="p-0.5">
      <Typography element="p" size="lg" weight="regular" color={theme.color.text.secondary}>{text}</Typography>
    </div>
  );
};
export default Description;
