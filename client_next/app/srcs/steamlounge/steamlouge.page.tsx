import React, { useRef } from 'react';
import { GameAnalysticData } from './dto/game';
import CodeInput from './components/steam.components.codeInput';

type Props = {
  gameDatas: GameAnalysticData[];
};const SteamLoungePage: React.FC<Props> = () => {
  return (
    <div>
      <CodeInput />
    </div>
  );
};

export default SteamLoungePage;
