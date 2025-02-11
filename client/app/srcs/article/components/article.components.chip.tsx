import React from 'react';

type Props = {
  label: string;
  bg?: string;
  textColor?: string;
};
const Chip: React.FC<Props> = ({bg, textColor, label}) => (
  <div id="chip" className={`relative rounded-md flex bg-slate-800 py-1 px-2 border border-transparent text-sm text-white transition-all ${bg} ${textColor}`}>
    {label}
  </div>
);
export default Chip;
