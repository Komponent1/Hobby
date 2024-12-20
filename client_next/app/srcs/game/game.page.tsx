import React, { useRef } from 'react';
import Game from './game.container';
import { RefPhaserGame } from './dto/game.dto.ref';

const GamePage: React.FC = () => {
  const phaserRef = useRef<RefPhaserGame | null>(null);

  return (
    <div id="app">
      <Game ref={phaserRef} />
    </div>
  );
};

export default GamePage;
