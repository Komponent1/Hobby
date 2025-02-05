import React from 'react';
import {LoadingRange} from '../steam.enum';
import {ProgressBar, Typography} from '../../common/common.components';
import {LoadingText} from '../steam.constant';
import { BgBlurImage } from "../components";

type Props = {
  loadRange: LoadingRange;
};
const SteamViewLoading: React.FC<Props> = ({loadRange}) => (
  <div className="bg-cover bg-center h-screen w-screen grid place-items-center bg-black">
    <BgBlurImage />
    <div className="w-3/5 z-50">
      <Typography type="h2" color="text-white">
        {LoadingText[loadRange]}
      </Typography>
      <ProgressBar range={loadRange} bgCustomClass="h-3" barCustomClass="h-3" />
    </div>
  </div>
);

export default SteamViewLoading;
