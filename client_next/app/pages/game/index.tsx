import React from 'react';
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../../srcs/game/gamePage'), { ssr: false });

const GamePage: React.FC = () => (
  <div id="game">
    <DynamicComponent />
  </div>
);

export default GamePage;
