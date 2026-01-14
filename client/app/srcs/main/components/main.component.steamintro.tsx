import React from 'react';
import Image from 'next/image';
import {Badge} from '@seolim/designsystem';
import { SimpleCard } from './main.component.simplecard';

type Props = {
  onLink: (path: string) => void;
};
const tags = ['총 플탐', '1000원당 플탐', '총 구매 금액'];
const SteamIntro: React.FC<Props> = ({ onLink }) => (
  <SimpleCard
    icon="steam"
    iconBackground="bg-gray-600"
    title="스팀 돌아보기"
    description="스팀 정보 돌아보기"
    onLink={() => onLink('/steam')}
    etc={(
      <div className="relative">
        <Image
          src="/icon/steam.svg"
          alt="Steam Logo"
          width={300}
          height={300}
          className="absolute -bottom-24 -right-24 opacity-30 -z-0"
        />
        <ul className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <div className="z-10" key={tag}>
              <Badge variant="hard" text={tag} />
            </div>
          ))}
        </ul>
      </div>
    )}
  />
);

export default SteamIntro;
