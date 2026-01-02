export const examples = {
  basic: {
    title: '기본 사용법',
    description: '가장 기본적인 셀렉트 사용 예시입니다.',
    codeContent: `import { useState } from 'react';
import { Select } from '@seolim/designsystem';

function Example() {
  const [value, setValue] = useState('option1');
  const options = [
    {
      label: '옵션 1', value: 'option1', description: '설명 1', icon: '🍎',
    },
    {
      label: '옵션 2', value: 'option2', description: '설명 2', icon: '🍊',
    },
    {
      label: '옵션 3', value: 'option3', disabled: true, description: '비활성화', icon: '🚫',
    },
  ];
  return (
    <Select
      options={options}
      value={value}
      onChange={setValue}
      placeholder="옵션을 선택하세요"
    />
  );
}`,
  },
  variant: {
    title: 'variant',
    description: 'variant 속성으로 셀렉트의 스타일을 변경할 수 있습니다.',
    codeContent: `import { useState } from 'react';
import { Select } from '@seolim/designsystem';

function Example() {
  const [value, setValue] = useState('option1');
  const options = [
    { label: '옵션 1', value: 'option1' },
    { label: '옵션 2', value: 'option2' },
    { label: '옵션 3', value: 'option3' },
  ];
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 8 }}>default</p>
        <Select options={options} value={value} onChange={setValue} variant="default" placeholder="default" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 8 }}>underlined</p>
        <Select options={options} value={value} onChange={setValue} variant="underlined" placeholder="underlined" />
      </div>
    </div>
  );
}`,
  },
  size: {
    title: 'size',
    description: 'size 속성으로 셀렉트의 크기를 조절할 수 있습니다.',
    codeContent: `import { useState } from 'react';
import { Select } from '@seolim/designsystem';

function Example() {
  const [value, setValue] = useState('option1');
  const options = [
    { label: '옵션 1', value: 'option1' },
    { label: '옵션 2', value: 'option2' },
    { label: '옵션 3', value: 'option3' },
  ];
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 8 }}>sm</p>
        <Select options={options} value={value} onChange={setValue} size="sm" placeholder="작은 셀렉트(sm)" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 8 }}>md</p>
        <Select options={options} value={value} onChange={setValue} size="md" placeholder="중간 셀렉트(md)" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 8 }}>lg</p>
        <Select options={options} value={value} onChange={setValue} size="lg" placeholder="큰 셀렉트(lg)" />
      </div>
    </div>
  );
}`,
  },
  disabled: {
    title: 'disabled',
    description: 'disabled 속성으로 셀렉트를 비활성화할 수 있습니다.',
    codeContent: `import { useState } from 'react';
import { Select } from '@seolim/designsystem';

function Example() {
  const [value, setValue] = useState('option1');
  const options = [
    { label: '옵션 1', value: 'option1' },
    { label: '옵션 2', value: 'option2' },
    { label: '옵션 3', value: 'option3' },
  ];
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
      <Select options={options} value={value} onChange={setValue} disabled placeholder="비활성화 상태" />
    </div>
  );
}`,
  },
  combination: {
    title: '실전 예시 조합',
    description: '다양한 속성을 조합한 실제 사용 예시입니다.',
    codeContent: `import { useState } from 'react';
import { Select } from '@seolim/designsystem';

function Example() {
  const [value, setValue] = useState('option1');
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 16 }}>아이콘 + 설명 + underlined</p>
        <Select
          options={[
            { label: 'Apple', value: 'apple', icon: '🍎', description: '사과' },
            { label: 'Banana', value: 'banana', icon: '🍌', description: '바나나' },
            { label: 'Orange', value: 'orange', icon: '🍊', description: '오렌지' },
          ]}
          value={value}
          onChange={setValue}
          variant="underlined"
          placeholder="과일을 선택하세요"
        />
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 16 }}>Large + Custom Width + Disabled Option</p>
        <Select
          options={[
            { label: '활성화', value: 'active' },
            { label: '비활성화', value: 'disabled', disabled: true },
            { label: '선택됨', value: 'selected' },
          ]}
          value={value}
          onChange={setValue}
          size="lg"
          width={260}
          placeholder="옵션을 선택하세요"
        />
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 16 }}>Small + Disabled 전체</p>
        <Select
          options={[
            { label: '옵션 1', value: '1' },
            { label: '옵션 2', value: '2' },
          ]}
          value={value}
          onChange={setValue}
          size="sm"
          disabled
          placeholder="비활성화 전체"
        />
      </div>
    </div>
  );
}`,
  },
};
