/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import Image from 'next/image';
import React from 'react';
import {
  ArrowDownRight, CalendarPlusFill, Cart4, CartPlusFill, ChevronLeft, ChevronRight, Controller, FileEarmarkFill, InfoCircleFill,
  People,
  PersonPlusFill,
  PersonVcardFill,
  ThreeDotsVertical,
} from 'react-bootstrap-icons';

type Props = {
  name: string;
  size?: number;
  color?: string;
  onClick?: React.MouseEventHandler;
};
const Icon: React.FC<Props> = ({
  name, size = 24, color = "currentColor", onClick,
}) => {
  switch (name) {
    case "file_earmark_fill":
      return <FileEarmarkFill size={size} color={color} onClick={onClick} className={`${onClick ? 'cursor-pointer' : ''}`} />;
    case "arrow_down_right":
      return <ArrowDownRight size={size} color={color} onClick={onClick} className={`${onClick ? 'cursor-pointer' : ''}`} />;
    case "info_circle_fill":
      return <InfoCircleFill size={size} color={color} onClick={onClick} className={`${onClick ? 'cursor-pointer' : ''}`} />;
    case "controller":
      return <Controller size={size} color={color} onClick={onClick} className={`${onClick ? 'cursor-pointer' : ''}`} />;
    case "calendar_plus_fill":
      return <CalendarPlusFill size={size} color={color} onClick={onClick} className={`${onClick ? 'cursor-pointer' : ''}`} />;
    case "person_plus_fill":
      return <PersonPlusFill size={size} color={color} onClick={onClick} className={`${onClick ? 'cursor-pointer' : ''}`} />;
    case "cart_plus_fill":
      return <CartPlusFill size={size} color={color} onClick={onClick} />;
    case "person_vcard_fill":
      return <PersonVcardFill size={size} color={color} onClick={onClick} />;
    case "people_fill":
      return <People size={size} color={color} onClick={onClick} />;
    case "cart4":
      return <Cart4 size={size} color={color} onClick={onClick} />;
    case "three_dots_vertical":
      return <ThreeDotsVertical size={size} color={color} onClick={onClick} />;
    case "chevron_left":
      return <ChevronLeft size={size} color={color} onClick={onClick} className={`${onClick ? 'cursor-pointer' : ''}`} />;
    case "chevron_right":
      return <ChevronRight size={size} color={color} onClick={onClick} className={`${onClick ? 'cursor-pointer' : ''}`} />;
    case "steam":
      return (
        <div onClick={onClick}>
          <Image src="/icon/steam.svg" alt="Steam" width={size} height={size} />
        </div>
      );
    default:
      return null;
  }
};

export default Icon;
