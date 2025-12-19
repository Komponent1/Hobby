import React from 'react';
import { List } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../component';

const UiList: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="List" />
      <Description text="항목을 목록 형태로 표시하는 컴포넌트입니다." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="속성" />
      <PropsTable
        datas={[
          {
            name: 'children', type: 'React.ReactNode[]', default: '-', description: '목록 항목들입니다.',
          },
          {
            name: 'variant', type: 'none | underline', default: 'none', description: '목록의 스타일 변형입니다.',
          },
          {
            name: 'selected', type: 'boolean', default: 'false', description: '선택 기능을 활성화할지 여부입니다.',
          },
          {
            name: 'selectedIndex', type: 'number', default: '-', description: '선택된 항목의 인덱스입니다.',
          },
          {
            name: 'title', type: 'string', default: '-', description: '목록의 제목입니다.',
          },
          {
            name: 'titleProps', type: 'TypographyProps', default: '-', description: '제목의 Typography 속성입니다.',
          },
        ]}
      />
    </div>

    <UiBox>
      <Title text="기본 사용법" />
      <Description text="기본적인 목록 형태입니다." />
      <div className="p-8 mt-4">
        <List>
          {['첫 번째 항목', '두 번째 항목', '세 번째 항목', '네 번째 항목']}
        </List>
      </div>
    </UiBox>

    <UiBox>
      <Title text="변형" />
      <Description text="variant 속성으로 목록의 스타일을 변경할 수 있습니다." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mt-4">
        <div>
          <p className="text-sm font-medium mb-4">None (기본)</p>
          <List variant="none">
            {['항목 1', '항목 2', '항목 3', '항목 4']}
          </List>
        </div>
        <div>
          <p className="text-sm font-medium mb-4">Underline</p>
          <List variant="underline">
            {['항목 1', '항목 2', '항목 3', '항목 4']}
          </List>
        </div>
      </div>
    </UiBox>

    <UiBox>
      <Title text="제목" />
      <Description text="title 속성으로 목록에 제목을 추가할 수 있습니다." />
      <div className="p-8 mt-4">
        <List title="할 일 목록">
          {['아침 운동하기', '책 읽기', '프로젝트 작업', '저녁 산책']}
        </List>
      </div>
    </UiBox>

    <UiBox>
      <Title text="선택 기능" />
      <Description text="selected와 selectedIndex 속성으로 선택된 항목을 표시할 수 있습니다." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mt-4">
        <div>
          <p className="text-sm font-medium mb-4">선택 없음</p>
          <List selected={false}>
            {['메뉴 1', '메뉴 2', '메뉴 3', '메뉴 4']}
          </List>
        </div>
        <div>
          <p className="text-sm font-medium mb-4">두 번째 항목 선택</p>
          <List selected selectedIndex={1}>
            {['메뉴 1', '메뉴 2', '메뉴 3', '메뉴 4']}
          </List>
        </div>
      </div>
    </UiBox>

    <UiBox>
      <Title text="사용 예제" />
      <Description text="실제 사용 시나리오 예제입니다." />
      <div className="space-y-8 mt-4">
        <div>
          <p className="text-sm font-medium mb-4">네비게이션 메뉴</p>
          <List variant="underline" selected selectedIndex={0}>
            {['홈', '소개', '서비스', '연락처']}
          </List>
        </div>

        <div>
          <p className="text-sm font-medium mb-4">기능 목록</p>
          <List title="주요 기능">
            {[
              '사용자 인증 및 권한 관리',
              '실시간 데이터 동기화',
              '반응형 디자인',
              '다국어 지원',
            ]}
          </List>
        </div>

        <div>
          <p className="text-sm font-medium mb-4">설정 옵션</p>
          <List title="알림 설정" variant="underline">
            {['이메일 알림', '푸시 알림', 'SMS 알림', '앱 내 알림']}
          </List>
        </div>
      </div>
    </UiBox>

    <UiBox>
      <Title text="조합" />
      <Description text="다양한 속성을 조합한 예제입니다." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mt-4">
        <div>
          <List
            title="프로젝트 단계"
            variant="underline"
            selected
            selectedIndex={2}
          >
            {['기획', '디자인', '개발', '테스트', '배포']}
          </List>
        </div>
        <div>
          <List
            title="우선순위"
            variant="none"
            selected
            selectedIndex={0}
          >
            {['긴급', '높음', '보통', '낮음']}
          </List>
        </div>
      </div>
    </UiBox>
  </div>
);

export default UiList;
