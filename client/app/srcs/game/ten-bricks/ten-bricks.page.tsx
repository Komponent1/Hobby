import React, {useRef} from 'react';
import Game from './ten-bricks.container';
import {RefPhaserGame} from './dto/ten-bricks.dto.ref';
import Navbar from '../../common/common.components/common.components.navbar';

const TenGamePage: React.FC = () => {
  const phaserRef = useRef<RefPhaserGame | null>(null);

  return (
    <div id="app">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-slate-700">
        <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-300 mt-15">
          <Game ref={phaserRef} />
        </div>
      </div>
    </div>
  );
};

export default TenGamePage;
