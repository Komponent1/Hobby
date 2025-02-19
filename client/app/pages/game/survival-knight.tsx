import React from 'react';
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(
  () => import('../../srcs/game/survival-knight/survival-knight.container'),
  { ssr: false },
);

const SurvivalKnight: React.FC = () => (
  <div>
    <DynamicComponent />
  </div>
);

export default SurvivalKnight;
