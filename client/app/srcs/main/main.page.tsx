import React, { useCallback, useState } from 'react';
import {useRouter} from 'next/router';
import Portal from "../common/common.components/common.components.portal";
import LoadPage from "../common/common.components/common.components.loadPage";
import ArticleIntro from './components/main.component.article';
import InformationIntro from './components/main.component.information';
import GameIntro from './components/main.component.game';

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
          <ArticleIntro onLink={onLink} />
          <InformationIntro onLink={onLink} />
          <GameIntro onLink={onLink} />
        </div>
      </div>
      <Portal>
        <LoadPage isLoad={isLoad} />
      </Portal>
    </div>
  );
};
export default MainPage;
