import React, {useRef} from 'react';
import Game from './ten-bricks.container';
import {RefPhaserGame} from './dto/ten-bricks.dto.ref';

const TenGamePage: React.FC = () => {
  const phaserRef = useRef<RefPhaserGame | null>(null);

  return (
    <div id="app">
      <Game ref={phaserRef} />
    </div>
  );
};

export default TenGamePage;
