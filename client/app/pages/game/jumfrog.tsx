import React from 'react';
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(
  () => import('../../srcs/game/jumfrog/jumfrog.container'),
  { ssr: false },
);

const Jumfrog: React.FC = () => (
  <div>
    <DynamicComponent />
  </div>
);

export default Jumfrog;
