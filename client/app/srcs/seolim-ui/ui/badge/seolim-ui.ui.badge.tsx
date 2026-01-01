import React from 'react';
import { Badge, ContentBadge } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../../component';
import { additionalPropsTable, examples, propsTable } from './seolim-ui.ui.badge.example';

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
        <PropsTable datas={propsTable} />
      </div>

      <UiBox {...examples.variant}>
        <div className="flex gap-3 mt-4 flex-wrap">
          <Badge text="하드" variant="hard" />
          <Badge text="소프트" variant="soft" />
          <Badge text="아웃라인" variant="outlined" />
        </div>
      </UiBox>

      <UiBox {...examples.size}>
        <div className="flex gap-3 mt-4 items-center flex-wrap">
          <Badge text="작은" size="sm" />
          <Badge text="중간" size="md" />
          <Badge text="큰" size="lg" />
        </div>
      </UiBox>

      <UiBox {...examples.corner}>
        <div className="flex gap-3 mt-4 flex-wrap">
          <Badge text="둥근" corner="rounded" />
          <Badge text="사각" corner="square" />
        </div>
      </UiBox>

      <UiBox {...examples.example}>
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
        <PropsTable datas={additionalPropsTable} />
      </div>

      <UiBox {...examples.icon}>
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

      <UiBox {...examples.content}>
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
