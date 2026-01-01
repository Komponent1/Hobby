export const examples = {
  variant: {
    title: 'variant 예제',
    description: 'variant prop에 따라 사이드바 동작이 달라집니다.',
    codeContent: `import { Sidebar } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', height: 384 }}>
      <div style={{ flex: 1, background: '#e5e7eb', borderRadius: '0 16px 16px 0' }}>
        <Sidebar variant="alwaysOpen" width={200} position="left" style={{ border: '1px solid #eee' }}>
          <div style={{ padding: 16 }}>alwaysOpen (왼쪽)</div>
        </Sidebar>
      </div>
      <div style={{ flex: 1, background: '#e5e7eb', borderRadius: '0 16px 16px 0' }}>
        <Sidebar variant="collapsible" width={200} position="left" style={{ border: '1px solid #eee' }}>
          <div style={{ padding: 16 }}>collapsible (왼쪽)</div>
        </Sidebar>
      </div>
    </div>
  );
}`,
  },
  position: {
    title: 'position 예제',
    description: 'position prop에 따라 사이드바 위치가 달라집니다.',
    codeContent: `import { Sidebar } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', height: 384 }}>
      <div style={{ flex: 1, background: '#e5e7eb', borderRadius: '0 16px 16px 0' }}>
        <Sidebar variant="alwaysOpen" width={180} position="left" style={{ border: '1px solid #eee' }}>
          <div style={{ padding: 16 }}>왼쪽 사이드바</div>
        </Sidebar>
      </div>
      <div style={{ flex: 1, background: '#e5e7eb', borderRadius: '16px 0 0 16px' }}>
        <Sidebar variant="alwaysOpen" width={180} position="right" style={{ border: '1px solid #eee' }}>
          <div style={{ padding: 16 }}>오른쪽 사이드바</div>
        </Sidebar>
      </div>
    </div>
  );
}`,
  },
  button: {
    title: 'buttonTop, buttonSize, buttonStyle',
    description: '접기/펼치기 버튼의 위치, 크기(\'sm\', \'md\', \'lg\'), 스타일을 지정할 수 있습니다.',
    codeContent: `import { Sidebar } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', height: 384 }}>
      <div style={{ flex: 1, background: '#e5e7eb' }}>
        <Sidebar variant="collapsible" buttonTop={40} buttonSize="lg" buttonStyle={{ background: '#3b82f6', color: '#fff' }} style={{ border: '1px solid #eee' }}>
          <div style={{ padding: 16 }}>buttonSize="lg" 커스텀 버튼 스타일</div>
        </Sidebar>
      </div>
      <div style={{ flex: 1, background: '#e5e7eb' }}>
        <Sidebar variant="collapsible" buttonTop={10} buttonSize="sm" buttonStyle={{ background: '#22c55e', color: '#fff' }} style={{ border: '1px solid #eee' }}>
          <div style={{ padding: 16 }}>buttonSize="sm" 커스텀 버튼 스타일</div>
        </Sidebar>
      </div>
    </div>
  );
}`,
  },
  realworld: {
    title: '실제 사용 예제',
    description: '실제 레이아웃에서 Sidebar를 활용하는 예시입니다.',
    codeContent: `import { Sidebar } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: 8, overflow: 'hidden', border: '2px solid #000', height: 384 }}>
      <div style={{ width: 220, minWidth: 180 }}>
        <Sidebar variant="alwaysOpen" width={220} position="left" style={{ height: '100%', borderRight: '1px solid #eee' }}>
          <div style={{ padding: 20 }}>
            <div style={{ fontWeight: 600, marginBottom: 12 }}>메뉴</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 8 }}><span style={{ color: '#2563eb', textDecoration: 'none' }}>대시보드</span></li>
              <li style={{ marginBottom: 8 }}><span style={{ color: '#374151', textDecoration: 'none' }}>문서 관리</span></li>
              <li style={{ marginBottom: 8 }}><span style={{ color: '#374151', textDecoration: 'none' }}>설정</span></li>
            </ul>
          </div>
        </Sidebar>
      </div>
      <div style={{ flex: 1, background: '#fff', padding: 32 }}>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>메인 컨텐츠 영역</div>
        <div style={{ color: '#4b5563' }}>이곳에 페이지의 주요 컨텐츠가 들어갑니다. 사이드바를 통해 메뉴를 이동할 수 있습니다.</div>
      </div>
    </div>
  );
}`,
  },
};
