import React from 'react';
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(
  () => import('../../srcs/game/ten-bricks/ten-bricks.container'),
  { ssr: false },
);

const TenGame: React.FC = () => (
  <div>
    <DynamicComponent />
  </div>
);

export default TenGame;
