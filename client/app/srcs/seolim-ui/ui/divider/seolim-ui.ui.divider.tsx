import React from 'react';
import { Divider } from '@seolim/designsystem';
import {
  HeadBox,
  PropsTable,
  Title,
  Description,
  UiBox,
} from '../../component';
import { examples, propsTable } from './seolim-ui.ui.divider.example';

const UiDivider: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Divider" />
      <Description text="콘텐츠를 구분하는 구분선 컴포넌트입니다." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="속성" />
      <PropsTable datas={propsTable} />
    </div>

    <UiBox {...examples.basic}>
      <div className="mt-4">
        <p>첫 번째 섹션</p>
        <Divider />
        <p>두 번째 섹션</p>
      </div>
    </UiBox>

    <UiBox {...examples.orientation}>
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

    <UiBox {...examples.type}>
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

    <UiBox {...examples.thickness}>
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

    <UiBox {...examples.color}>
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

    <UiBox {...examples.verticalHeight}>
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

    <UiBox {...examples.withText}>
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

    <UiBox {...examples.example}>
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
