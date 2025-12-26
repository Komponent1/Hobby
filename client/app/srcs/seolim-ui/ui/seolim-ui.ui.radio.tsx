import React, { useState } from 'react';
import { Radio } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../component';

const UiRadio: React.FC = () => {
  const [selected, setSelected] = useState('option1');
  const [delivery, setDelivery] = useState('fast');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-6">
      <HeadBox>
        <Title text="Radio" />
        <Description text="여러 옵션 중 하나를 선택할 수 있는 라디오 컴포넌트입니다." />
      </HeadBox>

      <div className="space-y-4">
        <Title text="속성" />
        <PropsTable
          datas={[
            {
              name: 'label', type: 'string', default: '-', description: '라디오 옆에 표시될 라벨입니다.',
            },
            {
              name: 'name', type: 'string', default: '-', description: 'input의 name 속성입니다.',
            },
            {
              name: 'value', type: 'string', default: '-', description: '라디오의 고유 값입니다.',
            },
            {
              name: 'checked', type: 'boolean', default: 'false', description: '선택 여부입니다.',
            },
            {
              name: 'onChange', type: '(e: React.ChangeEvent<HTMLInputElement>) => void', default: '-', description: '값이 변경될 때 호출되는 콜백입니다.',
            },
            {
              name: 'disabled', type: 'boolean', default: 'false', description: '비활성화 여부입니다.',
            },
            {
              name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '라디오의 크기입니다.',
            },
          ]}
        />
      </div>

      <UiBox>
        <Title text="기본 사용" />
        <Description text="Radio 그룹에서 하나의 옵션만 선택할 수 있습니다." />
        <div className="flex gap-6 mt-4 items-center">
          <Radio
            value="option1"
            checked={selected === 'option1'}
            onChange={() => setSelected('option1')}
            label="옵션 1"
            name="example"
          />
          <Radio
            value="option2"
            checked={selected === 'option2'}
            onChange={() => setSelected('option2')}
            label="옵션 2"
            name="example"
          />
          <Radio
            value="option3"
            checked={selected === 'option3'}
            onChange={() => setSelected('option3')}
            label="옵션 3"
            name="example"
          />
        </div>
      </UiBox>

      <UiBox>
        <Title text="크기" />
        <Description text="size prop으로 라디오의 크기를 변경할 수 있습니다." />
        <div className="flex gap-6 mt-4 items-center">
          <Radio value="sm" checked label="작은 라디오(sm)" name="size" size="sm" />
          <Radio value="md" checked label="중간 라디오(md)" name="size" size="md" />
          <Radio value="lg" checked label="큰 라디오(lg)" name="size" size="lg" />
        </div>
      </UiBox>

      <UiBox>
        <Title text="비활성화 상태" />
        <Description text="disabled prop으로 비활성화된 라디오를 만들 수 있습니다." />
        <div className="flex gap-6 mt-4 items-center">
          <Radio value="disabled1" checked={false} onChange={() => {}} label="비활성화" disabled name="disabled" />
          <Radio value="disabled2" checked onChange={() => {}} label="선택+비활성화" disabled name="disabled" />
        </div>
      </UiBox>

      <UiBox>
        <Title text="실 사용 예제" />
        <Description text="주문/설정 등 실제 폼에서의 라디오 사용 예시입니다." />
        {/* 실 사용 예제: 배송 방법 선택 폼 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="space-y-4 p-4 border rounded-lg max-w-md"
        >
          <div className="font-medium mb-2">배송 방법 선택</div>
          <div className="flex gap-6 mb-4">
            <Radio
              label="일반 배송 (2~3일)"
              name="delivery"
              value="normal"
              checked={delivery === 'normal'}
              onChange={() => setDelivery('normal')}
            />
            <Radio
              label="빠른 배송 (당일)"
              name="delivery"
              value="fast"
              checked={delivery === 'fast'}
              onChange={() => setDelivery('fast')}
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">선택 완료</button>
          {submitted && (
            <div className="mt-3 text-green-600">
              선택된 배송 방법:
              <b>{delivery === 'normal' ? '일반 배송' : '빠른 배송'}</b>
            </div>
          )}
        </form>
      </UiBox>
    </div>
  );

  // 실 사용 예제 상태
};

export default UiRadio;
