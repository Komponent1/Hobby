import React from 'react';
import { Divider } from '@seolim/designsystem';
import {
  HeadBox,
  PropsTable,
  Title,
  Description,
  UiBox,
} from '../component';

const UiDivider: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Divider" />
      <Description text="콘텐츠를 구분하는 구분선 컴포넌트입니다." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="속성" />
      <PropsTable
        datas={[
          {
            name: 'orientation', type: 'horizontal | vertical', default: 'horizontal', description: '구분선의 방향입니다.',
          },
          {
            name: 'thickness', type: 'number', default: '1', description: '구분선의 두께(px)입니다.',
          },
          {
            name: 'color', type: 'string', default: '-', description: '구분선의 색상입니다.',
          },
          {
            name: 'type', type: 'fullWidth | inset | middle', default: 'fullWidth', description: '구분선의 스타일 타입입니다.',
          },
          {
            name: 'children', type: 'React.ReactNode', default: '-', description: '구분선 안에 표시할 텍스트나 요소입니다.',
          },
          {
            name: 'childrenPosition', type: 'center | left | right', default: 'center', description: 'children의 위치입니다.',
          },
          {
            name: 'verticalHeight', type: 'number', default: '100', description: '수직 구분선의 높이(px)입니다.',
          },
        ]}
      />
    </div>

    <UiBox>
      <Title text="기본 사용법" />
      <Description text="기본적인 수평 구분선입니다." />
      <div className="mt-4">
        <p>첫 번째 섹션</p>
        <Divider />
        <p>두 번째 섹션</p>
      </div>
    </UiBox>

    <UiBox>
      <Title text="방향" />
      <Description text="orientation 속성으로 구분선의 방향을 변경할 수 있습니다." />
      <div className="space-y-6 mt-4">
        <div>
          <p className="text-sm font-medium mb-3">Horizontal (기본)</p>
          <div>
            <p>콘텐츠 A</p>
            <Divider orientation="horizontal" />
            <p>콘텐츠 B</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium mb-3">Vertical</p>
          <div className="flex items-center gap-4">
            <p>왼쪽</p>
            <Divider orientation="vertical" verticalHeight={80} />
            <p>가운데</p>
            <Divider orientation="vertical" verticalHeight={80} />
            <p>오른쪽</p>
          </div>
        </div>
      </div>
    </UiBox>

    <UiBox>
      <Title text="타입" />
      <Description text="type 속성으로 구분선의 스타일을 변경할 수 있습니다." />
      <div className="space-y-6 mt-4">
        <div>
          <p className="text-sm font-medium mb-3">Full Width (기본)</p>
          <Divider type="fullWidth" />
        </div>
        <div>
          <p className="text-sm font-medium mb-3">Inset</p>
          <Divider type="inset" />
        </div>
        <div>
          <p className="text-sm font-medium mb-3">Middle</p>
          <Divider type="middle" />
        </div>
      </div>
    </UiBox>

    <UiBox>
      <Title text="두께" />
      <Description text="thickness 속성으로 구분선의 두께를 조절할 수 있습니다." />
      <div className="space-y-6 mt-4">
        <div>
          <p className="text-sm font-medium mb-3">1px (기본)</p>
          <Divider thickness={1} />
        </div>
        <div>
          <p className="text-sm font-medium mb-3">2px</p>
          <Divider thickness={2} />
        </div>
        <div>
          <p className="text-sm font-medium mb-3">4px</p>
          <Divider thickness={4} />
        </div>
      </div>
    </UiBox>

    <UiBox>
      <Title text="색상" />
      <Description text="color 속성으로 구분선의 색상을 변경할 수 있습니다." />
      <div className="space-y-6 mt-4">
        <div>
          <p className="text-sm font-medium mb-3">기본 회색</p>
          <Divider />
        </div>
        <div>
          <p className="text-sm font-medium mb-3">파란색</p>
          <Divider color="#3b82f6" />
        </div>
        <div>
          <p className="text-sm font-medium mb-3">빨간색</p>
          <Divider color="#ef4444" thickness={2} />
        </div>
      </div>
    </UiBox>

    <UiBox>
      <Title text="수직 구분선 높이" />
      <Description text="verticalHeight 속성으로 수직 구분선의 높이를 지정할 수 있습니다." />
      <div className="space-y-6 mt-4">
        <div>
          <p className="text-sm font-medium mb-3">다양한 높이</p>
          <div className="flex items-center gap-4">
            <span>40px</span>
            <Divider orientation="vertical" verticalHeight={40} />
            <span>60px</span>
            <Divider orientation="vertical" verticalHeight={60} />
            <span>80px</span>
            <Divider orientation="vertical" verticalHeight={80} />
            <span>100px</span>
            <Divider orientation="vertical" verticalHeight={100} />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium mb-3">두께와 색상 조합</p>
          <div className="flex items-center gap-4">
            <span>메뉴 1</span>
            <Divider orientation="vertical" verticalHeight={50} thickness={2} color="#3b82f6" />
            <span>메뉴 2</span>
            <Divider orientation="vertical" verticalHeight={50} thickness={2} color="#3b82f6" />
            <span>메뉴 3</span>
          </div>
        </div>
      </div>
    </UiBox>

    <UiBox>
      <Title text="텍스트가 있는 구분선" />
      <Description text="children 속성으로 구분선에 텍스트나 요소를 추가할 수 있습니다." />
      <div className="space-y-6 mt-4">
        <div>
          <p className="text-sm font-medium mb-3">Center (기본)</p>
          <Divider childrenPosition="center">또는</Divider>
        </div>
        <div>
          <p className="text-sm font-medium mb-3">Left</p>
          <Divider childrenPosition="left">중요</Divider>
        </div>
        <div>
          <p className="text-sm font-medium mb-3">Right</p>
          <Divider childrenPosition="right">더보기</Divider>
        </div>
      </div>
    </UiBox>

    <UiBox>
      <Title text="실제 사용 예제" />
      <Description text="다양한 콘텐츠 구분을 위한 실용적인 예제입니다." />
      <div className="space-y-8 mt-4">
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-bold">사용자 프로필</h3>
          <Divider thickness={2} color="#3b82f6" />
          <div className="py-4">
            <p className="font-medium">홍길동</p>
            <p className="text-sm text-gray-600">hong@example.com</p>
          </div>
          <Divider>개인 정보</Divider>
          <div className="py-4 space-y-2">
            <p className="text-sm">전화: 010-1234-5678</p>
            <p className="text-sm">주소: 서울특별시</p>
          </div>
          <Divider>계정 설정</Divider>
          <div className="py-4">
            <p className="text-sm text-gray-600">마지막 로그인: 2024-01-15</p>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">메뉴</h3>
          <div className="flex gap-6 items-center">
            <button type="button" className="text-blue-600 hover:underline">홈</button>
            <Divider orientation="vertical" verticalHeight={24} />
            <button type="button" className="text-blue-600 hover:underline">소개</button>
            <Divider orientation="vertical" verticalHeight={24} />
            <button type="button" className="text-blue-600 hover:underline">서비스</button>
            <Divider orientation="vertical" verticalHeight={24} />
            <button type="button" className="text-blue-600 hover:underline">연락처</button>
          </div>
        </div>
      </div>
    </UiBox>
  </div>
);

export default UiDivider;
