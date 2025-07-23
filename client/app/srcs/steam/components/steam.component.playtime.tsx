import React from 'react';

type Props = {
  playTime: number;
};
const PlayTime: React.FC<Props> = ({ playTime }) => {
  const hours = Math.floor(playTime / 60);
  const days = Math.floor(hours / 24);

  return (
    <div className="text-white text-2xl font-bold relative z-10 justify-between items-center flex flex-col h-full p-6 text-shadow">
      <h1>총 플레이 타임</h1>
      <div>
        <h1 className="text-5xl">
          {`${hours} 시간`}
        </h1>
      </div>
      <p>
        {`${days} 일+`}
      </p>
    </div>
  );
};

export default PlayTime;
