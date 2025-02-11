import React from 'react';

type Props = {
  children: React.ReactNode;
  customClass?: string;
  bgImage?: string;
};
const Card: React.FC<Props> = ({children, customClass, bgImage}) => (
  <div className="group">
    <div
      className={`rounded-sm bg-gray-800 hover:bg-gray-600 shadow-xs shadow-slate-900 group-hover:shadow-lg group-hover:border-white h-full ${customClass}`}
      style={
        bgImage ? {
          backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundColor: 'rgba(0,0,0,0.8)', backgroundBlendMode: 'soft-light',
        } : {}
      }
    >
      <div className="p-6 flex flex-col">
        {children}
      </div>
    </div>
  </div>
);
export default Card;
