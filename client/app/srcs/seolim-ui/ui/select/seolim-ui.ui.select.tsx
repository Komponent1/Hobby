import React, { useState } from 'react';
import { Select } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../../component';
import { examples } from './seolim-ui.ui.select.example';

const UiSelect: React.FC = () => {
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
    <div className="space-y-6">
      <HeadBox>
        <Title text="Select" />
        <Description text="여러 옵션 중 하나를 선택할 수 있는 셀렉트 컴포넌트입니다." />
      </HeadBox>

      <div className="space-y-4">
        <Title text="속성" />
        <PropsTable
          datas={[
            {
              name: 'options', type: 'SelectOption[]', default: '-', description: '선택 가능한 옵션 배열입니다.',
            },
            {
              name: 'value', type: 'string', default: '-', description: '선택된 값입니다.',
            },
            {
              name: 'onChange', type: '(value: string) => void', default: '-', description: '값이 변경될 때 호출되는 콜백입니다.',
            },
            {
              name: 'placeholder', type: 'string', default: '-', description: '선택 전 표시되는 플레이스홀더입니다.',
            },
            {
              name: 'variant', type: "'default' | 'underlined'", default: 'default', description: '셀렉트의 스타일 변형입니다.',
            },
            {
              name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '셀렉트의 크기입니다.',
            },
            {
              name: 'disabled', type: 'boolean', default: 'false', description: '비활성화 여부입니다.',
            },
            {
              name: 'width', type: 'string | number', default: '-', description: '셀렉트의 너비입니다.',
            },
          ]}
        />
      </div>

      <UiBox {...examples.basic}>
        <div className="p-8 mt-4">
          <Select
            options={options}
            value={value}
            onChange={setValue}
            placeholder="옵션을 선택하세요"
          />
        </div>
      </UiBox>

      <UiBox {...examples.variant}>
        <div className="flex gap-6 mt-4 flex-wrap items-center">
          <div>
            <p className="text-sm text-gray-600 mb-2">default</p>
            <Select options={options} value={value} onChange={setValue} variant="default" placeholder="default" />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">underlined</p>
            <Select options={options} value={value} onChange={setValue} variant="underlined" placeholder="underlined" />
          </div>
        </div>
      </UiBox>

      <UiBox {...examples.size}>
        <div className="flex gap-6 mt-4 flex-wrap items-center">
          <div>
            <p className="text-sm text-gray-600 mb-2">sm</p>
            <Select options={options} value={value} onChange={setValue} size="sm" placeholder="작은 셀렉트(sm)" />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">md</p>
            <Select options={options} value={value} onChange={setValue} size="md" placeholder="중간 셀렉트(md)" />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">lg</p>
            <Select options={options} value={value} onChange={setValue} size="lg" placeholder="큰 셀렉트(lg)" />
          </div>
        </div>
      </UiBox>

      <UiBox {...examples.disabled}>
        <div className="flex gap-6 mt-4 flex-wrap items-center">
          <Select options={options} value={value} onChange={setValue} disabled placeholder="비활성화 상태" />
        </div>
      </UiBox>

      <UiBox {...examples.combination}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          <div>
            <p className="text-sm font-medium mb-4">아이콘 + 설명 + underlined</p>
            <Select
              options={[
                {
                  label: 'Apple', value: 'apple', icon: '🍎', description: '사과',
                },
                {
                  label: 'Banana', value: 'banana', icon: '🍌', description: '바나나',
                },
                {
                  label: 'Orange', value: 'orange', icon: '🍊', description: '오렌지',
                },
              ]}
              value={value}
              onChange={setValue}
              variant="underlined"
              placeholder="과일을 선택하세요"
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-4">Large + Custom Width + Disabled Option</p>
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
            <p className="text-sm font-medium mb-4">Small + Disabled 전체</p>
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
      </UiBox>
    </div>
  );
};

export default UiSelect;
