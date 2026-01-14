export const propsTable = [
  {
    name: "onSearch",
    type: "(query: string) => void",
    default: "-",
    description: "검색어가 변경될 때 호출되는 함수입니다.",
  },
  {
    name: "onSelect",
    type: "(value: string) => void",
    default: "-",
    description: "항목이 선택될 때 호출되는 함수입니다.",
  },
  {
    name: "suggestions",
    type: "string[]",
    default: "-",
    description: "추천 항목 리스트입니다.",
  },
  {
    name: "placeholder",
    type: "string",
    default: "Type to search...",
    description: "입력 필드의 플레이스홀더입니다.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "비활성화 여부입니다.",
  },
  {
    name: "width",
    type: "string | number",
    default: "100%",
    description: "컴포넌트의 너비입니다.",
  },
  {
    name: "withSearchButton",
    type: "boolean",
    default: "false",
    description: "검색 버튼이 함께 렌더링될지 여부입니다.",
  },
];

export const examples = {
  basic: {
    title: "기본",
    description: "기본 자동완성 예제입니다.",
    codeContent: `
const sampleSuggestions = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Grape',
  'Lemon',
  'Mango',
  'Orange',
  'Peach',
  'Strawberry',
];

const [suggestions, setSuggestions] = useState<string[]>(sampleSuggestions);
const [, setValue] = useState('');

const handleSearch = (query: string) => {
  setValue(query);
  setSuggestions(
    sampleSuggestions.filter((item) => item.toLowerCase().includes(query.toLowerCase())),
  );
};

const handleSelect = (selected: string) => {
  setValue(selected);
};

<Autocomplete
  onSearch={handleSearch}
  onSelect={handleSelect}
  suggestions={suggestions}
  placeholder="과일을 입력하세요"
/>
`,
  },
  withSearchButton: {
    title: "검색 버튼 포함",
    description: "검색 버튼이 포함된 자동완성 예제입니다.",
    codeContent: `
const sampleSuggestions = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Grape',
  'Lemon',
  'Mango',
  'Orange',
  'Peach',
  'Strawberry',
];

const [suggestions, setSuggestions] = useState<string[]>(sampleSuggestions);
const [, setValue] = useState('');

const handleSearch = (query: string) => {
  setValue(query);
  setSuggestions(
    sampleSuggestions.filter((item) => item.toLowerCase().includes(query.toLowerCase())),
  );
};
const handleSelect = (selected: string) => {
  setValue(selected);
};

<Autocomplete
  onSearch={handleSearch}
  onSelect={handleSelect}
  suggestions={suggestions}
  placeholder="과일을 입력하세요"
  withSearchButton
/>
`,
  },
};
