export const examples = {
  basic: {
    title: '기본 사용법',
    description: '기본 스피너입니다.',
    codeContent: `import { Spinner } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, background: '#f9fafb', borderRadius: 4 }}>
      <Spinner />
    </div>
  );
}`,
  },
  size: {
    title: '크기',
    description: '스피너 크기는 sm, md, lg 또는 커스텀 픽셀 값으로 설정할 수 있습니다.',
    codeContent: `import { Spinner } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 8 }}>사전 정의된 크기</p>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', padding: 32, background: '#f9fafb', borderRadius: 4 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Spinner size="sm" />
            <span style={{ fontSize: 12, color: '#4b5563' }}>Small</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Spinner size="md" />
            <span style={{ fontSize: 12, color: '#4b5563' }}>Medium</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Spinner size="lg" />
            <span style={{ fontSize: 12, color: '#4b5563' }}>Large</span>
          </div>
        </div>
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 8 }}>커스텀 픽셀 크기</p>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', padding: 32, background: '#f9fafb', borderRadius: 4 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Spinner size={24} />
            <span style={{ fontSize: 12, color: '#4b5563' }}>24px</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Spinner size={40} />
            <span style={{ fontSize: 12, color: '#4b5563' }}>40px</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Spinner size={64} />
            <span style={{ fontSize: 12, color: '#4b5563' }}>64px</span>
          </div>
        </div>
      </div>
    </div>
  );
}`,
  },
  variant: {
    title: '변형',
    description: 'default는 시계 방향, inverted는 반시계 방향으로 회전합니다.',
    codeContent: `import { Spinner } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 8 }}>Default (시계 방향 회전)</p>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'center', padding: 32, background: '#f9fafb', borderRadius: 4 }}>
          <Spinner variant="default" size="sm" />
          <Spinner variant="default" size="md" />
          <Spinner variant="default" size="lg" />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 8 }}>Inverted (반시계 방향 회전)</p>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'center', padding: 32, background: '#f9fafb', borderRadius: 4 }}>
          <Spinner variant="inverted" size="sm" />
          <Spinner variant="inverted" size="md" />
          <Spinner variant="inverted" size="lg" />
        </div>
      </div>
    </div>
  );
}`,
  },
  color: {
    title: '색상',
    description: 'color prop을 사용하여 스피너의 색상을 변경할 수 있습니다.',
    codeContent: `import { Spinner } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center', padding: 32, background: '#f9fafb', borderRadius: 4, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Spinner color="#3b82f6" size="lg" />
        <span style={{ fontSize: 12, color: '#4b5563' }}>파란색</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Spinner color="#22c55e" size="lg" />
        <span style={{ fontSize: 12, color: '#4b5563' }}>초록색</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Spinner color="#ef4444" size="lg" />
        <span style={{ fontSize: 12, color: '#4b5563' }}>빨간색</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Spinner color="#a855f7" size="lg" />
        <span style={{ fontSize: 12, color: '#4b5563' }}>보라색</span>
      </div>
    </div>
  );
}`,
  },
  realworld: {
    title: '사용 예제',
    description: '실제 사용 시나리오 예제입니다.',
    codeContent: `import { Spinner, Button } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>페이지 로딩</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: 24, background: '#f9fafb', borderRadius: 8 }}>
          <Spinner size="lg" />
          <p style={{ fontSize: 14, color: '#4b5563' }}>페이지를 불러오는 중...</p>
        </div>
      </div>

      <div>
        <p style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>버튼 내부 로딩</p>
        <div style={{ display: 'flex', gap: 16 }}>
          <Button
            variant="solid"
            color="#3b82f6"
            content={(<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Spinner size="sm" color="#ffffff" /><span>처리 중...</span></div>)}
          />
          <Button
            variant="solid"
            color="#22c55e"
            content={(<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Spinner size="sm" variant="inverted" color="#ffffff" /><span>저장 중...</span></div>)}
          />
        </div>
      </div>

      <div>
        <p style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>인라인 로딩</p>
        <div style={{ padding: 16, background: '#f9fafb', borderRadius: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Spinner size="sm" />
            <span style={{ fontSize: 14, color: '#4b5563' }}>데이터를 가져오는 중입니다...</span>
          </div>
        </div>
      </div>

      <div>
        <p style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>카드 로딩</p>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>사용자 정보</h3>
            <Spinner size="sm" color="#3b82f6" />
          </div>
          <p style={{ fontSize: 14, color: '#4b5563' }}>사용자 데이터를 불러오는 중...</p>
        </div>
      </div>

      <div>
        <p style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>오버레이 로딩</p>
        <div style={{ position: 'relative', padding: 24, background: '#f3f4f6', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <Spinner size={48} color="#3b82f6" />
              <p style={{ fontSize: 14, fontWeight: 600, color: '#374151', margin: 0 }}>잠시만 기다려주세요...</p>
            </div>
          </div>
          <div style={{ color: '#9ca3af' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>콘텐츠 영역</h3>
            <p style={{ margin: 0 }}>이 영역은 로딩이 완료될 때까지 가려집니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}`,
  },
  combination: {
    title: '조합',
    description: '다양한 속성을 조합하여 커스텀 스피너를 만들 수 있습니다.',
    codeContent: `import { Spinner } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 16, marginTop: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 16, background: '#f9fafb', borderRadius: 8 }}>
        <Spinner size="sm" color="#3b82f6" />
        <span style={{ fontSize: 12, color: '#4b5563' }}>Small + Blue</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 16, background: '#f9fafb', borderRadius: 8 }}>
        <Spinner size="md" color="#22c55e" />
        <span style={{ fontSize: 12, color: '#4b5563' }}>Medium + Green</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 16, background: '#f9fafb', borderRadius: 8 }}>
        <Spinner size="lg" color="#ef4444" />
        <span style={{ fontSize: 12, color: '#4b5563' }}>Large + Red</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 16, background: '#f9fafb', borderRadius: 8 }}>
        <Spinner size="sm" variant="inverted" />
        <span style={{ fontSize: 12, color: '#4b5563' }}>Small + 반시계</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 16, background: '#f9fafb', borderRadius: 8 }}>
        <Spinner size={56} variant="inverted" />
        <span style={{ fontSize: 12, color: '#4b5563' }}>56px + 반시계</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 16, background: '#f9fafb', borderRadius: 8 }}>
        <Spinner size={72} color="#a855f7" />
        <span style={{ fontSize: 12, color: '#4b5563' }}>72px + Purple</span>
      </div>
    </div>
  );
}`,
  },
};
