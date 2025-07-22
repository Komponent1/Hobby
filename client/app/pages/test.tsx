import React from 'react';
import Area from '../srcs/steam/components/steam.component.area';

const Test: React.FC = () => {
  return (
    <div className="w-[512px] h-72 z-10">
      <Area backgroundUrl="/icon/steam.svg">
        <div className="text-white text-2xl font-bold relative z-10 justify-between items-center flex flex-col h-full p-6 text-shadow">
          <h1>총 구매 금액</h1>
          <div>
            <h1 className="text-7xl">2717 시간</h1>
          </div>
          <p className="text-xl text-gray-300">* dlc는 제외됩니다</p>
        </div>
      </Area>
    </div>
  );
}

export default Test;
