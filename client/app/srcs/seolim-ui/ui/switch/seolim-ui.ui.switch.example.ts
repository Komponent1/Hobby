export const examples = {
  basic: {
    title: '기본 사용법',
    description: '기본 스위치 사용 예제입니다.',
    codeContent: `import { Switch } from '@seolim/designsystem';
import { useState } from 'react';

function Example() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch checked={checked} onChange={setChecked} />
  );
}`,
  },
  size: {
    title: '크기',
    description: 'size prop으로 스위치 크기를 설정할 수 있습니다.',
    codeContent: `import { Switch } from '@seolim/designsystem';
import { useState } from 'react';

function Example() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Switch size="sm" checked={checked1} onChange={setChecked1} />
        <span style={{ fontSize: 12, color: '#4b5563' }}>Small</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Switch size="md" checked={checked2} onChange={setChecked2} />
        <span style={{ fontSize: 12, color: '#4b5563' }}>Medium</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Switch size="lg" checked={checked3} onChange={setChecked3} />
        <span style={{ fontSize: 12, color: '#4b5563' }}>Large</span>
      </div>
    </div>
  );
}`,
  },
  state: {
    title: '상태',
    description: 'disabled prop으로 스위치 상태를 제어할 수 있습니다.',
    codeContent: `import { Switch } from '@seolim/designsystem';
import { useState } from 'react';

function Example() {
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Switch checked={true} onChange={() => {}} />
        <span style={{ fontSize: 12, color: '#4b5563' }}>Checked</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Switch checked={false} onChange={() => {}} />
        <span style={{ fontSize: 12, color: '#4b5563' }}>Unchecked</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Switch checked={true} disabled onChange={() => {}} />
        <span style={{ fontSize: 12, color: '#4b5563' }}>Disabled</span>
      </div>
    </div>
  );
}`,
  },
  accentColor: {
    title: '강조 색상',
    description: 'accentColor prop으로 스위치 색상을 변경할 수 있습니다.',
    codeContent: `import { Switch } from '@seolim/designsystem';
import { useState } from 'react';

function Example() {
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(true);
  const [checked4, setChecked4] = useState(true);
  const [checked5, setChecked5] = useState(true);

  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Switch accentColor="#3b82f6" checked={checked1} onChange={setChecked1} />
        <span style={{ fontSize: 12, color: '#4b5563' }}>파란색</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Switch accentColor="#22c55e" checked={checked2} onChange={setChecked2} />
        <span style={{ fontSize: 12, color: '#4b5563' }}>초록색</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Switch accentColor="#ef4444" checked={checked3} onChange={setChecked3} />
        <span style={{ fontSize: 12, color: '#4b5563' }}>빨간색</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Switch accentColor="#a855f7" checked={checked4} onChange={setChecked4} />
        <span style={{ fontSize: 12, color: '#4b5563' }}>보라색</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Switch accentColor="#f59e0b" checked={checked5} onChange={setChecked5} />
        <span style={{ fontSize: 12, color: '#4b5563' }}>주황색</span>
      </div>
    </div>
  );
}`,
  },
  realworld: {
    title: '실제 사용 예제',
    description: '알림, 개인정보, 접근성, 기능 설정 등 실제 시나리오 예제입니다.',
    codeContent: `import { Switch } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 16 }}>
      <div style={{ padding: 16, border: '1px solid #e5e7eb', borderRadius: 8 }}>
        <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>알림 설정</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>푸시 알림</div>
              <div style={{ fontSize: 13, color: '#4b5563' }}>앱에서 알림을 받습니다</div>
            </div>
            <Switch checked accentColor="#22c55e" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>이메일 알림</div>
              <div style={{ fontSize: 13, color: '#4b5563' }}>이메일로 알림을 받습니다</div>
            </div>
            <Switch checked={false} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>SMS 알림</div>
              <div style={{ fontSize: 13, color: '#4b5563' }}>문자 메시지로 알림을 받습니다</div>
            </div>
            <Switch checked={false} />
          </div>
        </div>
      </div>

      <div style={{ padding: 16, border: '1px solid #e5e7eb', borderRadius: 8 }}>
        <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>개인정보 설정</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>프로필 공개</div>
              <div style={{ fontSize: 13, color: '#4b5563' }}>다른 사용자에게 프로필을 공개합니다</div>
            </div>
            <Switch checked />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>활동 상태 표시</div>
              <div style={{ fontSize: 13, color: '#4b5563' }}>온라인 상태를 표시합니다</div>
            </div>
            <Switch checked accentColor="#3b82f6" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>검색 허용</div>
              <div style={{ fontSize: 13, color: '#4b5563' }}>검색 결과에 포함됩니다</div>
            </div>
            <Switch checked={false} />
          </div>
        </div>
      </div>

      <div style={{ padding: 16, border: '1px solid #e5e7eb', borderRadius: 8 }}>
        <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>접근성 설정</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>다크 모드</div>
              <div style={{ fontSize: 13, color: '#4b5563' }}>어두운 테마를 사용합니다</div>
            </div>
            <Switch checked={false} accentColor="#6b7280" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>큰 텍스트</div>
              <div style={{ fontSize: 13, color: '#4b5563' }}>글자 크기를 크게 표시합니다</div>
            </div>
            <Switch checked accentColor="#22c55e" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>고대비 모드</div>
              <div style={{ fontSize: 13, color: '#4b5563' }}>높은 대비로 표시합니다</div>
            </div>
            <Switch checked={false} />
          </div>
        </div>
      </div>

      <div style={{ padding: 16, border: '1px solid #e5e7eb', borderRadius: 8 }}>
        <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>기능 설정</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>자동 저장</div>
              <div style={{ fontSize: 13, color: '#4b5563' }}>작업 내용을 자동으로 저장합니다</div>
            </div>
            <Switch checked accentColor="#22c55e" size="sm" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>자동 업데이트</div>
              <div style={{ fontSize: 13, color: '#4b5563' }}>앱을 자동으로 업데이트합니다</div>
            </div>
            <Switch checked accentColor="#3b82f6" size="sm" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>오프라인 모드</div>
              <div style={{ fontSize: 13, color: '#4b5563' }}>인터넷 없이도 사용 가능합니다</div>
            </div>
            <Switch checked={false} size="sm" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>베타 기능</div>
              <div style={{ fontSize: 13, color: '#4b5563' }}>실험적인 기능을 사용합니다</div>
            </div>
            <Switch checked={false} accentColor="#ef4444" size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}`,
  },
};
