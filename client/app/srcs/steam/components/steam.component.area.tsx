import React from 'react';

type Props = {
  backgroundUrl?: string;
  children: React.ReactNode;
};
const Area: React.FC<Props> = ({ backgroundUrl, children }) => (
  <div
    className="shadow-[2px_2px_15px_rgba(0,0,0,0.8)] rounded-xl w-full h-72 overflow-hidden"
  >
    <div
      className="w-full h-full bg-radial-[182.31%_199.89%_at_90.99%_107.25%,_rgb(1,162,171)_10%,_rgb(204,102,112)_70%,_rgb(1,162,171)_120%] relative"
    >
      {backgroundUrl && (
        <div
          className="w-full h-full absolute opacity-30 bg-cover bg-center mask-radial-[100%_100%_at_50%_55%,_black_8%,_rgba(0,0,0,0)_75%] z-0"
          style={{ backgroundImage: `url(${backgroundUrl})`, mixBlendMode: 'unset' }}
        />
      )}
      {children}
    </div>
  </div>
);

export default Area;
