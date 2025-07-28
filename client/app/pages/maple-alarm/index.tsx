import React from 'react';
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(
  () => import('../../srcs/maple/maple.page'),
  { ssr: false },
);

const MapleAlarm: React.FC = () => (
  <div>
    <DynamicComponent />
  </div>
);

export default MapleAlarm;
