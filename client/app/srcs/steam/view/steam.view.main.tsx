import React from "react";
import { Typography } from "@seolim/designsystem";
import CodeInput from "../components/steam.components.codeInput";
import { ImpactText } from "../../common/common.components";
import { BgBlurImage } from "../components";

type Props = {
  onSubmit: (steamid: string) => void;
};
const SteamViewMain: React.FC<Props> = ({ onSubmit }) => (
  <div className="bg-cover bg-center h-screen w-screen grid place-items-center bg-black">
    <BgBlurImage />
    <div className="z-50">
      <Typography size="4xl" color="white" weight="bold">
        {"내 "}
        <ImpactText text="스팀" />
        {" 정보를 확인해보자"}
      </Typography>
      <CodeInput onSubmit={onSubmit} />
    </div>
  </div>
);

export default SteamViewMain;
