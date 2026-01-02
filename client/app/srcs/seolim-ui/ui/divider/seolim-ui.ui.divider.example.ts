export const propsTable = [
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
];
export const examples = {
  basic: {
    title: '기본 사용법',
    description: '기본적인 수평 구분선입니다.',
    codeContent: `import { Divider } from '@seolim/designsystem';

<p>첫 번째 섹션</p>
<Divider />
<p>두 번째 섹션</p>`,
  },
  orientation: {
    title: '방향',
    description: 'orientation 속성으로 구분선의 방향을 변경할 수 있습니다.',
    codeContent: `import { Divider } from '@seolim/designsystem';

// Horizontal (기본)
<p>콘텐츠 A</p>
<Divider orientation="horizontal" />
<p>콘텐츠 B</p>

// Vertical
<div className="flex items-center gap-4">
  <p>왼쪽</p>
  <Divider orientation="vertical" verticalHeight={80} />
  <p>가운데</p>
  <Divider orientation="vertical" verticalHeight={80} />
  <p>오른쪽</p>
</div>`,
  },
  type: {
    title: '타입',
    description: 'type 속성으로 구분선의 스타일을 변경할 수 있습니다.',
    codeContent: `import { Divider } from '@seolim/designsystem';

<Divider type="fullWidth" />
<Divider type="inset" />
<Divider type="middle" />`,
  },
  thickness: {
    title: '두께',
    description: 'thickness 속성으로 구분선의 두께를 조절할 수 있습니다.',
    codeContent: `import { Divider } from '@seolim/designsystem';

<Divider thickness={1} />
<Divider thickness={2} />
<Divider thickness={4} />`,
  },
  color: {
    title: '색상',
    description: 'color 속성으로 구분선의 색상을 변경할 수 있습니다.',
    codeContent: `import { Divider } from '@seolim/designsystem';

<Divider />
<Divider color="#3b82f6" />
<Divider color="#ef4444" thickness={2} />`,
  },
  verticalHeight: {
    title: '수직 구분선 높이',
    description: 'verticalHeight 속성으로 수직 구분선의 높이를 지정할 수 있습니다.',
    codeContent: `import { Divider } from '@seolim/designsystem';

// 다양한 높이
<Divider orientation="vertical" verticalHeight={40} />
<Divider orientation="vertical" verticalHeight={60} />
<Divider orientation="vertical" verticalHeight={80} />
<Divider orientation="vertical" verticalHeight={100} />

// 두께와 색상 조합
<Divider orientation="vertical" verticalHeight={50} thickness={2} color="#3b82f6" />`,
  },
  withText: {
    title: '텍스트가 있는 구분선',
    description: 'children 속성으로 구분선에 텍스트나 요소를 추가할 수 있습니다.',
    codeContent: `import { Divider } from '@seolim/designsystem';

<Divider childrenPosition="center">또는</Divider>
<Divider childrenPosition="left">중요</Divider>
<Divider childrenPosition="right">더보기</Divider>`,
  },
  example: {
    title: '실제 사용 예제',
    description: '다양한 콘텐츠 구분을 위한 실용적인 예제입니다.',
    codeContent: `import { Divider } from '@seolim/designsystem';

// 사용자 프로필
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

// 메뉴
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
</div>`,
  },
};
