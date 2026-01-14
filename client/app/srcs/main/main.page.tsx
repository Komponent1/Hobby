import React, { Fragment, useCallback, useState } from 'react';
import {useRouter} from 'next/router';
import Portal from "../common/common.components/common.components.portal";
import LoadPage from "../common/common.components/common.components.loadPage";
import PageJson from '../page.config.json';
import ArticleIntro from './components/main.component.articleintro';
import SteamIntro from './components/main.component.steamintro';
import InformationIntro from './components/main.component.informationintro';
import GameIntro from './components/main.component.gameintro';
import UiIntro from './components/main.component.seolim-uiIntro';

const MainPage: React.FC = () => {
  const router = useRouter();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const onLink = useCallback((path: string) => {
    setIsLoad(true);
    router.push(path);
  }, [router, setIsLoad]);

  return (
    <div className="bg-cover bg-center min-h-screen w-screen">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 pt-20 max-w-[1368px] w-full">

          {PageJson.order.map((page) => {
            switch (page) {
              case 'main':
                return (<Fragment key={page} />);
              case 'blog':
                return (<ArticleIntro onLink={onLink} key={page} />);
              case 'information':
                return (<InformationIntro onLink={onLink} key={page} />);
              case 'game':
                return (<GameIntro onLink={onLink} key={page} />);
              case 'steam':
                return (<SteamIntro onLink={onLink} key={page} />);
              case 'seolim-ui':
                return (<UiIntro onLink={onLink} key={page} />);
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
