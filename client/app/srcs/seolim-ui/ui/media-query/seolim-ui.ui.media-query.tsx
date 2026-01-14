import React from 'react';
import {
  Divider, Sidebar, Typography, useMediaQuery,
} from '@seolim/designsystem';
import {
  Description, HeadBox, Title, UiBox,
} from '../../component';
import {examples} from './seolim-ui.ui.media-query.example';

const UiMediaQuery: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isPortrait = useMediaQuery('(orientation: portrait)');

  return (
    <div className="space-y-6">
      <HeadBox>
        <Title text="Theme" />
        <Description text="디자인의 테마를 결정할 수 있습니다." />
      </HeadBox>

      <UiBox {...examples.basic}>
        <div className="p-4">
          {isDesktop ? (
            <p>현재 화면은 데스크탑 크기입니다.</p>
          ) : (
            <p>현재 화면은 모바일 또는 태블릿 크기입니다.</p>
          )}
        </div>
      </UiBox>

      <UiBox {...examples.check}>
        <div className="p-4">
          <Typography type="primary" size="xl" weight="bold" className="mb-4">
            현재 화면 상태
          </Typography>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isMobile ? 'bg-green-600' : 'bg-red-600'
                }`}
              />
              <Typography>
                모바일 (≤768px):
                {isMobile ? '✅' : '❌'}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isTablet ? 'bg-green-600' : 'bg-red-600'
                }`}
              />
              <Typography>
                태블릿 (769px~1024px):
                {isTablet ? '✅' : '❌'}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isDesktop ? 'bg-green-600' : 'bg-red-600'
                }`}
              />
              <Typography>
                데스크톱 (≥1025px):
                {isDesktop ? '✅' : '❌'}
              </Typography>
            </div>
            <Divider />
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isDarkMode ? 'bg-green-600' : 'bg-red-600'
                }`}
              />
              <Typography>
                다크 모드 선호:
                {isDarkMode ? '✅' : '❌'}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isPortrait ? 'bg-green-600' : 'bg-red-600'
                }`}
              />
              <Typography>
                세로 방향:
                {isPortrait ? '✅' : '❌'}
              </Typography>
            </div>
          </div>
        </div>
      </UiBox>

      <UiBox {...examples.example}>
        <div className="p-4 relative">
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
        </div>
      </UiBox>

    </div>
  );
};

export default UiMediaQuery;
