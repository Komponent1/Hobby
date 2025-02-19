import React, { useRef } from 'react';
import Game from './survival-knight.container';
import { RefPhaserGame } from './dto/survival-knight.dto.ref';

const SurvivalKngihtPage: React.FC = () => {
  const phaserRef = useRef<RefPhaserGame | null>(null);

  return (
    <div id="app">
      <Game ref={phaserRef} />
    </div>
  );
};

export default SurvivalKngihtPage;
