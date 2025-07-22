import Image from 'next/image';
import React from 'react';
import {
  ArrowDownRight, Controller, FileEarmarkFill, InfoCircleFill,
} from 'react-bootstrap-icons';

type Props = {
  name: string;
  size?: number;
  color?: string;
};
const Icon: React.FC<Props> = ({ name, size = 24, color = "currentColor" }) => {
  switch (name) {
    case "file_earmark_fill":
      return <FileEarmarkFill size={size} color={color} />;
    case "arrow_down_right":
      return <ArrowDownRight size={size} color={color} />;
    case "info_circle_fill":
      return <InfoCircleFill size={size} color={color} />;
    case "controller":
      return <Controller size={size} color={color} />;
    case "steam":
      return (
        <div>
          <Image src="/icon/steam.svg" alt="Steam" width={size} height={size} />
        </div>
      );
    default:
      return null;
  }
};

export default Icon;
