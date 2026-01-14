export const examples = {
  basic: {
    title: "기본",
    description: "텍스트 입력을 위한 기본 입력 필드입니다.",
    codeContent: `
<Input value="" onChange={() => {}} placeholder="여기에 텍스트를 입력하세요" />
`,
  },
  state: {
    title: "상태",
    description: "입력 상태에는 일반, 비활성화, 오류가 있습니다.",
    codeContent: `
<Input value="" onChange={() => {}} placeholder="일반 입력" />
<Input value="비활성화된 입력" onChange={() => {}} disabled />
<Input value="오류 입력" onChange={() => {}} error />
`,
  },
  placeholder: {
    title: "플레이스홀더",
    description: "다양한 플레이스홀더 예제입니다.",
    codeContent: `
<Input value="" onChange={() => {}} placeholder="이름을 입력하세요" />
<Input value="" onChange={() => {}} placeholder="이메일을 입력하세요" />
<Input value="" onChange={() => {}} placeholder="메시지를 입력하세요" />
`,
  },
  withSubmitButton: {
    title: "제출 버튼 포함",
    description:
      "입력 필드에 제출 버튼을 포함하는 예제입니다. withSubmitButton 속성을 true로 설정하고, onClickSubmitButton 콜백 함수를 제공합니다.",
    codeContent: `
<Input
  value=""
  onChange={() => {}}
  placeholder="검색어를 입력하세요"
  withSubmitButton
  onClickSubmitButton={() => {
    console.log('제출 버튼 클릭됨');
  }}
/>
`,
  },
};
