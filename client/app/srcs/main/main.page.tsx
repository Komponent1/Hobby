import React, { Fragment, useCallback, useState } from 'react';
import {useRouter} from 'next/router';
import Portal from "../common/common.components/common.components.portal";
import LoadPage from "../common/common.components/common.components.loadPage";
import ArticleIntro from './components/main.component.articleintro';
import InformationIntro from './components/main.component.informationintro';
import GameIntro from './components/main.component.gameintro';
import SteamIntro from './components/main.component.steamintro';
import PageJson from '../page.config.json';

const MainPage: React.FC = () => {
  const router = useRouter();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const onLink = useCallback((path: string) => {
    setIsLoad(true);
    router.push(path);
  }, [router, setIsLoad]);
  return (
    <div className="bg-cover bg-center min-h-screen w-screen bg-linear-to-tr from-slate-600 to-slate-900">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 gap-12 pt-20">
          {PageJson.order.map((page) => {
            switch (page) {
              case 'main':
                return (<Fragment key={page} />);
              case 'blog':
                return (<ArticleIntro onLink={onLink} />);
              case 'information':
                return (<InformationIntro onLink={onLink} />);
              case 'game':
                return (<GameIntro onLink={onLink} />);
              case 'steam':
                return (<SteamIntro onLink={onLink} />);
              default:
                return null;
            }
          })}
        </div>
      </div>
      <Portal>
        <LoadPage isLoad={isLoad} />
      </Portal>
    </div>
  );
};
export default MainPage;
