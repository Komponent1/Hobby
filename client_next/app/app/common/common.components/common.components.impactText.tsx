import React from 'react';

type Props = {
  text: string;
  customClass?: string;
};
const ImpactText: React.FC<Props> = ({ text, customClass = '' }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 ${customClass}`}>
    {text}
  </span>
);

export default ImpactText;
