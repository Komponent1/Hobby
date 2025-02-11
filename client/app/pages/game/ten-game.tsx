import React from 'react';
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(
  () => import('../../srcs/game/ten-game/ten-game.container'),
  { ssr: false },
);

const TenGame: React.FC = () => (
  <div>
    <DynamicComponent />
  </div>
);

export default TenGame;
