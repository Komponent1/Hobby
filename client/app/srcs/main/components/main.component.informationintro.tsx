import React, { useMemo } from 'react';
import {Badge, Typography} from '@seolim/designsystem';
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
          <Typography element="p" type="primary" size="xl" weight="bold">
            {`총 정보 수 : ${informationList.length}`}
          </Typography>
          <ul className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="hard" size="md" text={tag} />
            ))}
          </ul>
        </div>
        )}
    />

  );
};

export default InformationIntro;
