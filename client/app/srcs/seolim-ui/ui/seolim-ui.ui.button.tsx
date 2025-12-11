import React from 'react';
import { Button } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../component';

const UiButton: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Button" />
      <Description text="사용자 행동을 위한 상호작용 버튼 컴포넌트입니다." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="속성" />
      <PropsTable
        datas={[
          { name: 'content', type: 'React.ReactNode', description: '버튼 내부에 표시될 콘텐츠입니다.' },
          { name: 'label', type: 'string', description: '접근성을 위한 aria-label 값입니다.' },
          { name: 'onClick', type: '() => void', description: '버튼 클릭 시 실행될 콜백 함수입니다.' },
          { name: 'variant', type: 'outline | solid | text', description: '버튼의 시각적 스타일입니다.' },
          { name: 'corner', type: 'rounded | square', description: '버튼의 모서리 스타일입니다.' },
          { name: 'size', type: 'sm | md | lg', description: '버튼의 크기입니다.' },
          { name: 'full', type: 'boolean', description: '버튼이 전체 너비를 차지할지 여부입니다.' },
          { name: 'color', type: 'string', description: '버튼의 배경 색상입니다.' },
          { name: 'textColor', type: 'string', description: '버튼의 텍스트 색상입니다.' },
          { name: 'disabled', type: 'boolean', description: '버튼이 비활성화될지 여부입니다.' },
        ]}
      />
    </div>

    <UiBox>
      <Title text="변형" />
      <Description text="버튼 변형에는 아웃라인, 솔리드, 텍스트 스타일이 포함됩니다." />
      <div className="flex gap-3 mt-4 flex-wrap">
        <Button content="아웃라인 버튼" variant="outline" onClick={() => {}} />
        <Button content="솔리드 버튼" variant="solid" onClick={() => {}} />
        <Button content="텍스트 버튼" variant="text" onClick={() => {}} />
      </div>
    </UiBox>

    <UiBox>
      <Title text="크기" />
      <Description text="버튼 크기는 작은 것부터 큰 것까지 다양합니다." />
      <div className="flex gap-3 mt-4 items-center flex-wrap">
        <Button content="작은 버튼" size="sm" onClick={() => {}} />
        <Button content="중간 버튼" size="md" onClick={() => {}} />
        <Button content="큰 버튼" size="lg" onClick={() => {}} />
      </div>
    </UiBox>

    <UiBox>
      <Title text="모서리" />
      <Description text="버튼 모서리 스타일에는 둥근 모서리와 사각 모서리가 있습니다." />
      <div className="flex gap-3 mt-4 flex-wrap">
        <Button content="둥근 모서리 버튼" corner="rounded" onClick={() => {}} />
        <Button content="사각 모서리 버튼" corner="square" onClick={() => {}} />
      </div>
    </UiBox>

    <UiBox>
      <Title text="상태" />
      <Description text="버튼 상태에는 일반, 비활성화, 전체 너비가 있습니다." />
      <div className="space-y-3 mt-4">
        <div className="flex gap-3 flex-wrap">
          <Button content="일반 버튼" onClick={() => {}} />
          <Button content="비활성화 버튼" disabled onClick={() => {}} />
        </div>
        <Button content="전체 너비 버튼" full onClick={() => {}} />
      </div>
    </UiBox>

    <UiBox>
      <Title text="색상" />
      <Description text="color와 textColor prop을 사용하여 버튼의 색상을 커스터마이징할 수 있습니다." />
      <div className="space-y-6 mt-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">Solid 버튼 색상</p>
          <div className="flex gap-3 flex-wrap">
            <Button content="파란색 버튼" variant="solid" color="#3b82f6" textColor="#ffffff" onClick={() => {}} />
            <Button content="초록색 버튼" variant="solid" color="#22c55e" textColor="#ffffff" onClick={() => {}} />
            <Button content="빨간색 버튼" variant="solid" color="#ef4444" textColor="#ffffff" onClick={() => {}} />
            <Button content="보라색 버튼" variant="solid" color="#a855f7" textColor="#ffffff" onClick={() => {}} />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-2">Outline 버튼 색상</p>
          <div className="flex gap-3 flex-wrap">
            <Button content="파란색 아웃라인" variant="outline" color="#3b82f6" onClick={() => {}} />
            <Button content="초록색 아웃라인" variant="outline" color="#22c55e" onClick={() => {}} />
            <Button content="빨간색 아웃라인" variant="outline" color="#ef4444" onClick={() => {}} />
            <Button content="보라색 아웃라인" variant="outline" color="#a855f7" onClick={() => {}} />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-2">Text 버튼 색상</p>
          <div className="flex gap-3 flex-wrap">
            <Button content="파란색 텍스트" variant="text" color="#3b82f6" onClick={() => {}} />
            <Button content="초록색 텍스트" variant="text" color="#22c55e" onClick={() => {}} />
            <Button content="빨간색 텍스트" variant="text" color="#ef4444" onClick={() => {}} />
            <Button content="보라색 텍스트" variant="text" color="#a855f7" onClick={() => {}} />
          </div>
        </div>
      </div>
    </UiBox>

    <UiBox>
      <Title text="사용 예제" />
      <Description text="실제 사용 시나리오 예제입니다." />
      <div className="space-y-6 mt-4">
        <div>
          <p className="text-sm font-medium mb-2">액션 버튼 그룹</p>
          <div className="flex gap-3 flex-wrap">
            <Button
              content="저장"
              variant="solid"
              color="#3b82f6"
              textColor="#ffffff"
              onClick={() => {}}
            />
            <Button
              content="취소"
              variant="outline"
              color="#6b7280"
              onClick={() => {}}
            />
            <Button
              content="삭제"
              variant="outline"
              color="#ef4444"
              onClick={() => {}}
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">폼 제출</p>
          <div className="space-y-3">
            <Button
              content="로그인"
              variant="solid"
              full
              color="#3b82f6"
              textColor="#ffffff"
              onClick={() => {}}
            />
            <div className="flex gap-3">
              <Button
                content="회원가입"
                variant="outline"
                color="#3b82f6"
                onClick={() => {}}
              />
              <Button
                content="비밀번호 찾기"
                variant="text"
                color="#6b7280"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">크기별 버튼</p>
          <div className="flex gap-3 items-center flex-wrap">
            <Button
              content="작게"
              size="sm"
              variant="solid"
              color="#22c55e"
              textColor="#ffffff"
              onClick={() => {}}
            />
            <Button
              content="보통"
              size="md"
              variant="solid"
              color="#22c55e"
              textColor="#ffffff"
              onClick={() => {}}
            />
            <Button
              content="크게"
              size="lg"
              variant="solid"
              color="#22c55e"
              textColor="#ffffff"
              onClick={() => {}}
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">상태별 버튼</p>
          <div className="flex gap-3 flex-wrap">
            <Button
              content="활성화"
              variant="solid"
              color="#22c55e"
              textColor="#ffffff"
              onClick={() => {}}
            />
            <Button
              content="비활성화"
              variant="solid"
              color="#6b7280"
              textColor="#ffffff"
              disabled
              onClick={() => {}}
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">네비게이션</p>
          <div className="flex gap-3 flex-wrap">
            <Button
              content="← 이전"
              variant="outline"
              corner="rounded"
              onClick={() => {}}
            />
            <Button
              content="다음 →"
              variant="solid"
              corner="rounded"
              color="#3b82f6"
              textColor="#ffffff"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </UiBox>

  </div>
);

export default UiButton;
