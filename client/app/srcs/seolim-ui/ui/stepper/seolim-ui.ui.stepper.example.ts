export const examples = {
  basic: {
    title: '기본 사용법',
    description: '기본 스테퍼 사용 예제입니다.',
    codeContent: `import { Stepper } from '@seolim/designsystem';
import { useState } from 'react';

function Example() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ['정보 입력', '확인', '완료'];

  return (
    <Stepper
      steps={steps}
      currentStep={currentStep}
      onStepClick={setCurrentStep}
    />
  );
}`,
  },
  size: {
    title: '크기',
    description: 'size prop으로 스테퍼 크기를 설정할 수 있습니다.',
    codeContent: `import { Stepper } from '@seolim/designsystem';
import { useState } from 'react';

function Example() {
  const [currentStep1, setCurrentStep1] = useState(1);
  const [currentStep2, setCurrentStep2] = useState(1);
  const [currentStep3, setCurrentStep3] = useState(1);
  const steps = ['Step 1', 'Step 2', 'Step 3'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 16 }}>Small</p>
        <Stepper size="sm" steps={steps} currentStep={currentStep1} onStepClick={setCurrentStep1} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 16 }}>Medium</p>
        <Stepper size="md" steps={steps} currentStep={currentStep2} onStepClick={setCurrentStep2} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 16 }}>Large</p>
        <Stepper size="lg" steps={steps} currentStep={currentStep3} onStepClick={setCurrentStep3} />
      </div>
    </div>
  );
}`,
  },
  variant: {
    title: '변형',
    description: 'variant prop으로 스테퍼 스타일을 변경할 수 있습니다.',
    codeContent: `import { Stepper } from '@seolim/designsystem';
import { useState } from 'react';

function Example() {
  const [currentStep1, setCurrentStep1] = useState(1);
  const [currentStep2, setCurrentStep2] = useState(1);
  const [currentStep3, setCurrentStep3] = useState(1);
  const steps = ['정보 입력', '확인', '완료'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 16 }}>Default</p>
        <Stepper variant="default" steps={steps} currentStep={currentStep1} onStepClick={setCurrentStep1} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 16 }}>Bottom Label</p>
        <Stepper variant="bottomLabel" steps={steps} currentStep={currentStep2} onStepClick={setCurrentStep2} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 16 }}>Side Label</p>
        <Stepper variant="sideLabel" steps={steps} currentStep={currentStep3} onStepClick={setCurrentStep3} />
      </div>
    </div>
  );
}`,
  },
  realworld: {
    title: '실제 사용 예제',
    description: '폼, 주문, 회원가입 등 단계형 UI에 적용할 수 있는 예제입니다.',
    codeContent: `import { Stepper } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ background: '#f3f4f6', borderRadius: 12, padding: 32 }}>
      <div>
        <Stepper
          stepNumber={3}
          currentStep={1}
          labels={["정보 입력", "확인", "완료"]}
          onStepClick={(idx) => alert((idx + 1) + '단계로 이동')}
        />
      </div>
      <div style={{ marginTop: 24, width: '100%', maxWidth: 420, background: '#ffffff', borderRadius: 8, boxShadow: '0 10px 25px rgba(0,0,0,0.08)', padding: 24 }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>2단계: 확인</div>
        <div style={{ color: '#4b5563' }}>입력한 정보를 확인하고 다음 단계로 진행하세요.</div>
      </div>
    </div>
  );
}`,
  },
};
