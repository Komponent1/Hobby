import React from 'react';
import { Badge, ContentBadge } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../component';

const UiBadge: React.FC = () => (
  <div className="space-y-8">
    <HeadBox>
      <Title text="Badge" />
      <Description text="작은 상태 표시기와 라벨입니다." />
    </HeadBox>

    {/* Badge Section */}
    <div className="space-y-6">
      <div className="space-y-4">
        <Title text="Badge" />
        <Description text="text prop을 사용하는 간단한 텍스트 기반 배지입니다." />
        <PropsTable
          datas={[
            { name: 'text', type: 'string', description: '배지 내부에 표시될 텍스트입니다.' },
            { name: 'variant', type: 'hard | soft | outlined', description: '배지의 시각적 스타일입니다.' },
            { name: 'size', type: 'sm | md | lg', description: '배지의 크기입니다.' },
            { name: 'corner', type: 'rounded | square', description: '배지의 모서리 스타일입니다.' },
            { name: 'color', type: 'string', description: '배지의 색상입니다.' },
          ]}
        />
      </div>

      <UiBox>
        <Title text="변형" />
        <Description text="배지 변형에는 하드, 소프트, 아웃라인 스타일이 포함됩니다." />
        <div className="flex gap-3 mt-4 flex-wrap">
          <Badge text="하드" variant="hard" />
          <Badge text="소프트" variant="soft" />
          <Badge text="아웃라인" variant="outlined" />
        </div>
      </UiBox>

      <UiBox>
        <Title text="크기" />
        <Description text="배지 크기는 작은 것부터 큰 것까지 다양합니다." />
        <div className="flex gap-3 mt-4 items-center flex-wrap">
          <Badge text="작은" size="sm" />
          <Badge text="중간" size="md" />
          <Badge text="큰" size="lg" />
        </div>
      </UiBox>

      <UiBox>
        <Title text="모서리" />
        <Description text="배지 모서리 스타일에는 둥근 모서리와 사각 모서리가 있습니다." />
        <div className="flex gap-3 mt-4 flex-wrap">
          <Badge text="둥근" corner="rounded" />
          <Badge text="사각" corner="square" />
        </div>
      </UiBox>

      <UiBox>
        <Title text="예제" />
        <Description text="일반적인 배지 사용 사례와 예제입니다." />
        <div className="space-y-4 mt-4">
          <div className="flex gap-2 items-center flex-wrap">
            <span className="text-sm text-gray-600">상태:</span>
            <Badge text="활성" variant="soft" size="sm" />
            <Badge text="대기" variant="outlined" size="sm" />
            <Badge text="비활성" variant="hard" size="sm" />
          </div>

          <div className="flex gap-2 items-center flex-wrap">
            <span className="text-sm text-gray-600">우선순위:</span>
            <Badge text="높음" variant="hard" size="sm" />
            <Badge text="중간" variant="soft" size="sm" />
            <Badge text="낮음" variant="outlined" size="sm" />
          </div>

          <div className="flex gap-2 items-center flex-wrap">
            <span className="text-sm text-gray-600">카테고리:</span>
            <Badge text="React" variant="soft" size="sm" />
            <Badge text="TypeScript" variant="soft" size="sm" />
            <Badge text="UI" variant="soft" size="sm" />
          </div>
        </div>
      </UiBox>
    </div>

    {/* ContentBadge Section */}
    <div className="space-y-6 border-t pt-8">
      <div className="space-y-4">
        <Title text="ContentBadge" />
        <Description text="복잡한 콘텐츠를 위해 React.ReactNode children을 받는 고급 배지입니다." />
        <PropsTable
          datas={[
            { name: 'children', type: 'React.ReactNode', description: '배지 내부에 표시될 콘텐츠입니다.' },
            { name: 'variant', type: 'hard | soft | outlined', description: '배지의 시각적 스타일입니다.' },
            { name: 'size', type: 'sm | md | lg', description: '배지의 크기입니다.' },
            { name: 'corner', type: 'rounded | square', description: '배지의 모서리 스타일입니다.' },
            { name: 'color', type: 'string', description: '배지의 색상입니다.' },
          ]}
        />
      </div>

      <UiBox>
        <Title text="아이콘과 함께" />
        <Description text="상태 표시기와 아이콘이 있는 ContentBadge입니다." />
        <div className="flex gap-3 mt-4 flex-wrap">
          <ContentBadge variant="soft">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              활성
            </span>
          </ContentBadge>
          <ContentBadge variant="outlined">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              오류
            </span>
          </ContentBadge>
          <ContentBadge variant="hard">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              경고
            </span>
          </ContentBadge>
        </div>
      </UiBox>

      <UiBox>
        <Title text="복잡한 콘텐츠" />
        <Description text="다양한 콘텐츠 유형을 가진 ContentBadge입니다." />
        <div className="flex gap-3 mt-4 flex-wrap">
          <ContentBadge variant="hard">
            <span className="font-bold">새로운</span>
          </ContentBadge>
          <ContentBadge variant="soft">
            <span className="flex items-center gap-1">
              <span>🔥</span>
              인기
            </span>
          </ContentBadge>
          <ContentBadge variant="outlined">
            <span className="flex flex-col text-center">
              <span className="text-xs">수량</span>
              <span className="font-bold">42</span>
            </span>
          </ContentBadge>
        </div>
      </UiBox>
    </div>
  </div>
);

export default UiBadge;
