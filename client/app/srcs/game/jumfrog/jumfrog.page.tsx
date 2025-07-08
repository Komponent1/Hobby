import React, {useRef} from 'react';
import Game from './jumfrog.container';
import {RefPhaserGame} from './dto/jumfrog.dto.ref';

const JumfrogPage: React.FC = () => {
  const phaserRef = useRef<RefPhaserGame | null>(null);

  return (
    <div id="app">
      <Game ref={phaserRef} />
    </div>
  );
};

export default JumfrogPage;
