import React, { useState } from 'react';
import * as style from './style';

type Prop = {
  items?: { text: string, onClick: (e: React.MouseEvent) => void }[]
  select?: number
}
const TextMenuList: React.FC<Prop> = ({ items = [], select = -1}) => {

  return (
    <style.div>
      {items.map((item: any, i: number) => (
        <style.listText key={i} onClick={(e: React.MouseEvent) => {
          item.onClick(e);
        }} select={select === i}>
          {item.text}
        </style.listText>
      ))}
    </style.div>
  )
};

export default TextMenuList;
