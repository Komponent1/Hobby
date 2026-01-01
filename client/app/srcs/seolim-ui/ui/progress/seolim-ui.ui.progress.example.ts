export const examples = {
  variant: {
    title: '변형',
    description: '프로그레스 변형에는 바(bar)와 원형(circle) 스타일이 있습니다.',
    codeContent: `import { Progress } from '@seolim/designsystem';

function Example() {
  return (
    <>
      {/* 바 형태 */}
      <Progress progress={0.7} variant="bar" />
      {/* 원형 형태 */}
      <Progress progress={0.7} variant="circle" />
    </>
  );
}`,
  },
  size: {
    title: '크기',
    description: '프로그레스 크기는 작은 것부터 큰 것까지 다양합니다.',
    codeContent: `import { Progress } from '@seolim/designsystem';

function Example() {
  return (
    <>
      {/* 바 형태 */}
      <Progress progress={0.5} size="sm" variant="bar" />
      <Progress progress={0.5} size="md" variant="bar" />
      <Progress progress={0.5} size="lg" variant="bar" />
      {/* 원형 형태 */}
      <Progress progress={0.5} size="sm" variant="circle" />
      <Progress progress={0.5} size="md" variant="circle" />
      <Progress progress={0.5} size="lg" variant="circle" />
    </>
  );
}`,
  },
  progress: {
    title: '진행률',
    description: '다양한 진행률을 표시할 수 있습니다.',
    codeContent: `import { Progress } from '@seolim/designsystem';

function Example() {
  return (
    <>
      <Progress progress={0} variant="bar" />
      <Progress progress={0.25} variant="bar" />
      <Progress progress={0.5} variant="bar" />
      <Progress progress={0.75} variant="bar" />
      <Progress progress={1} variant="bar" />
    </>
  );
}`,
  },
  percent: {
    title: '퍼센트 표시',
    description: 'percent prop을 사용하여 진행률을 퍼센트로 표시할 수 있습니다.',
    codeContent: `import { Progress } from '@seolim/designsystem';

function Example() {
  return (
    <>
      <Progress progress={0.65} variant="bar" percent />
      <Progress progress={0.65} variant="circle" percent />
    </>
  );
}`,
  },
  label: {
    title: '라벨',
    description: '라벨을 추가하여 프로그레스의 의미를 명확히 할 수 있습니다.',
    codeContent: `import { Progress } from '@seolim/designsystem';

function Example() {
  return (
    <>
      <Progress progress={0.6} variant="bar" label="업로드 중..." />
      <Progress progress={0.6} variant="circle" label="로딩" />
    </>
  );
}`,
  },
  labelPercent: {
    title: '라벨과 퍼센트',
    description: '라벨과 퍼센트를 동시에 표시할 수 있습니다.',
    codeContent: `import { Progress } from '@seolim/designsystem';

function Example() {
  return (
    <>
      <Progress progress={0.45} variant="bar" label="다운로드 중..." percent />
      <Progress progress={0.75} variant="circle" label="처리 중" percent />
      <Progress progress={0.33} variant="bar" label="업로드" percent color="#3b82f6" size="sm" />
      <Progress progress={0.67} variant="bar" label="변환 중" percent color="#22c55e" size="md" />
      <Progress progress={0.88} variant="bar" label="완료 중" percent color="#a855f7" size="lg" />
    </>
  );
}`,
  },
  color: {
    title: '색상',
    description: 'color prop을 사용하여 프로그레스의 색상을 변경할 수 있습니다.',
    codeContent: `import { Progress } from '@seolim/designsystem';

function Example() {
  return (
    <>
      <Progress progress={0.7} variant="bar" color="#3b82f6" />
      <Progress progress={0.7} variant="bar" color="#22c55e" />
      <Progress progress={0.7} variant="bar" color="#ef4444" />
      <Progress progress={0.7} variant="circle" color="#a855f7" />
    </>
  );
}`,
  },
  width: {
    title: '너비 설정',
    description: '바 형태일 때 width prop으로 너비를 설정할 수 있습니다.',
    codeContent: `import { Progress } from '@seolim/designsystem';

function Example() {
  return (
    <>
      <Progress progress={0.6} variant="bar" width={200} />
      <Progress progress={0.6} variant="bar" width="50%" />
      <Progress progress={0.6} variant="bar" width="100%" />
    </>
  );
}`,
  },
  example: {
    title: '예제',
    description: '실제 사용 시나리오 예제입니다.',
    codeContent: `import { Progress } from '@seolim/designsystem';

function Example() {
  return (
    <>
      <Progress progress={0.45} variant="bar" label="파일 업로드 중..." percent color="#3b82f6" width="100%" />
      <Progress progress={0.82} variant="bar" label="다운로드 중" percent color="#22c55e" size="lg" width="100%" />
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Progress progress={0.68} variant="circle" percent color="#a855f7" size="lg" />
        <div>
          <p>프로젝트 진행 상황</p>
          <p>15개 중 10개 완료</p>
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
          <span>1단계: 완료</span><span>100%</span>
        </div>
        <Progress progress={1} variant="bar" color="#22c55e" size="sm" />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
          <span>2단계: 진행 중</span><span>60%</span>
        </div>
        <Progress progress={0.6} variant="bar" color="#3b82f6" size="sm" />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
          <span>3단계: 대기 중</span><span>0%</span>
        </div>
        <Progress progress={0} variant="bar" color="#9ca3af" size="sm" />
      </div>
    </>
  );
}`,
  },
  combination: {
    title: '조합',
    description: '다양한 속성을 조합하여 커스텀 프로그레스를 만들 수 있습니다.',
    codeContent: `import { Progress } from '@seolim/designsystem';

function Example() {
  return (
    <>
      <Progress progress={0.35} variant="bar" size="sm" color="#f59e0b" label="작은 크기" percent width="300px" />
      <Progress progress={0.65} variant="bar" size="md" color="#ec4899" label="중간 크기" percent width="400px" />
      <Progress progress={0.85} variant="bar" size="lg" color="#8b5cf6" label="큰 크기" percent width="100%" />
      
      <Progress progress={0.3} variant="circle" size="sm" color="#f59e0b" percent />
      <Progress progress={0.6} variant="circle" size="md" color="#ec4899" percent />
      <Progress progress={0.9} variant="circle" size="lg" color="#8b5cf6" percent />
    </>
  );
}`,
  },
  animation: {
    title: '애니메이션',
    description: '프로그레스가 10%씩 증가하는 트랜지션 효과를 확인할 수 있습니다.',
    codeContent: `import { useState, useEffect } from 'react';
import { Progress } from '@seolim/designsystem';

function Example() {
  const [barProgress, setBarProgress] = useState(0);
  const [circleProgress, setCircleProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBarProgress((prev) => (prev >= 0.99 ? 0 : prev + 0.1));
      setCircleProgress((prev) => (prev >= 0.99 ? 0 : prev + 0.1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Progress
        progress={barProgress}
        variant="bar"
        label="로딩 중..."
        percent
        color="#3b82f6"
        width="100%"
        size="lg"
      />
      <Progress
        progress={circleProgress}
        variant="circle"
        label="처리 중"
        percent
        color="#22c55e"
        size="lg"
      />
    </>
  );
}`,
  },
};
