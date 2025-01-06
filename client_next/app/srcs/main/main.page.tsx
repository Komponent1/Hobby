import React from 'react';
import pages from '../page.config.json';
import {PageConfig} from '../common/common.dto';
import Card from './components/common.components.card';

const MainPage: React.FC = () => (
  <div className="bg-cover bg-center min-h-screen w-screen bg-gradient-to-tr from-slate-600 to-slate-900 grid place-items-center">
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 auto-rows-auto">
      {Object.keys(pages as PageConfig).map((page) => {
      // eslint-disable-next-line react/jsx-no-useless-fragment
        if (page === 'main') return <></>;
        return (
          <Card
            key={page}
            link={(pages as PageConfig)[page].path}
            text={(pages as PageConfig)[page].title}
            description={(pages as PageConfig)[page].description}
          />
        );
      })}
    </div>
  </div>
);

export default MainPage;
