import React from 'react';
import { Switch } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../../component';
import { examples } from './seolim-ui.ui.switch.example';

const UiSwitch: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Switch" />
      <Description text="사용자가 기능을 켜고 끌 수 있는 토글 스위치 컴포넌트입니다." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="속성" />
      <PropsTable
        datas={[
          {
            name: 'size', type: 'sm | md | lg', default: 'md', description: '스위치의 크기입니다.',
          },
          {
            name: 'id', type: 'string', default: '-', description: '스위치의 고유 식별자입니다.',
          },
          {
            name: 'checked', type: 'boolean', default: 'false', description: '스위치의 활성화 상태입니다.',
          },
          {
            name: 'onChange', type: '(checked: boolean) => void', default: '-', description: '스위치 상태가 변경될 때 호출되는 함수입니다.',
          },
          {
            name: 'disabled', type: 'boolean', default: 'false', description: '스위치의 비활성화 여부입니다.',
          },
          {
            name: 'accentColor', type: 'string', default: '-', description: '스위치의 강조 색상입니다.',
          },
          {
            name: '...HTMLInputProps', type: 'InputHTMLAttributes', default: '-', description: 'HTML input 엘리먼트의 나머지 속성들입니다.',
          },
        ]}
      />
    </div>

    <UiBox {...examples.basic}>
      <Title text="기본" />
      <Description text="기본 스위치 컴포넌트입니다." />
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center gap-3">
          <Switch />
          <span>기본 스위치</span>
        </div>
        <div className="flex items-center gap-3">
          <Switch checked />
          <span>활성화된 스위치</span>
        </div>
        <div className="flex items-center gap-3">
          <Switch disabled />
          <span>비활성화된 스위치</span>
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.size}>
      <Title text="크기" />
      <Description text="스위치는 작은 것부터 큰 것까지 다양한 크기를 지원합니다." />
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center gap-3">
          <Switch size="sm" checked />
          <span>작은 스위치</span>
        </div>
        <div className="flex items-center gap-3">
          <Switch size="md" checked />
          <span>중간 스위치</span>
        </div>
        <div className="flex items-center gap-3">
          <Switch size="lg" checked />
          <span>큰 스위치</span>
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.state}>
      <Title text="상태" />
      <Description text="스위치의 다양한 상태를 보여줍니다." />
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center gap-3">
          <Switch checked={false} />
          <span>꺼짐</span>
        </div>
        <div className="flex items-center gap-3">
          <Switch checked />
          <span>켜짐</span>
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={false} disabled />
          <span>비활성화 (꺼짐)</span>
        </div>
        <div className="flex items-center gap-3">
          <Switch checked disabled />
          <span>비활성화 (켜짐)</span>
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.accentColor}>
      <Title text="강조 색상" />
      <Description text="스위치에 다양한 강조 색상을 적용할 수 있습니다." />
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center gap-3">
          <Switch checked />
          <span>기본 색상</span>
        </div>
        <div className="flex items-center gap-3">
          <Switch checked accentColor="#ef4444" />
          <span>빨간색</span>
        </div>
        <div className="flex items-center gap-3">
          <Switch checked accentColor="#22c55e" />
          <span>녹색</span>
        </div>
        <div className="flex items-center gap-3">
          <Switch checked accentColor="#3b82f6" />
          <span>파란색</span>
        </div>
        <div className="flex items-center gap-3">
          <Switch checked accentColor="#8b5cf6" />
          <span>보라색</span>
        </div>
        <div className="flex items-center gap-3">
          <Switch checked accentColor="#f59e0b" />
          <span>주황색</span>
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.realworld}>
      <Title text="예제" />
      <Description text="실제 사용 상황에서의 스위치 예제입니다." />
      <div className="space-y-6 mt-4">
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium text-gray-900 mb-4">알림 설정</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">푸시 알림</div>
                <div className="text-sm text-gray-600">앱에서 알림을 받습니다</div>
              </div>
              <Switch checked accentColor="#22c55e" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">이메일 알림</div>
                <div className="text-sm text-gray-600">이메일로 알림을 받습니다</div>
              </div>
              <Switch checked={false} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">SMS 알림</div>
                <div className="text-sm text-gray-600">문자 메시지로 알림을 받습니다</div>
              </div>
              <Switch checked={false} />
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-medium text-gray-900 mb-4">개인정보 설정</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">프로필 공개</div>
                <div className="text-sm text-gray-600">다른 사용자에게 프로필을 공개합니다</div>
              </div>
              <Switch checked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">활동 상태 표시</div>
                <div className="text-sm text-gray-600">온라인 상태를 표시합니다</div>
              </div>
              <Switch checked accentColor="#3b82f6" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">검색 허용</div>
                <div className="text-sm text-gray-600">검색 결과에 포함됩니다</div>
              </div>
              <Switch checked={false} />
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-medium text-gray-900 mb-4">접근성 설정</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">다크 모드</div>
                <div className="text-sm text-gray-600">어두운 테마를 사용합니다</div>
              </div>
              <Switch checked={false} accentColor="#6b7280" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">큰 텍스트</div>
                <div className="text-sm text-gray-600">글자 크기를 크게 표시합니다</div>
              </div>
              <Switch checked accentColor="#22c55e" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">고대비 모드</div>
                <div className="text-sm text-gray-600">높은 대비로 표시합니다</div>
              </div>
              <Switch checked={false} />
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-medium text-gray-900 mb-4">기능 설정</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">자동 저장</div>
                <div className="text-sm text-gray-600">작업 내용을 자동으로 저장합니다</div>
              </div>
              <Switch checked accentColor="#22c55e" size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">자동 업데이트</div>
                <div className="text-sm text-gray-600">앱을 자동으로 업데이트합니다</div>
              </div>
              <Switch checked accentColor="#3b82f6" size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">오프라인 모드</div>
                <div className="text-sm text-gray-600">인터넷 없이도 사용 가능합니다</div>
              </div>
              <Switch checked={false} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">베타 기능</div>
                <div className="text-sm text-gray-600">실험적인 기능을 사용합니다</div>
              </div>
              <Switch checked={false} accentColor="#ef4444" size="sm" />
            </div>
          </div>
        </div>
      </div>
    </UiBox>
  </div>
);

export default UiSwitch;
