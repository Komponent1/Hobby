export const propsTable = [
  {
    name: 'titles', type: 'React.ReactNode[]', default: '-', description: '각 아코디언 섹션의 제목 배열입니다.',
  },
  {
    name: 'children', type: 'React.ReactNode', default: '-', description: '아코디언 섹션에 표시될 콘텐츠입니다.',
  },
  {
    name: 'color', type: 'string', default: '-', description: '아코디언의 배경 색상입니다.',
  },
  {
    name: 'selectColor', type: 'string', default: '-', description: '항목이 선택되었을 때의 색상입니다.',
  },
  {
    name: 'size', type: 'sm | md | lg', default: 'md', description: '아코디언의 크기입니다.',
  },
  {
    name: 'variant', type: 'alwaysOpen | singleOpen', default: 'singleOpen', description: '섹션 열기/닫기 동작 방식입니다.',
  },
  {
    name: 'titleVariant', type: 'normal | arrow | plus', default: 'normal', description: '제목 표시기의 스타일입니다.',
  },
  {
    name: 'outlineVariant', type: 'none | box | innerBox', default: 'none', description: '아코디언의 외곽선 스타일입니다.',
  },
];
export const examples = {
  variant: {
    title: '변형',
    Description: '아코디언 변형은 열기 동작을 제어합니다. alwaysOpen은 여러 섹션을 허용하고, singleOpen은 하나만 허용합니다.',
    codeContent: `// 단일 열기 (기본값)
<Accordion
  titles={['섹션 1', '섹션 2', '섹션 3']}
  variant="singleOpen"
>
  <div>1번 섹션 콘텐츠</div>
  <div>2번 섹션 콘텐츠</div>
  <div>3번 섹션 콘텐츠</div>
</Accordion>

// 항상 열기
<Accordion
  titles={['섹션 A', '섹션 B', '섹션 C']}
  variant="alwaysOpen"
>
  <div>A번 섹션 콘텐츠</div>
  <div>B번 섹션 콘텐츠</div>
  <div>C번 섹션 콘텐츠</div>
</Accordion>`,
  },
  size: {
    title: '크기',
    Description: '아코디언 크기는 컴포넌트의 전체적인 스케일과 패딩에 영향을 줍니다.',
    codeContent: `// 작은 크기
<Accordion
  titles={['작은 크기', '섹션 2']}
  size="sm"
>
  <div>작은 아코디언의 콘텐츠</div>
  <div>더 많은 콘텐츠</div>
</Accordion>

// 중간 크기
<Accordion
  titles={['중간 크기', '섹션 2']}
  size="md"
>
  <div>중간 아코디언의 콘텐츠</div>
  <div>더 많은 콘텐츠</div>
</Accordion>

// 큰 크기
<Accordion
  titles={['큰 크기', '섹션 2']}
  size="lg"
>
  <div>큰 아코디언의 콘텐츠</div>
  <div>더 많은 콘텐츠</div>
</Accordion>`,
  },
  outlineVariant: {
    title: '외곽선 변형',
    Description: '외곽선 변형은 아코디언 섹션의 테두리와 시각적 구분을 제어합니다.',
    codeContent: `// 없음
<Accordion
  titles={['외곽선 없음', '섹션 2']}
  outlineVariant="none"
>
  <div>외곽선 없는 콘텐츠</div>
  <div>더 많은 콘텐츠</div>
</Accordion>

// 박스
<Accordion
  titles={['박스 외곽선', '섹션 2']}
  outlineVariant="box"
>
  <div>박스 외곽선이 있는 콘텐츠</div>
  <div>더 많은 콘텐츠</div>
</Accordion>

// 내부 박스
<Accordion
  titles={['내부 박스', '섹션 2']}
  outlineVariant="innerBox"
>
  <div>내부 박스 외곽선이 있는 콘텐츠</div>
  <div>더 많은 콘텐츠</div>
</Accordion>`,
  },
  titleVariant: {
    title: '제목 변형',
    Description: '제목 변형은 확장/축소 상태에 따른 표시기 스타일을 변경합니다.',
    codeContent: `// 일반
<Accordion
  titles={['일반 제목', '다른 제목']}
  titleVariant="normal"
>
  <div>일반 제목 스타일의 콘텐츠</div>
  <div>여기에 더 많은 콘텐츠</div>
</Accordion>

// 화살표
<Accordion
  titles={['화살표 제목', '다른 제목']}
  titleVariant="arrow"
>
  <div>화살표 표시기가 있는 콘텐츠</div>
  <div>여기에 더 많은 콘텐츠</div>
</Accordion>

// 플러스
<Accordion
  titles={['플러스 제목', '다른 제목']}
  titleVariant="plus"
>
  <div>플러스 표시기가 있는 콘텐츠</div>
  <div>여기에 더 많은 콘텐츠</div>
</Accordion>`,
  },
  example: {
    title: '예제',
    Description: '다양한 구성을 가진 일반적인 아코디언 사용 사례입니다.',
    codeContent: `// FAQ 스타일
<Accordion
  titles={['이 컴포넌트는 무엇인가요?', '어떻게 사용하나요?', '커스터마이즈할 수 있나요?']}
  variant="singleOpen"
  titleVariant="plus"
  outlineVariant="box"
>
  <div>이것은 콘텐츠를 확장 가능한 섹션으로 정리하는 아코디언 컴포넌트입니다.</div>
  <div>@seolim/designsystem에서 가져와서 titles와 children props를 제공하면 됩니다.</div>
  <div>네, 색상, 크기, 변형, 외곽선 스타일을 커스터마이즈할 수 있습니다.</div>
</Accordion>

// 설정 패널
<Accordion
  titles={['일반 설정', '고급 옵션', '보안']}
  titleVariant="arrow"
  outlineVariant="innerBox"
  size="md"
>
  <div className="space-y-2">
    <div>• 테마 설정</div>
    <div>• 언어 선택</div>
    <div>• 자동 저장 설정</div>
  </div>
  <div className="space-y-2">
    <div>• 디버그 모드</div>
    <div>• 성능 모니터링</div>
    <div>• 캐시 설정</div>
  </div>
  <div className="space-y-2">
    <div>• 2단계 인증</div>
    <div>• 비밀번호 요구사항</div>
    <div>• 세션 타임아웃</div>
  </div>
</Accordion>`,
  },
};
