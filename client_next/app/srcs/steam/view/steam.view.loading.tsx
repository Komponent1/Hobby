import React from 'react';
import Image from 'next/image';
import {LoadingRange} from '../steam.enum';
import {ProgressBar, Typography} from '../../common/common.components';
import {STEAM_LOGO_RATIO} from '../../common/common.constant/common.constant.imageRatio';
import {LoadingText} from '../steam.constant';

type Props = {
  loadRange: LoadingRange;
};
const SteamViewLoading: React.FC<Props> = ({loadRange}) => (
  <div className="bg-cover bg-center h-screen w-screen grid place-items-center bg-black">
    <div className="absolute top-2">
      <Image src="/steam-logo.png" alt="Steam Logo" layout="fixed" width={1000} height={1000 * STEAM_LOGO_RATIO} className="-rotate-12" />
    </div>
    <div className="w-3/5 z-50">
      <Typography type="h2" color="text-white">
        {LoadingText[loadRange]}
      </Typography>
      <ProgressBar range={loadRange} bgCustomClass="h-3" barCustomClass="h-3" />
    </div>
    <div className="absolute bg-gradient-to-tr from-slate-600 to-slate-900 h-screen w-screen grid place-items-center opacity-90" />
  </div>
);

export default SteamViewLoading;
