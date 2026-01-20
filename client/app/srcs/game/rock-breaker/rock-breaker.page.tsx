import React, {useRef} from 'react';
import Game from './rock-breaker.container';
import {RefPhaserGame} from './dto/rock-breaker.dto.ref';

const RockBreakerPage: React.FC = () => {
  const phaserRef = useRef<RefPhaserGame | null>(null);

  return (
    <div id="app">
      <Game ref={phaserRef} />
    </div>
  );
};

export default RockBreakerPage;
