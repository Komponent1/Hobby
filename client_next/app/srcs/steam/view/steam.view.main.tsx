import React from 'react';
import Image from 'next/image';
import CodeInput from '../components/steam.components.codeInput';
import { ImpactText, Typography } from "../../common/common.components";
import { STEAM_LOGO_RATIO } from "../../common/common.constant/common.constant.imageRatio";

type Props = {
  getDataWithSteamCode: (steamid: string) => void;
};
const SteamViewMain: React.FC<Props> = ({
  getDataWithSteamCode,
}) => (
  <div className="bg-cover bg-center h-screen w-screen grid place-items-center bg-black">
    <div className="absolute top-2">
      <Image src="/steam-logo.png" alt="Steam Logo" layout="fixed" width={1000} height={1000 * STEAM_LOGO_RATIO} className="-rotate-12" />
    </div>
    <div className="z-50">
      <Typography type="h1" color="text-white">
        {'내 '}
        <ImpactText text="스팀" />
        {' 정보를 확인해보자'}
      </Typography>
      <CodeInput onSubmit={getDataWithSteamCode} />
    </div>
    <div className="absolute bg-gradient-to-tr from-slate-600 to-slate-900 h-screen w-screen grid place-items-center opacity-90" />
  </div>
);

export default SteamViewMain;
