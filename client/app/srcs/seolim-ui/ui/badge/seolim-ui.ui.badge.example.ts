export const propsTable = [
  {
    name: 'text', type: 'string', default: '-', description: '배지 내부에 표시될 텍스트입니다.',
  },
  {
    name: 'variant', type: 'hard | soft | outlined', default: 'hard', description: '배지의 시각적 스타일입니다.',
  },
  {
    name: 'size', type: 'sm | md | lg', default: 'md', description: '배지의 크기입니다.',
  },
  {
    name: 'corner', type: 'rounded | square', default: 'rounded', description: '배지의 모서리 스타일입니다.',
  },
  {
    name: 'color', type: 'string', default: '-', description: '배지의 색상입니다.',
  },
];
export const additionalPropsTable = [
  {
    name: 'children', type: 'React.ReactNode', default: '-', description: '배지 내부에 표시될 콘텐츠입니다.',
  },
  {
    name: 'variant', type: 'hard | soft | outlined', default: 'hard', description: '배지의 시각적 스타일입니다.',
  },
  {
    name: 'size', type: 'sm | md | lg', default: 'md', description: '배지의 크기입니다.',
  },
  {
    name: 'corner', type: 'rounded | square', default: 'rounded', description: '배지의 모서리 스타일입니다.',
  },
  {
    name: 'color', type: 'string', default: '-', description: '배지의 색상입니다.',
  },
];
export const examples = {
  variant: {
    title: '변형',
    description: '배지 변형에는 하드, 소프트, 아웃라인 스타일이 포함됩니다.',
    codeContent: `<Badge text="하드" variant="hard" />
<Badge text="소프트" variant="soft" />
<Badge text="아웃라인" variant="outlined" />`,
  },
  size: {
    title: '크기',
    description: '배지 크기는 작은 것부터 큰 것까지 다양합니다.',
    codeContent: `<Badge text="작은" size="sm" />
<Badge text="중간" size="md" />
<Badge text="큰" size="lg" />`,
  },
  corner: {
    title: '모서리',
    description: '배지 모서리 스타일에는 둥근 모서리와 사각 모서리가 있습니다.',
    codeContent: `<Badge text="둥근" corner="rounded" />
<Badge text="사각" corner="square" />`,
  },
  example: {
    title: '예제',
    description: '일반적인 배지 사용 사례와 예제입니다.',
    codeContent: `<Badge text="활성" variant="soft" size="sm" />
<Badge text="대기" variant="outlined" size="sm" />
<Badge text="비활성" variant="hard" size="sm" />
<Badge text="높음" variant="hard" size="sm" />
<Badge text="중간" variant="soft" size="sm" />
<Badge text="낮음" variant="outlined" size="sm" />
<Badge text="React" variant="soft" size="sm" />
<Badge text="TypeScript" variant="soft" size="sm" />
<Badge text="UI" variant="soft" size="sm" />`,
  },
  icon: {
    title: '아이콘과 함께',
    description: '상태 표시기와 아이콘이 있는 ContentBadge입니다.',
    codeContent: `<ContentBadge variant="soft">
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
</ContentBadge>`,
  },
  content: {
    title: '복잡한 콘텐츠',
    description: '다양한 콘텐츠 유형을 가진 ContentBadge입니다.',
    codeContent: `<ContentBadge variant="hard">
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
</ContentBadge>`,
  },
};
