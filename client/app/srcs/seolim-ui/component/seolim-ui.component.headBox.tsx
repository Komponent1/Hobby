import React from 'react';

type Props = {
  children?: React.ReactNode;
};
const HeadBox: React.FC<Props> = ({ children }) => (
  <div className="flex-col rounded border-1 border-gray-400 px-4 py-3">
    {children}
  </div>
);
export default HeadBox;
