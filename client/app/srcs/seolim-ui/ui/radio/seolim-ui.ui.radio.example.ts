export const examples = {
  basic: {
    title: '기본 사용',
    description: 'Radio 그룹에서 하나의 옵션만 선택할 수 있습니다.',
    codeContent: `import { useState } from 'react';
import { Radio } from '@seolim/designsystem';

function Example() {
  const [selected, setSelected] = useState('option1');
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
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
  );
}`,
  },
  size: {
    title: '크기',
    description: 'size prop으로 라디오의 크기를 변경할 수 있습니다.',
    codeContent: `import { Radio } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Radio value="sm" checked label="작은 라디오(sm)" name="size" size="sm" />
      <Radio value="md" checked label="중간 라디오(md)" name="size" size="md" />
      <Radio value="lg" checked label="큰 라디오(lg)" name="size" size="lg" />
    </div>
  );
}`,
  },
  disabled: {
    title: '비활성화 상태',
    description: 'disabled prop으로 비활성화된 라디오를 만들 수 있습니다.',
    codeContent: `import { Radio } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Radio value="disabled1" checked={false} onChange={() => {}} label="비활성화" disabled name="disabled" />
      <Radio value="disabled2" checked onChange={() => {}} label="선택+비활성화" disabled name="disabled" />
    </div>
  );
}`,
  },
  realworld: {
    title: '실제 사용 예제',
    description: '주문/설정 등 실제 폼에서의 라디오 사용 예시입니다.',
    codeContent: `import { useState } from 'react';
import { Radio } from '@seolim/designsystem';

function Example() {
  const [delivery, setDelivery] = useState('fast');
  const [submitted, setSubmitted] = useState(false);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        setSubmitted(true);
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: 16, border: '1px solid #e5e7eb', borderRadius: 8, padding: 16, maxWidth: 320 }}
    >
      <div style={{ fontWeight: 500, marginBottom: 8 }}>배송 방법 선택</div>
      <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
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
      <button type="submit" style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', borderRadius: 4, border: 'none' }}>선택 완료</button>
      {submitted && (
        <div style={{ marginTop: 12, color: '#16a34a' }}>
          선택된 배송 방법: <b>{delivery === 'normal' ? '일반 배송' : '빠른 배송'}</b>
        </div>
      )}
    </form>
  );
}`,
  },
};
