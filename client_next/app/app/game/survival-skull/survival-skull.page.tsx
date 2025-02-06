'use client';

import React, { useRef } from 'react';
import Game from './survival-skull.container';
import { RefPhaserGame } from "./dto/game.dto.ref";

const SurvivalSkullPage: React.FC = () => {
  const phaserRef = useRef<RefPhaserGame | null>(null);

  return (
    <div id="app">
      <Game ref={phaserRef} />
    </div>
  );
};

export default SurvivalSkullPage;
