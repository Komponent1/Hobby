import React, {useRef} from 'react';
import Game from './ten-game.container';
import {RefPhaserGame} from './dto/ten-game.dto.ref';

const TenGamePage: React.FC = () => {
  const phaserRef = useRef<RefPhaserGame | null>(null);

  return (
    <div id="app">
      <Game ref={phaserRef} />
    </div>
  );
};

export default TenGamePage;
