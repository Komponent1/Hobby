import React, {useRef} from 'react';
import Game from './file-name.container';
import {RefPhaserGame} from './dto/file-name.dto.ref';

const TodoNamePage: React.FC = () => {
  const phaserRef = useRef<RefPhaserGame | null>(null);

  return (
    <div id="app">
      <Game ref={phaserRef} />
    </div>
  );
};

export default TodoNamePage;
