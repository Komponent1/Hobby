import React, { useMemo } from 'react';
import InformationJson from '../../informations/posts/informations.json';
import { SimpleCard } from './main.component.simplecard';

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
    <SimpleCard
      icon="info_circle_fill"
      iconBackground="bg-yellow-500"
      title="개발 팁"
      description="개발 간결 팁 저장소"
      onLink={() => onLink('/informations')}
      etc={(
        <div>
          <p className="text-gray-300 py-1 text-lg mb-4 font-extrabold">
            {`총 정보 수 : ${informationList.length}`}
          </p>
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
        )}
    />

  );
};

export default InformationIntro;
