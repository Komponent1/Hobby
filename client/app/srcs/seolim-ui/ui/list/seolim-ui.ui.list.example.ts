export const propsTable = [
  {
    name: 'children', type: 'React.ReactNode[]', default: '-', description: '목록 항목들입니다.',
  },
  {
    name: 'variant', type: 'none | underline', default: 'none', description: '목록의 스타일 변형입니다.',
  },
  {
    name: 'selected', type: 'boolean', default: 'false', description: '선택 기능을 활성화할지 여부입니다.',
  },
  {
    name: 'selectedIndex', type: 'number', default: '-', description: '선택된 항목의 인덱스입니다.',
  },
  {
    name: 'title', type: 'string', default: '-', description: '목록의 제목입니다.',
  },
  {
    name: 'titleProps', type: 'TypographyProps', default: '-', description: '제목의 Typography 속성입니다.',
  },
];

export const examples = {
  basic: {
    title: '기본',
    description: '기본적인 목록 형태입니다.',
    codeContent: `
<List>
  {['첫 번째 항목', '두 번째 항목', '세 번째 항목', '네 번째 항목']}
</List>
`,
  },
  variant: {
    title: '변형',
    description: 'variant 속성으로 목록의 스타일을 변경할 수 있습니다.',
    codeContent: `
<List variant="none">
  {['항목 1', '항목 2', '항목 3', '항목 4']}
</List>
<List variant="underline">
  {['항목 1', '항목 2', '항목 3', '항목 4']}
</List>
`,
  },
  title: {
    title: '제목',
    description: 'title 속성으로 목록에 제목을 추가할 수 있습니다.',
    codeContent: `
<List title="할 일 목록">
  {['아침 운동하기', '책 읽기', '프로젝트 작업', '저녁 산책']}
</List>
`,
  },
  selected: {
    title: '선택 기능',
    description: 'selected와 selectedIndex 속성으로 선택된 항목을 표시할 수 있습니다.',
    codeContent: `
<List selected={false}>
  {['메뉴 1', '메뉴 2', '메뉴 3', '메뉴 4']}
</List>
<List selected selectedIndex={1}>
  {['메뉴 1', '메뉴 2', '메뉴 3', '메뉴 4']}
</List>
`,
  },
  usage: {
    title: '사용 예제',
    description: '실제 사용 시나리오 예제입니다.',
    codeContent: `
<List variant="underline" selected selectedIndex={0}>
  {['홈', '소개', '서비스', '연락처']}
</List>
<List title="주요 기능">
  {[
    '사용자 인증 및 권한 관리',
    '실시간 데이터 동기화',
    '반응형 디자인',
    '다국어 지원',
  ]}
</List>
<List title="알림 설정" variant="underline">
  {['이메일 알림', '푸시 알림', 'SMS 알림', '앱 내 알림']}
</List>
`,
  },
  combination: {
    title: '조합',
    description: '다양한 속성을 조합한 예제입니다.',
    codeContent: `
<List
  title="프로젝트 단계"
  variant="underline"
  selected
  selectedIndex={2}
>
  {['기획', '디자인', '개발', '테스트', '배포']}
</List>
<List
  title="우선순위"
  variant="none"
  selected
  selectedIndex={0}
>
  {['긴급', '높음', '보통', '낮음']}
</List>
`,
  },
};
