import React from 'react';
import { SimpleCard } from './main.component.simplecard';
import GameCarousel from './main.component.gameCarousel';

type Props = {
  onLink: (path: string) => void;
};
const GameIntro: React.FC<Props> = ({ onLink }) => (
  <SimpleCard
    icon="controller"
    iconBackground="bg-blue-500"
    title="웹 게임"
    description="웹 게임 저장소"
    onLink={() => onLink('/game')}
    etc={(
      <GameCarousel />
      )}
  />
);

export default GameIntro;
