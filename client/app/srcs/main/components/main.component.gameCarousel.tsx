import React, { useMemo } from 'react';
import Image from 'next/image';
import {Carousel} from '@seolim/designsystem';
import GameJson from '../../game/game-list.json';

const GameCarousel: React.FC = () => {
  const gameList = useMemo(() => Object.values(GameJson).splice(-3).reverse(), []);

  return (
    <div className="rounded-lg overflow-hidden">
      <Carousel showButtons={false}>
        {gameList.map((game) => (
          <div key={game.title} className="min-w-full h-36 relative">
            <Image
              src={game.thumbnail}
              alt={game.title}
              fill
              className="object-cover rounded"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default GameCarousel;
