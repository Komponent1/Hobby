export const examples = {
  basic: {
    title: '기본 사용법',
    description: 'useMediaQuery 훅을 사용하여 미디어 쿼리를 적용하는 예시입니다.',
    codeContent: `
import React from 'react';
import { useMediaQuery } from '@seolim/designsystem';

const ExampleComponent: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  return (
    <div>
      {isDesktop ? (
        <p>현재 화면은 데스크탑 크기입니다.</p>
      ) : (
        <p>현재 화면은 모바일 또는 태블릿 크기입니다.</p>
      )}
    </div>
  );
};`,
  },
  check: {
    title: 'useMediaQuery 훅으로 상태 확인',
    description: '다양한 미디어 쿼리 상태를 확인하는 예시입니다.',
    codeContent: `
import React from 'react';
import { useMediaQuery } from '@seolim/designsystem';

const ExampleComponent: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isPortrait = useMediaQuery('(orientation: portrait)');

  return (
    <div>
      <Typography type="primary" size="xl" weight="bold" className="mb-4">
        현재 화면 상태
      </Typography>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div
            className={\`w-3 h-3 rounded-full \${
              isMobile ? 'bg-green-600' : 'bg-red-600'
            }\`}
          />
          <Typography>
            모바일 (≤768px):
            {isMobile ? '✅' : '❌'}
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={\`w-3 h-3 rounded-full \${
              isTablet ? 'bg-green-600' : 'bg-red-600'
            }\`}
          />
          <Typography>
            태블릿 (769px~1024px):
            {isTablet ? '✅' : '❌'}
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={\`w-3 h-3 rounded-full \${
              isDesktop ? 'bg-green-600' : 'bg-red-600'
            }\`}
          />
          <Typography>
            데스크톱 (≥1025px):
            {isDesktop ? '✅' : '❌'}
          </Typography>
        </div>
        <Divider />
        <div className="flex items-center gap-2">
          <div
            className={\`w-3 h-3 rounded-full \${
              isDarkMode ? 'bg-green-600' : 'bg-red-600'
            }\`}
          />
          <Typography>
            다크 모드 선호:
            {isDarkMode ? '✅' : '❌'}
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={\`w-3 h-3 rounded-full \${
              isPortrait ? 'bg-green-600' : 'bg-red-600'
            }\`}
          />
          <Typography>
            세로 방향:
            {isPortrait ? '✅' : '❌'}
          </Typography>
        </div>
      </div>
    </div>
  );
};`,
  },

  example: {
    title: '실제 예시',
    description: '화면 크기와 모드에 따라 다른 스타일을 적용하는 실제 예시입니다.',
    codeContent: `
import React from 'react';
import { useMediaQuery } from '@seolim/designsystem';

const ResponsiveComponent: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  
  return (
    <Sidebar variant={isDesktop ? "alwaysOpen" : "collapsible"} position="left" style={{position: 'relative' }}>
      <div
        className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <Typography element="p">
          Sidebar의 media-query 활용
        </Typography>
        <Typography element="p">
          현재 화면 크기에 따라
        </Typography>
        <Typography element="p">
          사이드바가 항상 열리거나
        </Typography>
        <Typography element="p">
          접히도록 설정했습니다.
        </Typography>
      </div>
    </Sidebar>
  );
`,
  },
};
