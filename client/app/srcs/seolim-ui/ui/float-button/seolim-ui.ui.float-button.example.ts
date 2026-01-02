export const propsTable = [
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
];
export const examples = {
  basic: {
    title: '기본 사용법',
    description: 'FloatButton은 FloatButtonItem과 함께 사용됩니다. 각 FloatButtonItem은 onClick 핸들러를 가질 수 있습니다.',
    codeContent: `import { FloatButton, FloatButtonItem } from '@seolim/designsystem';

<FloatButton icon="+" position="bottom-right" positionType="absolute" onClick={() => setIsOpen(!isOpen)}>
  <FloatButtonItem onClick={() => alert('첫 번째 액션')}>📝</FloatButtonItem>
  <FloatButtonItem onClick={() => alert('두 번째 액션')}>📷</FloatButtonItem>
  <FloatButtonItem onClick={() => alert('세 번째 액션')}>📁</FloatButtonItem>
</FloatButton>`,
  },
  position: {
    title: '위치',
    description: 'position 속성으로 플로팅 버튼의 위치를 지정할 수 있습니다.',
    codeContent: `import { FloatButton, FloatButtonItem } from '@seolim/designsystem';

<FloatButton icon="➕" position="bottom-right" positionType="absolute" size="sm">
  <FloatButtonItem onClick={() => {}}>🏠</FloatButtonItem>
  <FloatButtonItem onClick={() => {}}>⚙️</FloatButtonItem>
</FloatButton>
<FloatButton icon="➕" position="bottom-left" positionType="absolute" size="sm">
  <FloatButtonItem onClick={() => {}}>🏠</FloatButtonItem>
  <FloatButtonItem onClick={() => {}}>⚙️</FloatButtonItem>
</FloatButton>
<FloatButton icon="➕" position="top-right" positionType="absolute" size="sm">
  <FloatButtonItem onClick={() => {}}>🏠</FloatButtonItem>
  <FloatButtonItem onClick={() => {}}>⚙️</FloatButtonItem>
</FloatButton>
<FloatButton icon="➕" position="top-left" positionType="absolute" size="sm">
  <FloatButtonItem onClick={() => {}}>🏠</FloatButtonItem>
  <FloatButtonItem onClick={() => {}}>⚙️</FloatButtonItem>
</FloatButton>`,
  },
  size: {
    title: '크기',
    description: 'size 속성으로 플로팅 버튼의 크기를 조정할 수 있습니다.',
    codeContent: `import { FloatButton, FloatButtonItem } from '@seolim/designsystem';

<FloatButton icon="+" position="bottom-right" positionType="absolute" size="sm">
  <FloatButtonItem onClick={() => {}}>📝</FloatButtonItem>
  <FloatButtonItem onClick={() => {}}>📷</FloatButtonItem>
</FloatButton>
<FloatButton icon="+" position="bottom-right" positionType="absolute" size="md">
  <FloatButtonItem onClick={() => {}}>📝</FloatButtonItem>
  <FloatButtonItem onClick={() => {}}>📷</FloatButtonItem>
</FloatButton>
<FloatButton icon="+" position="bottom-right" positionType="absolute" size="lg">
  <FloatButtonItem onClick={() => {}}>📝</FloatButtonItem>
  <FloatButtonItem onClick={() => {}}>📷</FloatButtonItem>
</FloatButton>`,
  },
  color: {
    title: '색상 커스터마이징',
    description: 'color와 backgroundColor 속성으로 플로팅 버튼의 색상을 커스터마이징할 수 있습니다.',
    codeContent: `import { FloatButton, FloatButtonItem } from '@seolim/designsystem';

<FloatButton icon="+" position="bottom-right" positionType="absolute" backgroundColor="#3b82f6" color="#ffffff">
  <FloatButtonItem onClick={() => {}}>🏠</FloatButtonItem>
  <FloatButtonItem onClick={() => {}}>⚙️</FloatButtonItem>
  <FloatButtonItem onClick={() => {}}>❤️</FloatButtonItem>
</FloatButton>
<FloatButton icon="+" position="bottom-right" positionType="absolute" backgroundColor="#22c55e" color="#ffffff">
  <FloatButtonItem onClick={() => {}}>🏠</FloatButtonItem>
  <FloatButtonItem onClick={() => {}}>⚙️</FloatButtonItem>
  <FloatButtonItem onClick={() => {}}>❤️</FloatButtonItem>
</FloatButton>
<FloatButton icon="+" position="bottom-right" positionType="absolute" backgroundColor="#a855f7" color="#ffffff">
  <FloatButtonItem onClick={() => {}}>🏠</FloatButtonItem>
  <FloatButtonItem onClick={() => {}}>⚙️</FloatButtonItem>
  <FloatButtonItem onClick={() => {}}>❤️</FloatButtonItem>
</FloatButton>
<FloatButton icon="+" position="bottom-right" positionType="absolute" backgroundColor="#1f2937" color="#ffffff">
  <FloatButtonItem onClick={() => {}}>🏠</FloatButtonItem>
  <FloatButtonItem onClick={() => {}}>⚙️</FloatButtonItem>
  <FloatButtonItem onClick={() => {}}>❤️</FloatButtonItem>
</FloatButton>`,
  },
  example: {
    title: '사용 예제',
    description: '실제 사용 시나리오 예제입니다.',
    codeContent: `import { FloatButton, FloatButtonItem } from '@seolim/designsystem';

// 소셜 공유 액션
<FloatButton icon="📤" position="bottom-right" positionType="absolute" backgroundColor="#3b82f6" color="#ffffff">
  <FloatButtonItem onClick={() => alert('페이스북 공유')}>📘</FloatButtonItem>
  <FloatButtonItem onClick={() => alert('트위터 공유')}>🐦</FloatButtonItem>
  <FloatButtonItem onClick={() => alert('인스타그램 공유')}>📷</FloatButtonItem>
  <FloatButtonItem onClick={() => alert('링크 복사')}>🔗</FloatButtonItem>
</FloatButton>

// 빠른 작성 메뉴
<FloatButton icon="✏️" position="bottom-right" positionType="absolute" backgroundColor="#22c55e" color="#ffffff">
  <FloatButtonItem onClick={() => alert('새 글 작성')}>📝</FloatButtonItem>
  <FloatButtonItem onClick={() => alert('사진 업로드')}>📷</FloatButtonItem>
  <FloatButtonItem onClick={() => alert('동영상 업로드')}>🎥</FloatButtonItem>
  <FloatButtonItem onClick={() => alert('파일 첨부')}>📎</FloatButtonItem>
</FloatButton>`,
  },
  fixed: {
    title: 'Position Type (Fixed)',
    description: "positionType='fixed'를 사용하면 화면 스크롤과 관계없이 뷰포트 기준으로 고정됩니다. 버튼을 클릭하여 표시/숨김을 전환할 수 있습니다.",
    codeContent: `import { FloatButton, FloatButtonItem } from '@seolim/designsystem';

<FloatButton icon="↑" position="bottom-right" positionType="fixed" backgroundColor="#6366f1" color="#ffffff" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
  <FloatButtonItem onClick={() => alert('홈으로')}>🏠</FloatButtonItem>
  <FloatButtonItem onClick={() => alert('설정')}>⚙️</FloatButtonItem>
  <FloatButtonItem onClick={() => alert('도움말')}>❓</FloatButtonItem>
</FloatButton>`,
  },
};
