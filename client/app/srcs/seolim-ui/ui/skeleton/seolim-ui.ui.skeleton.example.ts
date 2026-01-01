export const examples = {
  basic: {
    title: '기본 사용법',
    description: '기본적인 스켈레톤 형태입니다.',
    codeContent: `import { Skeleton } from '@seolim/designsystem';

function Example() {
  return <Skeleton />;
}`,
  },
  variant: {
    title: '변형',
    description: 'variant 속성으로 스켈레톤의 스타일을 변경할 수 있습니다.',
    codeContent: `import { Skeleton } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 16 }}>Simple (기본)</p>
        <Skeleton variant="simple" />
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 16 }}>Card</p>
        <Skeleton variant="card" />
      </div>
    </div>
  );
}`,
  },
  lineCount: {
    title: '라인 수',
    description: 'lineCount 속성으로 표시할 라인의 수를 지정할 수 있습니다.',
    codeContent: `import { Skeleton } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 16 }}>3 Lines</p>
        <Skeleton variant="simple" lineCount={3} />
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 16 }}>5 Lines (기본)</p>
        <Skeleton variant="simple" lineCount={5} />
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 16 }}>7 Lines</p>
        <Skeleton variant="simple" lineCount={7} />
      </div>
    </div>
  );
}`,
  },
  size: {
    title: '크기',
    description: 'size 속성으로 스켈레톤의 크기를 조절할 수 있습니다.',
    codeContent: `import { Skeleton } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 16 }}>Small</p>
        <Skeleton variant="simple" size="sm" />
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 16 }}>Medium (기본)</p>
        <Skeleton variant="simple" size="md" />
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 16 }}>Large</p>
        <Skeleton variant="simple" size="lg" />
      </div>
    </div>
  );
}`,
  },
};
