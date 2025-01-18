import React from 'react';
import CodeInput from '../components/steam.components.codeInput';
import { ImpactText, Typography } from "../../common/common.components";
import { BgBlurImage } from "../components";

type Props = {
  getDataWithSteamCode: (steamid: string) => void;
};
const SteamViewMain: React.FC<Props> = ({
  getDataWithSteamCode,
}) => (
  <div className="bg-cover bg-center h-screen w-screen grid place-items-center bg-black">
    <BgBlurImage />
    <div className="z-50">
      <Typography type="h1" color="text-white">
        {'내 '}
        <ImpactText text="스팀" />
        {' 정보를 확인해보자'}
      </Typography>
      <CodeInput onSubmit={getDataWithSteamCode} />
    </div>
  </div>
);

export default SteamViewMain;
