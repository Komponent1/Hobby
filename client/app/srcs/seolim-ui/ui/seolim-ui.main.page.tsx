import {Typography} from '@seolim/designsystem';
import React from 'react';
import CodeBox from '../component/seolim-ui.component.codeBox';
import packageJson from '../../../package.json';

const MainPage: React.FC = () => (
  <div className="p-8">
    <Typography element="p" size="3xl" weight="bold">
      Seolim UI 컴포넌트 라이브러리
    </Typography>
    <Typography element="p" size="lg" weight="regular">
      Seolim UI는 React 기반의 다양한 UI 컴포넌트를 제공합니다.
      이 라이브러리를 통해 일관된 사용자 경험을 구현할 수 있습니다.
    </Typography>
    <div className="mt-4">
      <Typography element="p" size="lg" weight="regular">
        버전:
        {packageJson.dependencies['@seolim/designsystem'].replace('^', '')}
      </Typography>
    </div>

    <div className="mt-6">
      <Typography element="p" size="md" weight="regular">
        설치방법
      </Typography>
      <pre className="bg-gray-100 p-4 rounded mt-2 dark:bg-gray-800">
        <code>npm install @seolim/designsystem</code>
      </pre>
    </div>

    <div className="mt-6">
      <Typography element="p" size="md" weight="regular">
        시작하기
      </Typography>
      <div className="mt-2">
        <CodeBox>
          {`import React from 'react';
import { ThemeProvider } from '@seolim/designsystem';

const App: React.FC = () => (
  <ThemeProvider>
    <YourApp />
  </ThemeProvider>
);

export default App;`}
        </CodeBox>
      </div>
    </div>
  </div>
);

export default MainPage;
