import {Spinner} from '@seolim/designsystem';
import React from 'react';

type Props = {
  isLoad: boolean;
};
const LoadPage: React.FC<Props> = ({isLoad}) => {
  if (!isLoad) return null;
  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-gray-900 z-50 opacity-50"
    >
      <Spinner size="lg" />
    </div>
  );
};

export default LoadPage;
