import React from 'react';
import * as style from './style';

type Prop = {
  onClick: (idx: number) => void
  items?: { text: string, onClick: (e: React.MouseEvent) => void }[]
  select?: number
}
const TextMenuList: React.FC<Prop> = ({ items = [], select = -1, onClick }) => {

  return (
    <style.div>
      <style.listText
        select={select === -1}
        onClick={() => onClick(-1)}>
        전체보기
      </style.listText>
      {items.map((item: any, i: number) => (
        <style.listText key={i}
        onClick={(e: React.MouseEvent) => {
          item.onClick(e);
        }}
        select={select === i}>
          {item.text}
        </style.listText>
      ))}
    </style.div>
  )
};

export default TextMenuList;
