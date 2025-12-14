import React from 'react';
import { Tab } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../component';

const UiTab: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Tab" />
      <Description text="여러 콘텐츠를 탭으로 구분하여 표시하는 컴포넌트입니다." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="속성" />
      <PropsTable
        datas={[
          { name: 'tabs', type: 'string[]', description: '탭의 제목 배열입니다.' },
          { name: 'children', type: 'React.ReactNode[]', description: '각 탭에 표시될 콘텐츠 배열입니다.' },
          { name: 'variant', type: 'line | box | pill | segment', description: '탭의 스타일 변형입니다.' },
          { name: 'defaultIndex', type: 'number', description: '기본으로 선택될 탭의 인덱스입니다.' },
          { name: 'bordered', type: 'boolean', description: '탭 컨텐츠 영역에 테두리를 표시할지 여부입니다.' },
        ]}
      />
    </div>

    <UiBox>
      <Title text="기본 사용법" />
      <Description text="기본적인 탭 형태입니다." />
      <div className="p-8 mt-4">
        <Tab
          tabs={['탭 1', '탭 2', '탭 3']}
        >
          {[
            <div key="1" className="p-4">첫 번째 탭의 콘텐츠입니다.</div>,
            <div key="2" className="p-4">두 번째 탭의 콘텐츠입니다.</div>,
            <div key="3" className="p-4">세 번째 탭의 콘텐츠입니다.</div>,
          ]}
        </Tab>
      </div>
    </UiBox>

    <UiBox>
      <Title text="변형" />
      <Description text="variant 속성으로 탭의 스타일을 변경할 수 있습니다." />
      <div className="space-y-8 mt-4">
        <div>
          <p className="text-sm font-medium mb-4">Line (기본)</p>
          <Tab
            variant="line"
            tabs={['홈', '프로필', '설정']}
          >
            {[
              <div key="1" className="p-4">홈 페이지 콘텐츠</div>,
              <div key="2" className="p-4">프로필 페이지 콘텐츠</div>,
              <div key="3" className="p-4">설정 페이지 콘텐츠</div>,
            ]}
          </Tab>
        </div>
        <div>
          <p className="text-sm font-medium mb-4">Box</p>
          <Tab
            variant="box"
            tabs={['홈', '프로필', '설정']}
          >
            {[
              <div key="1" className="p-4">홈 페이지 콘텐츠</div>,
              <div key="2" className="p-4">프로필 페이지 콘텐츠</div>,
              <div key="3" className="p-4">설정 페이지 콘텐츠</div>,
            ]}
          </Tab>
        </div>
        <div>
          <p className="text-sm font-medium mb-4">Pill</p>
          <Tab
            variant="pill"
            tabs={['홈', '프로필', '설정']}
          >
            {[
              <div key="1" className="p-4">홈 페이지 콘텐츠</div>,
              <div key="2" className="p-4">프로필 페이지 콘텐츠</div>,
              <div key="3" className="p-4">설정 페이지 콘텐츠</div>,
            ]}
          </Tab>
        </div>
        <div>
          <p className="text-sm font-medium mb-4">Segment</p>
          <Tab
            variant="segment"
            tabs={['홈', '프로필', '설정']}
          >
            {[
              <div key="1" className="p-4">홈 페이지 콘텐츠</div>,
              <div key="2" className="p-4">프로필 페이지 콘텐츠</div>,
              <div key="3" className="p-4">설정 페이지 콘텐츠</div>,
            ]}
          </Tab>
        </div>
      </div>
    </UiBox>

    <UiBox>
      <Title text="테두리" />
      <Description text="bordered 속성으로 콘텐츠 영역에 테두리를 추가할 수 있습니다." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <div>
          <p className="text-sm font-medium mb-4">테두리 없음</p>
          <Tab
            tabs={['탭 1', '탭 2', '탭 3']}
            bordered={false}
          >
            {[
              <div key="1" className="p-4">테두리가 없는 콘텐츠</div>,
              <div key="2" className="p-4">테두리가 없는 콘텐츠</div>,
              <div key="3" className="p-4">테두리가 없는 콘텐츠</div>,
            ]}
          </Tab>
        </div>
        <div>
          <p className="text-sm font-medium mb-4">테두리 있음</p>
          <Tab
            tabs={['탭 1', '탭 2', '탭 3']}
            bordered
          >
            {[
              <div key="1" className="p-4">테두리가 있는 콘텐츠</div>,
              <div key="2" className="p-4">테두리가 있는 콘텐츠</div>,
              <div key="3" className="p-4">테두리가 있는 콘텐츠</div>,
            ]}
          </Tab>
        </div>
      </div>
    </UiBox>

    <UiBox>
      <Title text="기본 탭 설정" />
      <Description text="defaultIndex 속성으로 처음 표시될 탭을 지정할 수 있습니다." />
      <div className="p-8 mt-4">
        <Tab
          tabs={['첫 번째', '두 번째', '세 번째']}
          defaultIndex={1}
        >
          {[
            <div key="1" className="p-4">첫 번째 탭</div>,
            <div key="2" className="p-4">두 번째 탭 (기본 선택)</div>,
            <div key="3" className="p-4">세 번째 탭</div>,
          ]}
        </Tab>
      </div>
    </UiBox>

    <UiBox>
      <Title text="사용 예제" />
      <Description text="실제 사용 시나리오 예제입니다." />
      <div className="space-y-8 mt-4">
        <div>
          <p className="text-sm font-medium mb-4">제품 정보</p>
          <Tab
            variant="line"
            tabs={['상세 정보', '리뷰', '배송 정보']}
            bordered
          >
            {[
              <div key="1" className="p-4">
                <h3 className="font-bold mb-2">상품 상세</h3>
                <p className="text-sm text-gray-600">
                  고품질 소재로 제작된 프리미엄 제품입니다.
                  내구성이 뛰어나며 오랜 시간 사용할 수 있습니다.
                </p>
              </div>,
              <div key="2" className="p-4">
                <h3 className="font-bold mb-2">고객 리뷰</h3>
                <p className="text-sm text-gray-600">⭐⭐⭐⭐⭐ 5.0 (128개 리뷰)</p>
                <p className="text-sm mt-2">&rdquo;품질이 정말 좋아요!&rdquo;</p>
              </div>,
              <div key="3" className="p-4">
                <h3 className="font-bold mb-2">배송 안내</h3>
                <p className="text-sm text-gray-600">
                  - 평일 오후 2시 이전 주문 시 당일 발송
                  <br />
                  - 제주/도서산간 지역 추가 배송비 발생
                </p>
              </div>,
            ]}
          </Tab>
        </div>

        <div>
          <p className="text-sm font-medium mb-4">대시보드</p>
          <Tab
            variant="box"
            tabs={['개요', '통계', '활동']}
            defaultIndex={0}
          >
            {[
              <div key="1" className="p-4">
                <h3 className="font-bold mb-2">대시보드 개요</h3>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="p-4 bg-blue-50 rounded">
                    <p className="text-sm text-gray-600">총 사용자</p>
                    <p className="text-2xl font-bold">1,234</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded">
                    <p className="text-sm text-gray-600">활성 사용자</p>
                    <p className="text-2xl font-bold">856</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded">
                    <p className="text-sm text-gray-600">신규 가입</p>
                    <p className="text-2xl font-bold">42</p>
                  </div>
                </div>
              </div>,
              <div key="2" className="p-4">
                <h3 className="font-bold mb-2">통계 정보</h3>
                <p className="text-sm text-gray-600">월별 사용자 증가율: +12.5%</p>
              </div>,
              <div key="3" className="p-4">
                <h3 className="font-bold mb-2">최근 활동</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 사용자 A가 로그인했습니다.</li>
                  <li>• 사용자 B가 프로필을 수정했습니다.</li>
                  <li>• 사용자 C가 새 게시글을 작성했습니다.</li>
                </ul>
              </div>,
            ]}
          </Tab>
        </div>

        <div>
          <p className="text-sm font-medium mb-4">설정 페이지</p>
          <Tab
            variant="pill"
            tabs={['일반', '보안', '알림', '개인정보']}
          >
            {[
              <div key="1" className="p-4">
                <h3 className="font-bold mb-2">일반 설정</h3>
                <p className="text-sm text-gray-600">언어, 시간대 등 기본 설정을 관리합니다.</p>
              </div>,
              <div key="2" className="p-4">
                <h3 className="font-bold mb-2">보안 설정</h3>
                <p className="text-sm text-gray-600">비밀번호, 2단계 인증 등을 설정합니다.</p>
              </div>,
              <div key="3" className="p-4">
                <h3 className="font-bold mb-2">알림 설정</h3>
                <p className="text-sm text-gray-600">이메일 및 푸시 알림을 관리합니다.</p>
              </div>,
              <div key="4" className="p-4">
                <h3 className="font-bold mb-2">개인정보 설정</h3>
                <p className="text-sm text-gray-600">개인정보 공개 범위를 설정합니다.</p>
              </div>,
            ]}
          </Tab>
        </div>
      </div>
    </UiBox>

    <UiBox>
      <Title text="조합" />
      <Description text="다양한 속성을 조합한 예제입니다." />
      <div className="space-y-8 mt-4">
        <div>
          <p className="text-sm font-medium mb-4">Line + Bordered</p>
          <Tab
            variant="line"
            tabs={['탭 1', '탭 2', '탭 3']}
            bordered
            defaultIndex={0}
          >
            {[
              <div key="1" className="p-4">Line 스타일 + 테두리</div>,
              <div key="2" className="p-4">두 번째 탭</div>,
              <div key="3" className="p-4">세 번째 탭</div>,
            ]}
          </Tab>
        </div>
        <div>
          <p className="text-sm font-medium mb-4">Segment + Default Index</p>
          <Tab
            variant="segment"
            tabs={['월간', '분기', '연간']}
            defaultIndex={2}
          >
            {[
              <div key="1" className="p-4">월간 통계 데이터</div>,
              <div key="2" className="p-4">분기별 통계 데이터</div>,
              <div key="3" className="p-4">연간 통계 데이터 (기본 선택)</div>,
            ]}
          </Tab>
        </div>
      </div>
    </UiBox>
  </div>
);

export default UiTab;
