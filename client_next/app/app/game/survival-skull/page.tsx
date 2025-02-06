import React from 'react';
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(
  () => import('./survival-skull.container'),
  { ssr: false },
);
const Page: React.FC = () => (
  <div id="app">
    <DynamicComponent />
  </div>
);
export default Page;
