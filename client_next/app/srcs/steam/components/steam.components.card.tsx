import React from 'react';

type Props = {
  children: React.ReactNode;
};
const Card: React.FC<Props> = ({children}) => (
  <div className="group">
    <div className="rounded bg-white border border-gray-300 group-hover:shadow-lg group-hover:border-white h-full">
      <div className="p-6 flex flex-col">
        {children}
      </div>
    </div>
  </div>
);
export default Card;
