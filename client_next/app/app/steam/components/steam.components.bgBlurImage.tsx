import Image from "next/image";
import React from 'react';

const BgBlurImage: React.FC = () => (
  <>
    <div className="absolute top-2">
      <div className="fixed top-32 left-[calc(50%-265px)] xl:left-[calc(50%-540px)] responsive xl:w-[1060px] xl:h-[540px] w-[530px] h-[260px]">
        <Image src="/steam-logo.png" alt="Steam Logo" fill className="-rotate-12" />
      </div>
    </div>
    <div className="fixed top-0 bg-gradient-to-t from-slate-600 to-slate-900 h-screen w-screen grid place-items-center opacity-90" />
  </>
);

export default BgBlurImage;
