import React, { Fragment, useCallback, useState } from 'react';
import {useRouter} from 'next/router';
import Portal from "../common/common.components/common.components.portal";
import LoadPage from "../common/common.components/common.components.loadPage";
import PageJson from '../page.config.json';
import ArticleIntro from './components/main.component.articleintro';
import SteamIntro from './components/main.component.steamintro';
import InformationIntro from './components/main.component.informationintro';
import GameIntro from './components/main.component.gameintro';
import { Etc } from './components/main.component.etc';
import UiIntro from './components/main.component.seolim-uiIntro';

const MainPage: React.FC = () => {
  const router = useRouter();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const onLink = useCallback((path: string) => {
    setIsLoad(true);
    router.push(path);
  }, [router, setIsLoad]);
  return (
    <div className="bg-cover bg-center min-h-screen w-screen bg-neutral-800">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 pt-20 max-w-[1368px] w-full">

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
              case 'seolim-ui':
                return (<UiIntro onLink={onLink} />);
              default:
                return null;
            }
          })}
          <Etc />
        </div>
      </div>
      <Portal>
        <LoadPage isLoad={isLoad} />
      </Portal>
    </div>
  );
};
export default MainPage;
