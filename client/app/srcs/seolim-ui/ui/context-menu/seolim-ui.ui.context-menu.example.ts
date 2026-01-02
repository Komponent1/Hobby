export const examples = {
  basic: {
    title: '기본 사용법',
    description: '영역을 우클릭하면 컨텍스트 메뉴가 표시됩니다.',
    codeContent: `
const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
const [selectedAction, setSelectedAction] = useState('');

const handleContextMenu = (e, setMenu) => {
  e.preventDefault();
  setMenu({ visible: true, x: e.clientX, y: e.clientY });
};

const handleMenuClick = (action, setMenu) => {
  setSelectedAction(action);
  setMenu({ visible: false, x: 0, y: 0 });
};

<div
  onContextMenu={(e) => handleContextMenu(e, setContextMenu)}
  onClick={() => setContextMenu({ visible: false, x: 0, y: 0 })}
>
  우클릭하세요
  {selectedAction && <div>선택된 동작: {selectedAction}</div>}
</div>
{contextMenu.visible && (
  <ContextMenu
    position={{ x: contextMenu.x, y: contextMenu.y }}
    visible={contextMenu.visible}
    onClose={() => setContextMenu({ visible: false, x: 0, y: 0 })}
  >
    <div onClick={() => handleMenuClick('복사', setContextMenu)}>복사</div>
    <div onClick={() => handleMenuClick('붙여넣기', setContextMenu)}>붙여넣기</div>
    <div onClick={() => handleMenuClick('삭제', setContextMenu)}>삭제</div>
  </ContextMenu>
)}
`,
  },
  divider: {
    title: '구분선 사용',
    description: 'dividerIndex 속성으로 메뉴 항목 사이에 구분선을 추가할 수 있습니다.',
    codeContent: `
<ContextMenu
  position={{ x, y }}
  visible={visible}
  onClose={onClose}
  dividerIndex={[2, 4]}
>
  <div>열기</div>
  <div>편집</div>
  <div>복사</div>
  <div>이름 변경</div>
  <div>삭제</div>
</ContextMenu>
`,
  },
  example: {
    title: '실제 사용 예제',
    description: '파일 관리 시스템 등 실제 시나리오에서의 컨텍스트 메뉴 예제입니다.',
    codeContent: `
<ContextMenu
  position={{ x, y }}
  visible={visible}
  onClose={onClose}
  dividerIndex={[1, 4, 6]}
>
  <div><span>📂</span> <span>열기</span></div>
  <div><span>🗔</span> <span>새 창에서 열기</span></div>
  <div><span>⬇️</span> <span>다운로드</span></div>
  <div><span>🔗</span> <span>공유</span></div>
  <div><span>✏️</span> <span>이름 변경</span></div>
  <div><span>⭐</span> <span>즐겨찾기 추가</span></div>
  <div><span>🗑️</span> <span>삭제</span></div>
</ContextMenu>
`,
  },
};
