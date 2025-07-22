import React from 'react';
import { num2wonComma } from '../utils/steam.util.string';

type Props = {
  totalPrice: number;
};
const Price: React.FC<Props> = ({ totalPrice }) => (
  <div className="text-white text-2xl font-bold relative z-10 justify-between items-center flex flex-col h-full p-6 text-shadow">
    <h1>총 구매 금액</h1>
    <div>
      <h1 className="text-5xl">
        {`${num2wonComma(totalPrice / 100)}`}
      </h1>
    </div>
    <p className="text-xl text-gray-300">* dlc는 제외됩니다</p>
  </div>
);

export default Price;
