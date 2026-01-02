export const propsTable = [
  {
    name: 'type', type: 'image | text', default: 'text', description: '아바타의 타입입니다. 이미지 또는 텍스트를 표시합니다.',
  },
  {
    name: 'size', type: 'sm | md | lg', default: 'md', description: '아바타의 크기입니다.',
  },
  {
    name: 'variant', type: 'circle | square', default: 'circle', description: '아바타의 모양입니다.',
  },
  {
    name: 'outline', type: 'boolean', default: 'false', description: '아바타에 외곽선을 표시할지 여부입니다.',
  },
  {
    name: 'color', type: 'string', default: '-', description: '아바타의 텍스트 색상입니다.',
  },
  {
    name: 'backgroundColor', type: 'string', default: '-', description: '아바타의 배경 색상입니다.',
  },
  {
    name: 'outlineColor', type: 'string', default: '-', description: '외곽선의 색상입니다.',
  },
  {
    name: 'dot', type: 'none | top | bottom', default: 'none', description: '상태 표시 점의 위치입니다.',
  },
  {
    name: 'dotColor', type: 'string', default: '-', description: '상태 표시 점의 색상입니다.',
  },
  {
    name: 'src', type: 'string', default: '-', description: '이미지 타입일 때 표시할 이미지 URL입니다.',
  },
  {
    name: 'alt', type: 'string', default: '-', description: '이미지의 대체 텍스트입니다.',
  },
];

export const examples = {
  basic: {
    title: '기본',
    description: '기본 아바타 컴포넌트입니다.',
    codeContent: `<Avatar type="text" backgroundColor="#3b82f6" color="white" alt="AV" />
<Avatar type="text" backgroundColor="#22c55e" color="white" alt="AV" />`,
  },
  size: {
    title: '크기',
    description: '아바타는 작은 것부터 큰 것까지 다양한 크기를 지원합니다.',
    codeContent: `<Avatar size="sm" type="text" backgroundColor="#ef4444" color="white" alt="AV" />
<Avatar size="md" type="text" backgroundColor="#22c55e" color="white" alt="AV" />
<Avatar size="lg" type="text" backgroundColor="#8b5cf6" color="white" alt="AV" />`,
  },
  variant: {
    title: '모양',
    description: '아바타는 원형과 사각형 모양을 지원합니다.',
    codeContent: `<Avatar variant="circle" type="text" backgroundColor="#f59e0b" color="white" alt="AV" />
<Avatar variant="square" type="text" backgroundColor="#ec4899" color="white" alt="AV" />`,
  },
  outline: {
    title: '외곽선',
    description: '아바타에 외곽선을 추가할 수 있습니다.',
    codeContent: `<Avatar type="text" backgroundColor="#3b82f6" color="white" alt="AV" />
<Avatar outline type="text" backgroundColor="#3b82f6" color="white" outlineColor="#1f2937" alt="AV" />`,
  },
  dot: {
    title: '상태 표시',
    description: '아바타에 상태를 나타내는 점을 표시할 수 있습니다.',
    codeContent: `<Avatar type="text" backgroundColor="#6b7280" color="white" dot="none" alt="AV" />
<Avatar type="text" backgroundColor="#6b7280" color="white" dot="top" dotColor="#22c55e" alt="AV" />
<Avatar type="text" backgroundColor="#6b7280" color="white" dot="bottom" dotColor="#ef4444" alt="AV" />`,
  },
  image: {
    title: '이미지 아바타',
    description: '이미지를 사용한 아바타 예제입니다.',
    codeContent: `<Avatar type="image" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="AV" />
<Avatar type="image" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1143&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="AV" dot="top" dotColor="#22c55e" />
<Avatar type="image" variant="square" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="AV" outline />`,
  },
  color: {
    title: '다양한 색상',
    description: '다양한 배경색과 텍스트 색상을 사용한 아바타입니다.',
    codeContent: `<Avatar type="text" backgroundColor="#ef4444" color="white" alt="AV" />
<Avatar type="text" backgroundColor="#f97316" color="white" alt="AV" />
<Avatar type="text" backgroundColor="#eab308" color="white" alt="AV" />
<Avatar type="text" backgroundColor="#22c55e" color="white" alt="AV" />
<Avatar type="text" backgroundColor="#06b6d4" color="white" alt="AV" />
<Avatar type="text" backgroundColor="#3b82f6" color="white" alt="AV" />
<Avatar type="text" backgroundColor="#8b5cf6" color="white" alt="AV" />
<Avatar type="text" backgroundColor="#ec4899" color="white" alt="AV" />`,
  },
  example: {
    title: '예제',
    description: '실제 사용 상황에서의 아바타 예제입니다.',
    codeContent: `<Avatar type="text" backgroundColor="#3b82f6" color="white" size="md" alt="AV" /> // 김철수, Frontend Developer
<Avatar type="text" backgroundColor="#22c55e" color="white" size="md" dot="bottom" dotColor="#22c55e" alt="AV" /> // 이영희, 온라인 • 방금 전
<Avatar type="image" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face" alt="AV" size="md" dot="top" dotColor="#ef4444" /> // 박민수, 바쁨 • 1시간 전
<Avatar type="text" backgroundColor="#8b5cf6" color="white" size="md" variant="square" outline outlineColor="#6b7280" alt="AV" /> // 정수연, Designer`,
  },
};
