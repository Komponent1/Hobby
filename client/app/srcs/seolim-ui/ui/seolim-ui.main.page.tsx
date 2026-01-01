import {Typography} from '@seolim/designsystem';
import React from 'react';

const MainPage: React.FC = () => (
  <div className="p-8">
    <Typography element="p" size="3xl" weight="bold">
      Seolim UI 컴포넌트 라이브러리
    </Typography>
    <Typography element="p" size="lg" weight="regular">
      Seolim UI는 React 기반의 모던하고 반응형 디자인 시스템으로, 다양한 UI 컴포넌트를 제공합니다.
      이 라이브러리를 통해 일관된 사용자 경험을 구현할 수 있습니다.
    </Typography>
    <div className="mt-4">
      <Typography element="p" size="lg" weight="regular">버전: 1.0.0</Typography>
      <Typography element="p" size="lg" weight="regular">작성자: Seolim</Typography>
    </div>

    <div className="mt-6">
      <Typography element="p" size="md" weight="regular">
        설치방법
      </Typography>
      <pre className="bg-gray-100 p-4 rounded mt-2">
        <code>npm install @seolim/designsystem</code>
      </pre>
    </div>
  </div>
);

export default MainPage;
