export const examples = {
  basic: {
    title: '기본 사용법',
    description: '기본 탭 사용 예제입니다.',
    codeContent: `import { Tab } from '@seolim/designsystem';
import { useState } from 'react';

function Example() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];

  return (
    <Tab tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
  );
}`,
  },
  variant: {
    title: '변형',
    description: 'variant prop으로 탭 스타일을 변경할 수 있습니다.',
    codeContent: `import { Tab } from '@seolim/designsystem';
import { useState } from 'react';

function Example() {
  const [activeTab1, setActiveTab1] = useState(0);
  const [activeTab2, setActiveTab2] = useState(0);
  const [activeTab3, setActiveTab3] = useState(0);
  const [activeTab4, setActiveTab4] = useState(0);
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 16 }}>Line</p>
        <Tab variant="line" tabs={tabs} activeTab={activeTab1} onChange={setActiveTab1} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 16 }}>Box</p>
        <Tab variant="box" tabs={tabs} activeTab={activeTab2} onChange={setActiveTab2} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 16 }}>Pill</p>
        <Tab variant="pill" tabs={tabs} activeTab={activeTab3} onChange={setActiveTab3} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 16 }}>Segment</p>
        <Tab variant="segment" tabs={tabs} activeTab={activeTab4} onChange={setActiveTab4} />
      </div>
    </div>
  );
}`,
  },
  bordered: {
    title: '테두리',
    description: 'bordered prop으로 테두리를 추가할 수 있습니다.',
    codeContent: `import { Tab } from '@seolim/designsystem';
import { useState } from 'react';

function Example() {
  const [activeTab1, setActiveTab1] = useState(0);
  const [activeTab2, setActiveTab2] = useState(0);
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 16 }}>No Border</p>
        <Tab tabs={tabs} activeTab={activeTab1} onChange={setActiveTab1} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#4b5563', marginBottom: 16 }}>With Border</p>
        <Tab bordered tabs={tabs} activeTab={activeTab2} onChange={setActiveTab2} />
      </div>
    </div>
  );
}`,
  },
  defaultIndex: {
    title: '기본 탭 설정',
    description: 'defaultIndex prop으로 처음 표시될 탭을 지정할 수 있습니다.',
    codeContent: `import { Tab } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ padding: 32 }}>
      <Tab tabs={["첫 번째", "두 번째", "세 번째"]} defaultIndex={1}>
        {[
          <div key="1" style={{ padding: 16 }}>첫 번째 탭</div>,
          <div key="2" style={{ padding: 16 }}>두 번째 탭 (기본 선택)</div>,
          <div key="3" style={{ padding: 16 }}>세 번째 탭</div>,
        ]}
      </Tab>
    </div>
  );
}`,
  },
  realworld: {
    title: '사용 예제',
    description: '제품 정보, 대시보드, 설정 페이지 등 실제 시나리오 예제입니다.',
    codeContent: `import { Tab } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 16 }}>
      <div>
        <p style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>제품 정보</p>
        <Tab variant="line" tabs={["상세 정보", "리뷰", "배송 정보"]} bordered>
          {[
            <div key="1" style={{ padding: 16 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>상품 상세</h3>
              <p style={{ fontSize: 14, color: '#4b5563', margin: 0 }}>
                고품질 소재로 제작된 프리미엄 제품입니다. 내구성이 뛰어나며 오랜 시간 사용할 수 있습니다.
              </p>
            </div>,
            <div key="2" style={{ padding: 16 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>고객 리뷰</h3>
              <p style={{ fontSize: 14, color: '#4b5563', margin: 0 }}>⭐⭐⭐⭐⭐ 5.0 (128개 리뷰)</p>
              <p style={{ fontSize: 14, marginTop: 8 }}>&rdquo;품질이 정말 좋아요!&rdquo;</p>
            </div>,
            <div key="3" style={{ padding: 16 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>배송 안내</h3>
              <p style={{ fontSize: 14, color: '#4b5563', margin: 0 }}>
                - 평일 오후 2시 이전 주문 시 당일 발송<br />- 제주/도서산간 지역 추가 배송비 발생
              </p>
            </div>,
          ]}
        </Tab>
      </div>

      <div>
        <p style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>대시보드</p>
        <Tab variant="box" tabs={["개요", "통계", "활동"]} defaultIndex={0}>
          {[
            <div key="1" style={{ padding: 16 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>대시보드 개요</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 16 }}>
                <div style={{ padding: 16, background: '#eff6ff', borderRadius: 8 }}>
                  <p style={{ fontSize: 13, color: '#4b5563', margin: 0 }}>총 사용자</p>
                  <p style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>1,234</p>
                </div>
                <div style={{ padding: 16, background: '#ecfdf3', borderRadius: 8 }}>
                  <p style={{ fontSize: 13, color: '#4b5563', margin: 0 }}>활성 사용자</p>
                  <p style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>856</p>
                </div>
                <div style={{ padding: 16, background: '#f5f3ff', borderRadius: 8 }}>
                  <p style={{ fontSize: 13, color: '#4b5563', margin: 0 }}>신규 가입</p>
                  <p style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>42</p>
                </div>
              </div>
            </div>,
            <div key="2" style={{ padding: 16 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>통계 정보</h3>
              <p style={{ fontSize: 14, color: '#4b5563', margin: 0 }}>월별 사용자 증가율: +12.5%</p>
            </div>,
            <div key="3" style={{ padding: 16 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>최근 활동</h3>
              <ul style={{ fontSize: 14, color: '#4b5563', margin: 0, paddingLeft: 16 }}>
                <li>사용자 A가 로그인했습니다.</li>
                <li>사용자 B가 프로필을 수정했습니다.</li>
                <li>사용자 C가 새 게시글을 작성했습니다.</li>
              </ul>
            </div>,
          ]}
        </Tab>
      </div>

      <div>
        <p style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>설정 페이지</p>
        <Tab variant="pill" tabs={["일반", "보안", "알림", "개인정보"]}>
          {[
            <div key="1" style={{ padding: 16 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>일반 설정</h3>
              <p style={{ fontSize: 14, color: '#4b5563', margin: 0 }}>언어, 시간대 등 기본 설정을 관리합니다.</p>
            </div>,
            <div key="2" style={{ padding: 16 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>보안 설정</h3>
              <p style={{ fontSize: 14, color: '#4b5563', margin: 0 }}>비밀번호, 2단계 인증 등을 설정합니다.</p>
            </div>,
            <div key="3" style={{ padding: 16 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>알림 설정</h3>
              <p style={{ fontSize: 14, color: '#4b5563', margin: 0 }}>이메일 및 푸시 알림을 관리합니다.</p>
            </div>,
            <div key="4" style={{ padding: 16 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>개인정보 설정</h3>
              <p style={{ fontSize: 14, color: '#4b5563', margin: 0 }}>개인정보 공개 범위를 설정합니다.</p>
            </div>,
          ]}
        </Tab>
      </div>
    </div>
  );
}`,
  },
  combination: {
    title: '조합',
    description: 'bordered, defaultIndex 등 속성을 조합한 예제입니다.',
    codeContent: `import { Tab } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 16 }}>
      <div>
        <p style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>Line + Bordered</p>
        <Tab variant="line" tabs={["탭 1", "탭 2", "탭 3"]} bordered defaultIndex={0}>
          {[
            <div key="1" style={{ padding: 16 }}>Line 스타일 + 테두리</div>,
            <div key="2" style={{ padding: 16 }}>두 번째 탭</div>,
            <div key="3" style={{ padding: 16 }}>세 번째 탭</div>,
          ]}
        </Tab>
      </div>
      <div>
        <p style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>Segment + Default Index</p>
        <Tab variant="segment" tabs={["월간", "분기", "연간"]} defaultIndex={2}>
          {[
            <div key="1" style={{ padding: 16 }}>월간 통계 데이터</div>,
            <div key="2" style={{ padding: 16 }}>분기별 통계 데이터</div>,
            <div key="3" style={{ padding: 16 }}>연간 통계 데이터 (기본 선택)</div>,
          ]}
        </Tab>
      </div>
    </div>
  );
}`,
  },
};
