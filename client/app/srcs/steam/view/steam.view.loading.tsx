import React from "react";
import { ProgressBar, Typography } from "../../common/common.components";
import { BgBlurImage } from "../components";

type Props = {
  loadRange: number;
};
const SteamViewLoading: React.FC<Props> = ({ loadRange }) => (
  <div className="bg-cover bg-center h-screen w-screen grid place-items-center bg-black">
    <BgBlurImage />
    <div className="w-3/5 z-50">
      <Typography type="h2" color="text-white">
        게임 정보를 불러오는 중 입니다.
      </Typography>
      <ProgressBar range={loadRange} />
    </div>
  </div>
);

export default SteamViewLoading;
