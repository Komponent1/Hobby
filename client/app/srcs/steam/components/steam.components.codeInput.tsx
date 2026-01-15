import React, { useState } from "react";
import { Input, Tooltip, Typography, useTheme } from "@seolim/designsystem";

type Props = {
  onSubmit: (code: string) => void;
};
const CodeInput: React.FC<Props> = ({ onSubmit }) => {
  const { theme } = useTheme();
  const [code, setCode] = useState<string>("");

  return (
    <div className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mt-10">
      <div className="flex align-center items-center mb-5 gap-4">
        <Typography size="md" weight="bold" color={theme.color.primary.main}>
          스팀 코드
        </Typography>
        <Tooltip
          content="스팀 > 우측 상단 계정 > 계정정보 > 좌 상단 ID 확인"
          width={400}
        >
          <div className="border-2 rounded-full text-slate-300 bg-opacity-0 font-extrabold border-slate-300 text-center w-5 h-5 flex justify-center items-center text-xs hover:bg-slate-300 hover:text-slate-900">
            ?
          </div>
        </Tooltip>
      </div>
      <Input
        value={code}
        onChange={setCode}
        withSubmitButton
        onClickSubmitButton={() => onSubmit(code)}
      />
    </div>
  );
};

export default CodeInput;
