export const propsTable = [
  {
    name: 'head', type: 'string', default: '-', description: '알림의 제목입니다. (선택 사항)',
  },
  {
    name: 'message', type: 'React.ReactNode', default: '-', description: '알림 메시지 내용입니다.',
  },
  {
    name: 'type', type: 'success | error | info | warning', default: 'info', description: '알림의 타입입니다.',
  },
  {
    name: 'size', type: 'sm | md | lg', default: 'md', description: '알림의 크기입니다.',
  },
  {
    name: 'variant', type: 'filled | outlined', default: 'filled', description: '알림의 시각적 스타일입니다.',
  },
];

export const examples = {
  type: {
    title: '타입',
    description: '알림 타입에는 성공, 에러, 정보, 경고 스타일이 포함됩니다.',
    codeContent: `// 타입 예제
<Alert message="성공적으로 완료되었습니다." type="success" />
<Alert message="오류가 발생했습니다." type="error" />
<Alert message="참고하세요." type="info" />
<Alert message="주의가 필요합니다." type="warning" />`,
  },
  variant: {
    title: '변형',
    description: '알림 변형에는 채워진 스타일과 아웃라인 스타일이 있습니다.',
    codeContent: `// 변형 예제
<Alert message="채워진 알림입니다." variant="filled" type="info" />
<Alert message="아웃라인 알림입니다." variant="outlined" type="info" />`,
  },
  size: {
    title: '크기',
    description: '알림 크기는 작은 것부터 큰 것까지 다양합니다.',
    codeContent: `// 크기 예제
<Alert message="작은 크기 알림" size="sm" type="info" />
<Alert message="중간 크기 알림" size="md" type="info" />
<Alert message="큰 크기 알림" size="lg" type="info" />`,
  },
  head: {
    title: '제목 포함',
    description: '알림에 제목을 포함할 수 있습니다.',
    codeContent: `// 제목 포함 예제
<Alert head="성공" message="작업이 성공적으로 완료되었습니다." type="success" />
<Alert head="오류 발생" message="처리 중 오류가 발생했습니다." type="error" />
<Alert head="알림" message="새로운 업데이트가 있습니다." type="info" />
<Alert head="주의" message="이 작업은 되돌릴 수 없습니다." type="warning" />`,
  },
  example: {
    title: '예제',
    description: '다양한 상황에서 사용할 수 있는 알림 예제입니다.',
    codeContent: `// 예제
<Alert head="계정 생성 완료" message="회원가입이 완료되었습니다. 이메일을 확인해 주세요." type="success" variant="filled" />
<Alert head="파일 업로드 실패" message="파일 크기가 10MB를 초과합니다. 다시 시도해 주세요." type="error" variant="outlined" />
<Alert message="이 기능은 베타 버전입니다." type="info" size="sm" />
<Alert head="보안 업데이트" message="비밀번호를 6개월마다 변경하는 것이 좋습니다." type="warning" variant="outlined" size="lg" />`,
  },
  combination: {
    title: '조합',
    description: '타입, 변형, 크기를 조합하여 다양한 스타일을 만들 수 있습니다.',
    codeContent: `// 조합 예제
<Alert head="작은 성공 알림" message="저장되었습니다." type="success" variant="outlined" size="sm" />
<Alert head="중간 에러 알림" message="연결에 실패했습니다." type="error" variant="filled" size="md" />
<Alert head="큰 경고 알림" message="이 작업은 시스템에 영향을 줄 수 있습니다." type="warning" variant="outlined" size="lg" />`,
  },
};
