import React from 'react';
import {
  Skeleton,
} from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../component';

const UiSkeleton: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Skeleton" />
      <Description text="콘텐츠가 로딩 중일 때 표시하는 스켈레톤 컴포넌트입니다." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="속성" />
      <PropsTable
        datas={[
          {
            name: 'variant', type: 'simple | card', default: 'simple', description: '스켈레톤의 스타일 변형입니다.',
          },
          {
            name: 'lineCount', type: 'number', default: '3', description: '표시할 라인의 수입니다.',
          },
          {
            name: 'size', type: 'sm | md | lg', default: 'md', description: '스켈레톤의 크기입니다.',
          },
        ]}
      />
    </div>

    <UiBox>
      <Title text="기본 사용법" />
      <Description text="기본적인 스켈레톤 형태입니다." />
      <div className="p-8 mt-4">
        <Skeleton />
      </div>
    </UiBox>

    <UiBox>
      <Title text="변형" />
      <Description text="variant 속성으로 스켈레톤의 스타일을 변경할 수 있습니다." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <div>
          <p className="text-sm font-medium mb-4">Simple (기본)</p>
          <Skeleton variant="simple" />
        </div>
        <div>
          <p className="text-sm font-medium mb-4">Card</p>
          <Skeleton variant="card" />
        </div>
      </div>
    </UiBox>

    <UiBox>
      <Title text="라인 수" />
      <Description text="lineCount 속성으로 표시할 라인의 수를 지정할 수 있습니다." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        <div>
          <p className="text-sm font-medium mb-4">3 Lines</p>
          <Skeleton variant="simple" lineCount={3} />
        </div>
        <div>
          <p className="text-sm font-medium mb-4">5 Lines (기본)</p>
          <Skeleton variant="simple" lineCount={5} />
        </div>
        <div>
          <p className="text-sm font-medium mb-4">7 Lines</p>
          <Skeleton variant="simple" lineCount={7} />
        </div>
      </div>
    </UiBox>

    <UiBox>
      <Title text="크기" />
      <Description text="size 속성으로 스켈레톤의 크기를 조절할 수 있습니다." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        <div>
          <p className="text-sm font-medium mb-4">Small</p>
          <Skeleton variant="simple" size="sm" />
        </div>
        <div>
          <p className="text-sm font-medium mb-4">Medium (기본)</p>
          <Skeleton variant="simple" size="md" />
        </div>
        <div>
          <p className="text-sm font-medium mb-4">Large</p>
          <Skeleton variant="simple" size="lg" />
        </div>
      </div>
    </UiBox>
  </div>
);

export default UiSkeleton;
