import React, { useMemo } from 'react';
import InformationJson from '../../informations/posts/informations.json';
import FlipCard from './main.components.flipcard';

type Props = {
  onLink: (path: string) => void;
};
const InformationIntro: React.FC<Props> = ({ onLink }) => {
  const informationList = useMemo(() => Object.values(InformationJson), []);
  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    informationList.forEach((info) => {
      info.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).slice(0, 6);
  }, [informationList]);
  return (
    <div className="flex">
      <FlipCard
        front={(
          <div className="flex flex-col items-center h-full justify-center">
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-white">
              정보
            </h1>
          </div>
        )}
        back={(
          <div className="flex flex-col items-center h-full justify-center">
            <p className="font-normal text-gray-400">
              정보 저장소
            </p>
          </div>
        )}
        onClick={() => onLink('/informations')}
      />
      <div className="flex flex-col justify-center items-start ml-4">
        <h2 className="mb-8 text-xl font-bold tracking-tight text-white">
          {`총 정보 수 : ${informationList.length}`}
        </h2>
        <h2 className="mb-4 text-xl font-bold tracking-tight text-white">
          주요 태그
        </h2>
        <ul className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <li key={tag} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
              {tag}
            </li>
          ))}
          <li className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
            ...
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InformationIntro;
