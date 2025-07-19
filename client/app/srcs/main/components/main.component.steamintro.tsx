import React from 'react';
import FlipCard from './main.components.flipcard';

type Props = {
  onLink: (path: string) => void;
};
const SteamIntro: React.FC<Props> = ({ onLink }) => (
  <FlipCard
    front={(
      <div className="flex flex-col items-center h-full justify-center">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-white">
          스팀
        </h1>
      </div>
        )}
    back={(
      <div className="flex flex-col items-center h-full justify-center">
        <p className="font-normal text-gray-400 text-nowrap">
          개인 스팀 정보 분석
        </p>
      </div>
        )}
    onClick={() => onLink('/steam')}
  />
);

export default SteamIntro;
