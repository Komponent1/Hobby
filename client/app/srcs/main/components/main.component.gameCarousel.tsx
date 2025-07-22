import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import GameJson from '../../game/game-list.json';

const GameCarousel: React.FC = () => {
  const [gameList, setGameList] = useState(Object.values(GameJson).splice(-3).reverse());
  useEffect(() => {
    const interval = setInterval(() => {
      setGameList((prevList) => {
        const newList = [...prevList];
        const firstItem = newList.shift();
        if (firstItem) {
          newList.push(firstItem);
        }
        return newList;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [gameList]);

  return (
    <div className="w-64 h-36 flex overflow-hidden relative rounded-lg">
      {gameList.map((game, index) => (
        <div
          className={`w-64 h-36 absolute top-0 transition-transform duration-300 translate-x-${(index) * 64}`}
          key={game.title}
        >
          <Image
            src={game.thumbnail}
            alt={game.title}
            width={256}
            height={144}
            className="w-64 h-36"
          />
        </div>
      ))}
    </div>
  );
};

export default GameCarousel;
