/* eslint-disable no-useless-escape */
export const examples = {
  basic: {
    title: '기본',
    description: '기본 체크박스 컴포넌트입니다.',
    codeContent: `
<Checkbox label=\"기본 체크박스\" />
<Checkbox label=\"선택된 체크박스\" checked />
<Checkbox label=\"비활성화된 체크박스\" disabled />
`,
  },
  size: {
    title: '크기',
    description: '체크박스는 작은 것부터 큰 것까지 다양한 크기를 지원합니다.',
    codeContent: `
<Checkbox size=\"sm\" label=\"작은 체크박스\" />
<Checkbox size=\"md\" label=\"중간 체크박스\" />
<Checkbox size=\"lg\" label=\"큰 체크박스\" />
`,
  },
  accentColor: {
    title: '강조 색상',
    description: '체크박스에 다양한 강조 색상을 적용할 수 있습니다.',
    codeContent: `
<Checkbox label=\"기본 색상\" checked />
<Checkbox label=\"빨간색\" checked />
<Checkbox label=\"파란색\" checked />
<Checkbox label=\"녹색\" checked />
<Checkbox label=\"보라색\" checked />
`,
  },
  state: {
    title: '상태',
    description: '체크박스의 다양한 상태를 보여줍니다.',
    codeContent: `
<Checkbox label=\"선택되지 않음\" checked={false} />
<Checkbox label=\"선택됨\" checked />
<Checkbox label=\"비활성화 (선택되지 않음)\" checked={false} disabled />
<Checkbox label=\"비활성화 (선택됨)\" checked disabled />
`,
  },
  label: {
    title: '라벨 변형',
    description: '체크박스에 다양한 형태의 라벨을 사용할 수 있습니다.',
    codeContent: `
<Checkbox label=\"일반 텍스트 라벨\" />
<Checkbox label={<span className=\"flex items-center gap-2\"><span>📧</span><span>이메일 알림 받기</span></span>} />
<Checkbox label={<div><div className=\"font-medium\">마케팅 동의</div><div className=\"text-sm text-gray-600\">프로모션 및 이벤트 정보를 받아보시겠습니까?</div></div>} />
`,
  },
  group: {
    title: '그룹',
    description: '여러 체크박스를 그룹으로 사용하는 예제입니다.',
    codeContent: `
// 관심 분야를 선택하세요
<Checkbox label=\"웹 개발\" size=\"sm\" />
<Checkbox label=\"모바일 개발\" size=\"sm\" />
<Checkbox label=\"데이터 사이언스\" size=\"sm\" />
<Checkbox label=\"UI/UX 디자인\" size=\"sm\" />
<Checkbox label=\"백엔드 개발\" size=\"sm\" />

// 알림 설정
<Checkbox label=\"일반 알림\" checked />
<Checkbox label=\"보안 알림\" checked />
<Checkbox label=\"업데이트 알림\" />
`,
  },
  example: {
    title: '예제',
    description: '실제 사용 상황에서의 체크박스 예제입니다.',
    codeContent: `
// 계정 설정
<Checkbox label=\"2단계 인증 활성화\" checked />
<Checkbox label=\"로그인 알림 받기\" checked />
<Checkbox label=\"계정 활동 이메일 알림\" />

// 개인정보 처리방침
<Checkbox label={<span><span className=\"text-red-500\">*</span> 개인정보 처리방침에 동의합니다</span>} size=\"sm\" />
<Checkbox label=\"마케팅 정보 수신에 동의합니다 (선택)\" size=\"sm\" />
<Checkbox label=\"점3자 제공에 동의합니다 (선택)\" size=\"sm\" />

// 할 일 목록
<Checkbox label=\"프로젝트 기획서 작성\" checked size=\"sm\" />
<Checkbox label=\"디자인 시스템 문서화\" size=\"sm\" />
<Checkbox label=\"코드 리뷰 완료\" checked size=\"sm\" />
<Checkbox label=\"테스트 케이스 작성\" size=\"sm\" />
`,
  },
};
