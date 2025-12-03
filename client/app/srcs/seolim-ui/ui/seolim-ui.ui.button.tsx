import React from 'react';
import { Button } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../component';

const UiButton: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Button" />
      <Description text="사용자 행동을 위한 상호작용 버튼 컴포넌트입니다." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="속성" />
      <PropsTable
        datas={[
          { name: 'content', type: 'React.ReactNode', description: '버튼 내부에 표시될 콘텐츠입니다.' },
          { name: 'label', type: 'string', description: '접근성을 위한 aria-label 값입니다.' },
          { name: 'onClick', type: '() => void', description: '버튼 클릭 시 실행될 콜백 함수입니다.' },
          { name: 'variant', type: 'outline | solid | text', description: '버튼의 시각적 스타일입니다.' },
          { name: 'corner', type: 'rounded | square', description: '버튼의 모서리 스타일입니다.' },
          { name: 'size', type: 'sm | md | lg', description: '버튼의 크기입니다.' },
          { name: 'full', type: 'boolean', description: '버튼이 전체 너비를 차지할지 여부입니다.' },
          { name: 'color', type: 'string', description: '버튼의 배경 색상입니다.' },
          { name: 'textColor', type: 'string', description: '버튼의 텍스트 색상입니다.' },
          { name: 'disabled', type: 'boolean', description: '버튼이 비활성화될지 여부입니다.' },
        ]}
      />
    </div>

    <UiBox>
      <Title text="변형" />
      <Description text="버튼 변형에는 아웃라인, 솔리드, 텍스트 스타일이 포함됩니다." />
      <div className="space-y-3 mt-4">
        <Button content="아웃라인 버튼" variant="outline" onClick={() => {}} />
        <Button content="솔리드 버튼" variant="solid" onClick={() => {}} />
        <Button content="텍스트 버튼" variant="text" onClick={() => {}} />
      </div>
    </UiBox>

    <UiBox>
      <Title text="크기" />
      <Description text="버튼 크기는 작은 것부터 큰 것까지 다양합니다." />
      <div className="space-y-3 mt-4">
        <Button content="작은 버튼" size="sm" onClick={() => {}} />
        <Button content="중간 버튼" size="md" onClick={() => {}} />
        <Button content="큰 버튼" size="lg" onClick={() => {}} />
      </div>
    </UiBox>

    <UiBox>
      <Title text="모서리" />
      <Description text="버튼 모서리 스타일에는 둥근 모서리와 사각 모서리가 있습니다." />
      <div className="space-y-3 mt-4">
        <Button content="둥근 모서리 버튼" corner="rounded" onClick={() => {}} />
        <Button content="사각 모서리 버튼" corner="square" onClick={() => {}} />
      </div>
    </UiBox>

    <UiBox>
      <Title text="상태" />
      <Description text="버튼 상태에는 일반, 비활성화, 전체 너비가 있습니다." />
      <div className="space-y-3 mt-4">
        <Button content="일반 버튼" onClick={() => {}} />
        <Button content="비활성화 버튼" disabled onClick={() => {}} />
        <Button content="전체 너비 버튼" full onClick={() => {}} />
      </div>
    </UiBox>
  </div>
);

export default UiButton;
