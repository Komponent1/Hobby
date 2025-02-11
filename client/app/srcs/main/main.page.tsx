import React, { useCallback, useState } from 'react';
import {useRouter} from 'next/router';
import pages from '../page.config.json';
import {PageConfig} from '../common/common.dto';
import FlipCard from './components/main.components.flipcard';
import Portal from "../common/common.components/common.components.portal";
import LoadPage from "../common/common.components/common.components.loadPage";

const MainPage: React.FC = () => {
  const router = useRouter();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const onLink = useCallback((page: keyof PageConfig) => {
    setIsLoad(true);
    router.push((pages as PageConfig)[page].path);
  }, [router, setIsLoad]);
  return (
    <div className="bg-cover bg-center min-h-screen w-screen bg-linear-to-tr from-slate-600 to-slate-900 grid place-items-center">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4 auto-rows-auto">
        {Object.keys(pages as PageConfig).map((page) => {
          if (page === 'main') return <React.Fragment key={page} />;
          return (
            <FlipCard
              key={page}
              front={(
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-white">
                  {(pages as PageConfig)[page].title}
                </h1>
            )}
              back={(
                <p className="font-normal text-gray-400">
                  {(pages as PageConfig)[page].description}
                </p>
            )}
              onClick={() => onLink(page)}
            />
          );
        })}
      </div>
      <Portal>
        <LoadPage isLoad={isLoad} />
      </Portal>
    </div>
  );
};
export default MainPage;
