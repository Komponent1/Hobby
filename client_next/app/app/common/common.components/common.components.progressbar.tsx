import React from 'react';

type Props = {
  backgroundColor?: string;
  barColor?: string;
  bgCustomClass?: string;
  barCustomClass?: string;
  range: string;
};
/**
 * range: % string ex> '50%'
 * backgroundColor: tailwind bg color
 * barColor: tailwind bg color
 */
const ProgressBar: React.FC<Props> = ({
  range,
  backgroundColor = 'bg-gray-200',
  barColor = 'bg-blue-500',
  bgCustomClass = '',
  barCustomClass = '',
}) => (
  <div className={`w-full h-1 rounded-full ${backgroundColor} ${bgCustomClass}`}>
    <div className={`h-1 rounded-full ${barColor} ${barCustomClass}`} style={{width: range}} />
  </div>
);

export default ProgressBar;
