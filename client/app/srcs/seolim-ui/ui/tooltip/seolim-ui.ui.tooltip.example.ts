export const examples = {
  basic: {
    title: '기본 사용법',
    description: '기본 툴팁 사용 예제입니다.',
    codeContent: `import { Tooltip } from '@seolim/designsystem';

function Example() {
  return (
    <Tooltip content="기본 툴팁입니다">
      <button style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #ccc' }}>
        호버하세요
      </button>
    </Tooltip>
  );
}`,
  },
  position: {
    title: '위치',
    description: 'position prop으로 툴팁 위치를 설정할 수 있습니다.',
    codeContent: `import { Tooltip } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <Tooltip position="top" content="상단">
        <button style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #ccc' }}>Top</button>
      </Tooltip>
      <Tooltip position="bottom" content="하단">
        <button style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #ccc' }}>Bottom</button>
      </Tooltip>
      <Tooltip position="left" content="좌측">
        <button style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #ccc' }}>Left</button>
      </Tooltip>
      <Tooltip position="right" content="우측">
        <button style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #ccc' }}>Right</button>
      </Tooltip>
    </div>
  );
}`,
  },
  arrow: {
    title: '화살표',
    description: 'arrow prop으로 화살표를 추가할 수 있습니다.',
    codeContent: `import { Tooltip } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <Tooltip content="화살표 없음">
        <button style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #ccc' }}>
          No Arrow
        </button>
      </Tooltip>
      <Tooltip arrow content="화살표 있음">
        <button style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #ccc' }}>
          With Arrow
        </button>
      </Tooltip>
    </div>
  );
}`,
  },
  color: {
    title: '색상',
    description: 'backgroundColor와 textColor prop으로 색상을 변경할 수 있습니다.',
    codeContent: `import { Tooltip } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'center', padding: 32, flexWrap: 'wrap' }}>
      <Tooltip 
        content="파란색" 
        backgroundColor="#3b82f6" 
        textColor="#ffffff"
      >
        <button style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #ccc' }}>
          Blue
        </button>
      </Tooltip>
      <Tooltip 
        content="초록색" 
        backgroundColor="#22c55e" 
        textColor="#ffffff"
      >
        <button style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #ccc' }}>
          Green
        </button>
      </Tooltip>
      <Tooltip 
        content="빨간색" 
        backgroundColor="#ef4444" 
        textColor="#ffffff"
      >
        <button style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #ccc' }}>
          Red
        </button>
      </Tooltip>
    </div>
  );
}`,
  },
  content: {
    title: '다양한 콘텐츠',
    description: '텍스트뿐 아니라 리액트 요소도 툴팁 내용으로 사용할 수 있습니다.',
    codeContent: `import { Tooltip, Button } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
      <Tooltip content={<span style={{ fontWeight: 700 }}>굵은 텍스트</span>} arrow>
        <Button type="button" content="굵은 텍스트" onClick={() => {}} />
      </Tooltip>
      <Tooltip
        content={(
          <div>
            <div style={{ fontWeight: 700 }}>제목</div>
            <div style={{ fontSize: 12 }}>설명 텍스트</div>
          </div>
        )}
        arrow
      >
        <Button type="button" content="여러 줄" onClick={() => {}} />
      </Tooltip>
      <Tooltip content={<div style={{ maxWidth: 240 }}>이것은 긴 텍스트 예제입니다. 툴팁에 긴 설명이 필요할 때 사용할 수 있습니다.</div>} arrow>
        <Button type="button" content="긴 텍스트" onClick={() => {}} />
      </Tooltip>
    </div>
  );
}`,
  },
  width: {
    title: '너비 설정',
    description: 'width prop으로 툴팁 너비를 조정할 수 있습니다.',
    codeContent: `import { Tooltip, Button } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 24, padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Tooltip content="기본 너비" position="top" arrow>
          <Button type="button" content="기본" onClick={() => {}} />
        </Tooltip>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Tooltip content="150px 너비의 툴팁입니다" position="top" arrow width={150}>
          <Button type="button" content="150px" onClick={() => {}} />
        </Tooltip>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Tooltip content="250px 너비의 툴팁입니다. 더 긴 내용을 표시할 수 있습니다." position="top" arrow width={250}>
          <Button type="button" content="250px" onClick={() => {}} />
        </Tooltip>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Tooltip
          content={(
            <div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>커스텀 너비 (350px)</div>
              <div style={{ fontSize: 14 }}>너비를 조정하면 긴 텍스트나 복잡한 내용도 깔끔하게 표시할 수 있습니다.</div>
            </div>
          )}
          position="top"
          arrow
          width={350}
          backgroundColor="#3b82f6"
          textColor="#ffffff"
        >
          <Button type="button" content="350px" onClick={() => {}} />
        </Tooltip>
      </div>
    </div>
  );
}`,
  },
  realworld: {
    title: '사용 예제',
    description: '아이콘 버튼, 정보 안내, 상태 표시 등 실사용 시나리오 예시입니다.',
    codeContent: `import { Tooltip } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'grid', gap: 32 }}>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <Tooltip content="저장" position="top" arrow>
          <button type="button" style={{ padding: 8, border: '1px solid #e5e7eb', borderRadius: 8 }}>💾</button>
        </Tooltip>
        <Tooltip content="삭제" position="top" arrow>
          <button type="button" style={{ padding: 8, border: '1px solid #e5e7eb', borderRadius: 8 }}>🗑️</button>
        </Tooltip>
        <Tooltip content="편집" position="top" arrow>
          <button type="button" style={{ padding: 8, border: '1px solid #e5e7eb', borderRadius: 8 }}>✏️</button>
        </Tooltip>
        <Tooltip content="공유" position="top" arrow>
          <button type="button" style={{ padding: 8, border: '1px solid #e5e7eb', borderRadius: 8 }}>📤</button>
        </Tooltip>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 14, color: '#4b5563' }}>사용자 이름</span>
        <Tooltip
          content="사용자 이름은 3-20자 사이여야 하며, 영문, 숫자, 언더스코어만 사용 가능합니다."
          position="right"
          arrow
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', background: '#e5e7eb', fontSize: 12, cursor: 'help' }}>
            ?
          </span>
        </Tooltip>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <Tooltip content="온라인" backgroundColor="#22c55e" textColor="#ffffff" position="top" arrow>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 8, cursor: 'pointer' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
            <span>사용자 1</span>
          </div>
        </Tooltip>
        <Tooltip content="자리비움" backgroundColor="#f59e0b" textColor="#ffffff" position="top" arrow>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 8, cursor: 'pointer' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
            <span>사용자 2</span>
          </div>
        </Tooltip>
        <Tooltip content="오프라인" backgroundColor="#6b7280" textColor="#ffffff" position="top" arrow>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 8, cursor: 'pointer' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6b7280' }} />
            <span>사용자 3</span>
          </div>
        </Tooltip>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Tooltip content="이것은 매우 긴 파일 이름입니다_최종_수정본_진짜최종_20231212.pdf" position="top" arrow>
          <div style={{ maxWidth: 240, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 8, cursor: 'pointer' }}>
            이것은 매우 긴 파일 이름입니다_최종_수정본_진짜최종_20231212.pdf
          </div>
        </Tooltip>
      </div>
    </div>
  );
}`,
  },
  combination: {
    title: '조합',
    description: '색상, 위치, 화살표 유무 등을 조합해 다양한 스타일을 만들 수 있습니다.',
    codeContent: `import { Tooltip, Button } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16, padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Tooltip content="위쪽 파란색 화살표" position="top" arrow backgroundColor="#3b82f6" textColor="#ffffff">
          <Button type="button" content="조합 1" onClick={() => {}} />
        </Tooltip>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Tooltip content="아래쪽 초록색 화살표" position="bottom" arrow backgroundColor="#22c55e" textColor="#ffffff">
          <Button type="button" content="조합 2" onClick={() => {}} />
        </Tooltip>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Tooltip content="왼쪽 보라색 화살표 없음" position="left" arrow={false} backgroundColor="#a855f7" textColor="#ffffff">
          <Button type="button" content="조합 3" onClick={() => {}} />
        </Tooltip>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Tooltip
          content={(
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700 }}>복잡한 내용</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>여러 요소 조합</div>
            </div>
          )}
          position="right"
          arrow
          backgroundColor="#ef4444"
          textColor="#ffffff"
        >
          <Button type="button" content="조합 4" onClick={() => {}} />
        </Tooltip>
      </div>
    </div>
  );
}`,
  },
};
