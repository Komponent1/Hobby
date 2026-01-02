export const examples = {
  basic: {
    title: '기본 사용법',
    description: '기본 스낵바 사용 예제입니다.',
    codeContent: `import { Snackbar } from '@seolim/designsystem';
import { useState } from 'react';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>스낵바 열기</button>
      <Snackbar isOpen={isOpen} onClose={() => setIsOpen(false)}>
        작업이 완료되었습니다.
      </Snackbar>
    </div>
  );
}`,
  },
  position: {
    title: '위치',
    description: 'position prop으로 스낵바의 고위치를 설정할 수 있습니다.',
    codeContent: `import { Snackbar } from '@seolim/designsystem';
import { useState } from 'react';

function Example() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button onClick={() => setIsOpen1(true)}>상단</button>
      <Snackbar position="top" isOpen={isOpen1} onClose={() => setIsOpen1(false)}>
        상단에 표시됩니다.
      </Snackbar>

      <button onClick={() => setIsOpen2(true)}>우상단</button>
      <Snackbar position="top-right" isOpen={isOpen2} onClose={() => setIsOpen2(false)}>
        우상단에 표시됩니다.
      </Snackbar>

      <button onClick={() => setIsOpen3(true)}>좌하단</button>
      <Snackbar position="bottom-left" isOpen={isOpen3} onClose={() => setIsOpen3(false)}>
        좌하단에 표시됩니다.
      </Snackbar>
    </div>
  );
}`,
  },
  animation: {
    title: '애니메이션',
    description: 'animation prop으로 스낵바의 애니메이션을 설정할 수 있습니다.',
    codeContent: `import { Snackbar } from '@seolim/designsystem';
import { useState } from 'react';

function Example() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button onClick={() => setIsOpen1(true)}>페이드</button>
      <Snackbar animation="fade" isOpen={isOpen1} onClose={() => setIsOpen1(false)}>
        페이드 애니메이션
      </Snackbar>

      <button onClick={() => setIsOpen2(true)}>확대</button>
      <Snackbar animation="grow" isOpen={isOpen2} onClose={() => setIsOpen2(false)}>
        확대 애니메이션
      </Snackbar>
    </div>
  );
}`,
  },
  dragable: {
    title: '드래그 가능',
    description: 'dragable prop으로 스낵바를 드래그할 수 있습니다.',
    codeContent: `import { Snackbar } from '@seolim/designsystem';
import { useState } from 'react';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>드래그 가능 스낵바</button>
      <Snackbar
        dragable
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        이 스낵바는 드래그할 수 있습니다.
      </Snackbar>
    </div>
  );
}`,
  },
  realworld: {
    title: '실제 사용 예제',
    description: '폼 제출, 삭제, 알림 등 실제 시나리오에서의 스낵바 활용 예시입니다.',
    codeContent: `import { Snackbar } from '@seolim/designsystem';
import { useState } from 'react';

function Example() {
  const [openSave, setOpenSave] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ padding: 16, border: '1px solid #e5e7eb', borderRadius: 8 }}>
        <p style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>폼 제출 시나리오</p>
        <button onClick={() => setOpenSave(true)}>저장 성공</button>
        <Snackbar
          isOpen={openSave}
          duration={4000}
          position="bottom"
          animation="slide"
          onClose={() => setOpenSave(false)}
        >
          ✅ 데이터가 성공적으로 저장되었습니다!
        </Snackbar>
      </div>

      <div style={{ padding: 16, border: '1px solid #e5e7eb', borderRadius: 8 }}>
        <p style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>삭제 작업 시나리오</p>
        <button onClick={() => setOpenDelete(true)}>항목 삭제</button>
        <Snackbar
          isOpen={openDelete}
          duration={3000}
          position="bottom"
          animation="fade"
          onClose={() => setOpenDelete(false)}
        >
          🗑️ 항목이 삭제되었습니다.
        </Snackbar>
      </div>

      <div style={{ padding: 16, border: '1px solid #e5e7eb', borderRadius: 8 }}>
        <p style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>알림 메시지 시나리오</p>
        <button onClick={() => setOpenMessage(true)}>새 메시지 도착</button>
        <Snackbar
          isOpen={openMessage}
          duration={5000}
          position="top-left"
          animation="grow"
          dragable
          onClose={() => setOpenMessage(false)}
        >
          📬 새로운 메시지가 3개 도착했습니다.
        </Snackbar>
      </div>
    </div>
  );
}`,
  },
};
