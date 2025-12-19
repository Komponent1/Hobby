import React from 'react';
import { Checkbox } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../component';

const UiCheckbox: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Checkbox" />
      <Description text="사용자가 옵션을 선택하거나 해제할 수 있는 체크박스 컴포넌트입니다." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="속성" />
      <PropsTable
        datas={[
          {
            name: 'id', type: 'string', default: '-', description: '체크박스의 고유 식별자입니다.',
          },
          {
            name: 'size', type: 'sm | md | lg', default: 'md', description: '체크박스의 크기입니다.',
          },
          {
            name: 'onChange', type: '(value: string, checked: boolean) => void', default: '-', description: '체크박스 상태가 변경될 때 호출되는 함수입니다.',
          },
          {
            name: 'label', type: 'React.ReactNode', default: '-', description: '체크박스 옆에 표시할 라벨입니다.',
          },
          {
            name: 'checked', type: 'boolean', default: 'false', description: '체크박스의 선택 상태입니다.',
          },
          {
            name: 'accentColor', type: 'string', default: '-', description: '체크박스의 강조 색상입니다.',
          },
          {
            name: '...HTMLInputProps', type: 'InputHTMLAttributes', default: '-', description: 'HTML input 엘리먼트의 나머지 속성들입니다.',
          },
        ]}
      />
    </div>

    <UiBox>
      <Title text="기본" />
      <Description text="기본 체크박스 컴포넌트입니다." />
      <div className="flex flex-col gap-4 mt-4">
        <Checkbox label="기본 체크박스" />
        <Checkbox label="선택된 체크박스" checked />
        <Checkbox label="비활성화된 체크박스" disabled />
      </div>
    </UiBox>

    <UiBox>
      <Title text="크기" />
      <Description text="체크박스는 작은 것부터 큰 것까지 다양한 크기를 지원합니다." />
      <div className="flex flex-col gap-4 mt-4">
        <Checkbox size="sm" label="작은 체크박스" />
        <Checkbox size="md" label="중간 체크박스" />
        <Checkbox size="lg" label="큰 체크박스" />
      </div>
    </UiBox>

    <UiBox>
      <Title text="강조 색상" />
      <Description text="체크박스에 다양한 강조 색상을 적용할 수 있습니다." />
      <div className="flex flex-col gap-4 mt-4">
        <Checkbox label="기본 색상" checked />
        <Checkbox label="빨간색" checked accentColor="#ef4444" />
        <Checkbox label="파란색" checked accentColor="#3b82f6" />
        <Checkbox label="녹색" checked accentColor="#22c55e" />
        <Checkbox label="보라색" checked accentColor="#8b5cf6" />
      </div>
    </UiBox>

    <UiBox>
      <Title text="상태" />
      <Description text="체크박스의 다양한 상태를 보여줍니다." />
      <div className="flex flex-col gap-4 mt-4">
        <Checkbox label="선택되지 않음" checked={false} />
        <Checkbox label="선택됨" checked />
        <Checkbox label="비활성화 (선택되지 않음)" checked={false} disabled />
        <Checkbox label="비활성화 (선택됨)" checked disabled />
      </div>
    </UiBox>

    <UiBox>
      <Title text="라벨 변형" />
      <Description text="체크박스에 다양한 형태의 라벨을 사용할 수 있습니다." />
      <div className="flex flex-col gap-4 mt-4">
        <Checkbox label="일반 텍스트 라벨" />
        <Checkbox
          label={
            (
              <span className="flex items-center gap-2">
                <span>📧</span>
                <span>이메일 알림 받기</span>
              </span>
            )
          }
        />
        <Checkbox
          label={
            (
              <div>
                <div className="font-medium">마케팅 동의</div>
                <div className="text-sm text-gray-600">프로모션 및 이벤트 정보를 받아보시겠습니까?</div>
              </div>
            )
          }
        />
      </div>
    </UiBox>

    <UiBox>
      <Title text="그룹" />
      <Description text="여러 체크박스를 그룹으로 사용하는 예제입니다." />
      <div className="space-y-4 mt-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-3">관심 분야를 선택하세요:</h4>
          <div className="flex flex-col gap-2">
            <Checkbox label="웹 개발" size="sm" />
            <Checkbox label="모바일 개발" size="sm" />
            <Checkbox label="데이터 사이언스" size="sm" />
            <Checkbox label="UI/UX 디자인" size="sm" />
            <Checkbox label="백엔드 개발" size="sm" />
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">알림 설정:</h4>
          <div className="flex flex-col gap-2">
            <Checkbox label="일반 알림" checked accentColor="#22c55e" />
            <Checkbox label="보안 알림" checked accentColor="#ef4444" />
            <Checkbox label="업데이트 알림" accentColor="#3b82f6" />
          </div>
        </div>
      </div>
    </UiBox>

    <UiBox>
      <Title text="예제" />
      <Description text="실제 사용 상황에서의 체크박스 예제입니다." />
      <div className="space-y-6 mt-4">
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium text-gray-900 mb-4">계정 설정</h4>
          <div className="space-y-3">
            <Checkbox
              label="2단계 인증 활성화"
              checked
              accentColor="#22c55e"
            />
            <Checkbox
              label="로그인 알림 받기"
              checked
            />
            <Checkbox
              label="계정 활동 이메일 알림"
            />
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-medium text-gray-900 mb-4">개인정보 처리방침</h4>
          <div className="space-y-3">
            <Checkbox
              label={
                (
                  <span>
                    <span className="text-red-500">*</span>
                    {' '}
                    개인정보 처리방침에 동의합니다
                  </span>
                )
              }
              size="sm"
            />
            <Checkbox
              label="마케팅 정보 수신에 동의합니다 (선택)"
              size="sm"
            />
            <Checkbox
              label="점3자 제공에 동의합니다 (선택)"
              size="sm"
            />
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-medium text-gray-900 mb-4">할 일 목록</h4>
          <div className="space-y-2">
            <Checkbox
              label="프로젝트 기획서 작성"
              checked
              accentColor="#22c55e"
              size="sm"
            />
            <Checkbox
              label="디자인 시스템 문서화"
              size="sm"
            />
            <Checkbox
              label="코드 리뷰 완료"
              checked
              accentColor="#22c55e"
              size="sm"
            />
            <Checkbox
              label="테스트 케이스 작성"
              size="sm"
            />
          </div>
        </div>
      </div>
    </UiBox>
  </div>
);

export default UiCheckbox;
