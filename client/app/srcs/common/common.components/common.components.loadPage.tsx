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
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white z-50" />
    </div>
  );
};

export default LoadPage;
