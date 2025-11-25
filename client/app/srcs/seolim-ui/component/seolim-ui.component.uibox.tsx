import React from 'react';

type UiBoxProps = {
  children?: React.ReactNode;
};
const UiBox: React.FC<UiBoxProps> = ({ children }) => (
  <div className="border-dotted border-2 border-blue-500 px-4 py-3">{children}</div>
);

export default UiBox;
