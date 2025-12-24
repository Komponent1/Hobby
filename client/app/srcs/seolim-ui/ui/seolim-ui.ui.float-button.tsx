/* eslint-disable no-alert */
import React, { useState } from 'react';
import { FloatButton, FloatButtonItem } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../component';

const UiFloatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFixedButton, setShowFixedButton] = useState(true);

  return (
    <div className="space-y-6">
      <HeadBox>
        <Title text="FloatButton" />
        <Description text="화면에 고정된 플로팅 버튼 컴포넌트입니다. 여러 액션을 FloatButtonItem으로 제공할 수 있습니다." />
      </HeadBox>

      <div className="space-y-4">
        <Title text="FloatButton 속성" />
        <PropsTable
          datas={[
            {
              name: 'icon', type: 'React.ReactNode', default: '-', description: '플로팅 버튼에 표시될 아이콘입니다.',
            },
            {
              name: 'onClick', type: '() => void', default: '-', description: '버튼 클릭 시 실행될 콜백 함수입니다.',
            },
            {
              name: 'position', type: 'bottom-right | bottom-left | top-right | top-left', default: 'bottom-right', description: '플로팅 버튼의 화면상 위치입니다.',
            },
            {
              name: 'positionType', type: 'absolute | fixed', default: 'absolute', description: '플로팅 버튼의 위치 타입입니다. absolute는 부모 요소 기준, fixed는 뷰포트 기준입니다.',
            },
            {
              name: 'size', type: 'sm | md | lg', default: 'md', description: '플로팅 버튼의 크기입니다.',
            },
            {
              name: 'color', type: 'string', default: '-', description: '플로팅 버튼의 아이콘 색상입니다.',
            },
            {
              name: 'backgroundColor', type: 'string', default: '-', description: '플로팅 버튼의 배경 색상입니다.',
            },
            {
              name: 'children', type: 'React.ReactElement<FloatButtonItemProps>[]', default: '-', description: 'FloatButtonItem 컴포넌트들입니다.',
            },
          ]}
        />
      </div>

      <div className="space-y-4">
        <Title text="FloatButtonItem 속성" />
        <PropsTable
          datas={[
            {
              name: 'children', type: 'React.ReactNode', default: '-', description: 'FloatButtonItem에 표시될 콘텐츠입니다.',
            },
            {
              name: 'onClick', type: '() => void', default: '-', description: 'FloatButtonItem 클릭 시 실행될 콜백 함수입니다.',
            },
          ]}
        />
        <Description text="FloatButtonItem은 onClick 외에 다른 props를 받을 필요가 없습니다. children으로 아이콘이나 텍스트를 전달하고, onClick으로 클릭 동작을 정의하면 됩니다." />
      </div>

      <UiBox>
        <Title text="기본 사용법" />
        <Description text="FloatButton은 FloatButtonItem과 함께 사용됩니다. 각 FloatButtonItem은 onClick 핸들러를 가질 수 있습니다." />
        <div className="mt-4 relative h-[400px] border rounded-lg bg-gray-50">
          <FloatButton
            icon="+"
            position="bottom-right"
            positionType="absolute"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FloatButtonItem onClick={() => alert('첫 번째 액션')}>
              📝
            </FloatButtonItem>
            <FloatButtonItem onClick={() => alert('두 번째 액션')}>
              📷
            </FloatButtonItem>
            <FloatButtonItem onClick={() => alert('세 번째 액션')}>
              📁
            </FloatButtonItem>
          </FloatButton>
        </div>
      </UiBox>

      <UiBox>
        <Title text="위치" />
        <Description text="position 속성으로 플로팅 버튼의 위치를 지정할 수 있습니다." />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="relative h-[300px] border rounded-lg bg-gray-50">
            <p className="absolute top-2 left-2 text-sm text-gray-600">Bottom Right</p>
            <FloatButton
              icon="➕"
              position="bottom-right"
              positionType="absolute"
              size="sm"
              onClick={() => {}}
            >
              <FloatButtonItem onClick={() => {}}>🏠</FloatButtonItem>
              <FloatButtonItem onClick={() => {}}>⚙️</FloatButtonItem>
            </FloatButton>
          </div>
          <div className="relative h-[300px] border rounded-lg bg-gray-50">
            <p className="absolute top-2 left-2 text-sm text-gray-600">Bottom Left</p>
            <FloatButton
              icon="➕"
              position="bottom-left"
              positionType="absolute"
              size="sm"
              onClick={() => {}}
            >
              <FloatButtonItem onClick={() => {}}>🏠</FloatButtonItem>
              <FloatButtonItem onClick={() => {}}>⚙️</FloatButtonItem>
            </FloatButton>
          </div>
          <div className="relative h-[300px] border rounded-lg bg-gray-50">
            <p className="absolute top-2 left-2 text-sm text-gray-600">Top Right</p>
            <FloatButton
              icon="➕"
              position="top-right"
              positionType="absolute"
              size="sm"
              onClick={() => {}}
            >
              <FloatButtonItem onClick={() => {}}>🏠</FloatButtonItem>
              <FloatButtonItem onClick={() => {}}>⚙️</FloatButtonItem>
            </FloatButton>
          </div>
          <div className="relative h-[300px] border rounded-lg bg-gray-50">
            <p className="absolute top-2 left-2 text-sm text-gray-600">Top Left</p>
            <FloatButton
              icon="➕"
              position="top-left"
              positionType="absolute"
              size="sm"
              onClick={() => {}}
            >
              <FloatButtonItem onClick={() => {}}>🏠</FloatButtonItem>
              <FloatButtonItem onClick={() => {}}>⚙️</FloatButtonItem>
            </FloatButton>
          </div>
        </div>
      </UiBox>

      <UiBox>
        <Title text="크기" />
        <Description text="size 속성으로 플로팅 버튼의 크기를 조정할 수 있습니다." />
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="relative h-[300px] border rounded-lg bg-gray-50">
            <p className="absolute top-2 left-2 text-sm text-gray-600">Small</p>
            <FloatButton
              icon="+"
              position="bottom-right"
              positionType="absolute"
              size="sm"
              onClick={() => {}}
            >
              <FloatButtonItem onClick={() => {}}>📝</FloatButtonItem>
              <FloatButtonItem onClick={() => {}}>📷</FloatButtonItem>
            </FloatButton>
          </div>
          <div className="relative h-[300px] border rounded-lg bg-gray-50">
            <p className="absolute top-2 left-2 text-sm text-gray-600">Medium</p>
            <FloatButton
              icon="+"
              position="bottom-right"
              positionType="absolute"
              size="md"
              onClick={() => {}}
            >
              <FloatButtonItem onClick={() => {}}>📝</FloatButtonItem>
              <FloatButtonItem onClick={() => {}}>📷</FloatButtonItem>
            </FloatButton>
          </div>
          <div className="relative h-[300px] border rounded-lg bg-gray-50">
            <p className="absolute top-2 left-2 text-sm text-gray-600">Large</p>
            <FloatButton
              icon="+"
              position="bottom-right"
              positionType="absolute"
              size="lg"
              onClick={() => {}}
            >
              <FloatButtonItem onClick={() => {}}>📝</FloatButtonItem>
              <FloatButtonItem onClick={() => {}}>📷</FloatButtonItem>
            </FloatButton>
          </div>
        </div>
      </UiBox>

      <UiBox>
        <Title text="색상 커스터마이징" />
        <Description text="color와 backgroundColor 속성으로 플로팅 버튼의 색상을 커스터마이징할 수 있습니다." />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="relative h-[300px] border rounded-lg bg-gray-50">
            <p className="absolute top-2 left-2 text-sm text-gray-600">파란색 테마</p>
            <FloatButton
              icon="+"
              position="bottom-right"
              positionType="absolute"
              backgroundColor="#3b82f6"
              color="#ffffff"
              onClick={() => {}}
            >
              <FloatButtonItem onClick={() => {}}>🏠</FloatButtonItem>
              <FloatButtonItem onClick={() => {}}>⚙️</FloatButtonItem>
              <FloatButtonItem onClick={() => {}}>❤️</FloatButtonItem>
            </FloatButton>
          </div>
          <div className="relative h-[300px] border rounded-lg bg-gray-50">
            <p className="absolute top-2 left-2 text-sm text-gray-600">초록색 테마</p>
            <FloatButton
              icon="+"
              position="bottom-right"
              positionType="absolute"
              backgroundColor="#22c55e"
              color="#ffffff"
              onClick={() => {}}
            >
              <FloatButtonItem onClick={() => {}}>🏠</FloatButtonItem>
              <FloatButtonItem onClick={() => {}}>⚙️</FloatButtonItem>
              <FloatButtonItem onClick={() => {}}>❤️</FloatButtonItem>
            </FloatButton>
          </div>
          <div className="relative h-[300px] border rounded-lg bg-gray-50">
            <p className="absolute top-2 left-2 text-sm text-gray-600">보라색 테마</p>
            <FloatButton
              icon="+"
              position="bottom-right"
              positionType="absolute"
              backgroundColor="#a855f7"
              color="#ffffff"
              onClick={() => {}}
            >
              <FloatButtonItem onClick={() => {}}>🏠</FloatButtonItem>
              <FloatButtonItem onClick={() => {}}>⚙️</FloatButtonItem>
              <FloatButtonItem onClick={() => {}}>❤️</FloatButtonItem>
            </FloatButton>
          </div>
          <div className="relative h-[300px] border rounded-lg bg-gray-50">
            <p className="absolute top-2 left-2 text-sm text-gray-600">다크 테마</p>
            <FloatButton
              icon="+"
              position="bottom-right"
              positionType="absolute"
              backgroundColor="#1f2937"
              color="#ffffff"
              onClick={() => {}}
            >
              <FloatButtonItem onClick={() => {}}>🏠</FloatButtonItem>
              <FloatButtonItem onClick={() => {}}>⚙️</FloatButtonItem>
              <FloatButtonItem onClick={() => {}}>❤️</FloatButtonItem>
            </FloatButton>
          </div>
        </div>
      </UiBox>

      <UiBox>
        <Title text="사용 예제" />
        <Description text="실제 사용 시나리오 예제입니다." />
        <div className="space-y-6 mt-4">
          <div className="relative h-[400px] border rounded-lg bg-gray-50 p-4">
            <h3 className="text-lg font-semibold mb-2">소셜 공유 액션</h3>
            <p className="text-sm text-gray-600">다양한 소셜 미디어로 공유할 수 있는 플로팅 버튼입니다.</p>
            <FloatButton
              icon="📤"
              position="bottom-right"
              positionType="absolute"
              backgroundColor="#3b82f6"
              color="#ffffff"
              onClick={() => {}}
            >
              <FloatButtonItem onClick={() => alert('페이스북 공유')}>
                📘
              </FloatButtonItem>
              <FloatButtonItem onClick={() => alert('트위터 공유')}>
                🐦
              </FloatButtonItem>
              <FloatButtonItem onClick={() => alert('인스타그램 공유')}>
                📷
              </FloatButtonItem>
              <FloatButtonItem onClick={() => alert('링크 복사')}>
                🔗
              </FloatButtonItem>
            </FloatButton>
          </div>

          <div className="relative h-[400px] border rounded-lg bg-gray-50 p-4">
            <h3 className="text-lg font-semibold mb-2">빠른 작성 메뉴</h3>
            <p className="text-sm text-gray-600">다양한 컨텐츠를 빠르게 작성할 수 있는 플로팅 버튼입니다.</p>
            <FloatButton
              icon="✏️"
              position="bottom-right"
              positionType="absolute"
              backgroundColor="#22c55e"
              color="#ffffff"
              onClick={() => {}}
            >
              <FloatButtonItem onClick={() => alert('새 글 작성')}>
                📝
              </FloatButtonItem>
              <FloatButtonItem onClick={() => alert('사진 업로드')}>
                📷
              </FloatButtonItem>
              <FloatButtonItem onClick={() => alert('동영상 업로드')}>
                🎥
              </FloatButtonItem>
              <FloatButtonItem onClick={() => alert('파일 첨부')}>
                📎
              </FloatButtonItem>
            </FloatButton>
          </div>
        </div>
      </UiBox>

      <UiBox>
        <Title text="Position Type (Fixed)" />
        <Description text="positionType='fixed'를 사용하면 화면 스크롤과 관계없이 뷰포트 기준으로 고정됩니다. 버튼을 클릭하여 표시/숨김을 전환할 수 있습니다." />
        <div className="mt-4 space-y-4">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowFixedButton(!showFixedButton)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {showFixedButton ? '플로팅 버튼 숨기기' : '플로팅 버튼 보이기'}
            </button>
          </div>

          {showFixedButton && (
          <FloatButton
            icon="↑"
            position="bottom-right"
            positionType="fixed"
            backgroundColor="#6366f1"
            color="#ffffff"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <FloatButtonItem onClick={() => alert('홈으로')}>🏠</FloatButtonItem>
            <FloatButtonItem onClick={() => alert('설정')}>⚙️</FloatButtonItem>
            <FloatButtonItem onClick={() => alert('도움말')}>❓</FloatButtonItem>
          </FloatButton>
          )}
        </div>
      </UiBox>
    </div>
  );
};

export default UiFloatButton;
