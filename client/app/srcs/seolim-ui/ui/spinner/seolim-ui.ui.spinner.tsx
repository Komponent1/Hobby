import React from 'react';
import { Spinner, Button } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../../component';
import { examples } from './seolim-ui.ui.spinner.example';

const UiSpinner: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Spinner" />
      <Description text="로딩 상태를 표시하는 스피너 컴포넌트입니다." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="속성" />
      <PropsTable
        datas={[
          {
            name: 'size', type: 'sm | md | lg | number', default: 'md', description: '스피너의 크기입니다. 문자열 또는 픽셀 값을 지정할 수 있습니다.',
          },
          {
            name: 'variant', type: 'default | inverted', default: 'default', description: '스피너의 스타일 변형입니다.',
          },
          {
            name: 'color', type: 'string', default: '-', description: '스피너의 색상입니다.',
          },
        ]}
      />
    </div>

    <UiBox {...examples.basic}>
      <Title text="기본 사용법" />
      <Description text="기본 스피너입니다." />
      <div className="flex items-center justify-center p-8 bg-gray-50 rounded mt-4">
        <Spinner />
      </div>
    </UiBox>

    <UiBox {...examples.size}>
      <div className="space-y-6 mt-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">사전 정의된 크기</p>
          <div className="flex items-center gap-8 p-8 bg-gray-50 rounded">
            <div className="flex flex-col items-center gap-2">
              <Spinner size="sm" />
              <span className="text-xs text-gray-600">Small</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" />
              <span className="text-xs text-gray-600">Medium</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="lg" />
              <span className="text-xs text-gray-600">Large</span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-2">커스텀 픽셀 크기</p>
          <div className="flex items-center gap-8 p-8 bg-gray-50 rounded">
            <div className="flex flex-col items-center gap-2">
              <Spinner size={24} />
              <span className="text-xs text-gray-600">24px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size={40} />
              <span className="text-xs text-gray-600">40px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size={64} />
              <span className="text-xs text-gray-600">64px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size={80} />
              <span className="text-xs text-gray-600">80px</span>
            </div>
          </div>
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.variant}>
      <div className="space-y-6 mt-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">Default (시계 방향 회전)</p>
          <div className="flex items-center justify-center gap-8 p-8 bg-gray-50 rounded">
            <Spinner variant="default" size="sm" />
            <Spinner variant="default" size="md" />
            <Spinner variant="default" size="lg" />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-2">Inverted (반시계 방향 회전)</p>
          <div className="flex items-center justify-center gap-8 p-8 bg-gray-50 rounded">
            <Spinner variant="inverted" size="sm" />
            <Spinner variant="inverted" size="md" />
            <Spinner variant="inverted" size="lg" />
          </div>
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.color}>
      <div className="flex items-center gap-8 p-8 bg-gray-50 rounded mt-4 flex-wrap">
        <div className="flex flex-col items-center gap-2">
          <Spinner color="#3b82f6" size="lg" />
          <span className="text-xs text-gray-600">파란색</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Spinner color="#22c55e" size="lg" />
          <span className="text-xs text-gray-600">초록색</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Spinner color="#ef4444" size="lg" />
          <span className="text-xs text-gray-600">빨간색</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Spinner color="#a855f7" size="lg" />
          <span className="text-xs text-gray-600">보라색</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Spinner color="#f59e0b" size="lg" />
          <span className="text-xs text-gray-600">주황색</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Spinner color="#ec4899" size="lg" />
          <span className="text-xs text-gray-600">분홍색</span>
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.realworld}>
      <Title text="사용 예제" />
      <Description text="실제 사용 시나리오 예제입니다." />
      <div className="space-y-6 mt-4">
        <div>
          <p className="text-sm font-medium mb-2">페이지 로딩</p>
          <div className="flex flex-col items-center justify-center gap-3 p-12 bg-gray-50 rounded">
            <Spinner size="lg" />
            <p className="text-sm text-gray-600">페이지를 불러오는 중...</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">버튼 내부 로딩</p>
          <div className="flex gap-4">
            <Button
              variant="solid"
              color="#3b82f6"
              onClick={() => {}}
              content={(
                <div className="flex items-center gap-2">
                  <Spinner size="sm" color="#ffffff" />
                  <span>처리 중...</span>
                </div>
              )}
            />
            <Button
              variant="solid"
              color="#22c55e"
              onClick={() => {}}
              content={(
                <div className="flex items-center gap-2">
                  <Spinner size="sm" variant="inverted" color="#ffffff" />
                  <span>저장 중...</span>
                </div>
              )}
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">인라인 로딩</p>
          <div className="p-4 bg-gray-50 rounded">
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              <span className="text-sm text-gray-600">데이터를 가져오는 중입니다...</span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">카드 로딩</p>
          <div className="border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">사용자 정보</h3>
              <Spinner size="sm" color="#3b82f6" />
            </div>
            <p className="text-sm text-gray-600">사용자 데이터를 불러오는 중...</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">오버레이 로딩</p>
          <div className="relative p-8 bg-gray-100 rounded">
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded">
              <div className="flex flex-col items-center gap-3">
                <Spinner size={48} color="#3b82f6" />
                <p className="text-sm font-medium text-gray-700">잠시만 기다려주세요...</p>
              </div>
            </div>
            <div className="text-gray-400">
              <h3 className="text-xl font-bold mb-2">콘텐츠 영역</h3>
              <p>이 영역은 로딩이 완료될 때까지 가려집니다.</p>
            </div>
          </div>
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.combination}>
      <Title text="조합" />
      <Description text="다양한 속성을 조합하여 커스텀 스피너를 만들 수 있습니다." />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        <div className="flex flex-col items-center gap-2 p-6 bg-gray-50 rounded">
          <Spinner size="sm" color="#3b82f6" />
          <span className="text-xs text-gray-600">Small + Blue</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-6 bg-gray-50 rounded">
          <Spinner size="md" color="#22c55e" />
          <span className="text-xs text-gray-600">Medium + Green</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-6 bg-gray-50 rounded">
          <Spinner size="lg" color="#ef4444" />
          <span className="text-xs text-gray-600">Large + Red</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-6 bg-gray-50 rounded">
          <Spinner size="sm" variant="inverted" />
          <span className="text-xs text-gray-600">Small + 반시계</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-6 bg-gray-50 rounded">
          <Spinner size={56} variant="inverted" />
          <span className="text-xs text-gray-600">56px + 반시계</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-6 bg-gray-50 rounded">
          <Spinner size={72} color="#a855f7" />
          <span className="text-xs text-gray-600">72px + Purple</span>
        </div>
      </div>
    </UiBox>
  </div>
);

export default UiSpinner;
