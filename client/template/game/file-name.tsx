import React from 'react';
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(
  () => import('../../srcs/game/file-name/file-name.container'),
  { ssr: false },
);

const TodoName: React.FC = () => (
  <div>
    <DynamicComponent />
  </div>
);

export default TodoName;
