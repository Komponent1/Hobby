import React, { useRef } from 'react';
import Game from './example';

export interface RefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}
const GameSecond: React.FC = () => {
  const phaserRef = useRef<RefPhaserGame | null>(null);

  return (
    <div id="app">
      <Game ref={phaserRef} />
    </div>
  )
}

export default GameSecond;
