import React from 'react';
import { Button } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../../component';
import { examples, propsTable } from './seolim-ui.ui.button.example';

const UiButton: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Button" />
      <Description text="사용자 행동을 위한 상호작용 버튼 컴포넌트입니다." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="속성" />
      <PropsTable datas={propsTable} />
    </div>

    <UiBox {...examples.variant}>
      <div className="flex gap-3 mt-4 flex-wrap">
        <Button content="아웃라인 버튼" variant="outline" onClick={() => {}} />
        <Button content="솔리드 버튼" variant="solid" onClick={() => {}} />
        <Button content="텍스트 버튼" variant="text" onClick={() => {}} />
      </div>
    </UiBox>

    <UiBox {...examples.size}>
      <div className="flex gap-3 mt-4 items-center flex-wrap">
        <Button content="작은 버튼" size="sm" onClick={() => {}} />
        <Button content="중간 버튼" size="md" onClick={() => {}} />
        <Button content="큰 버튼" size="lg" onClick={() => {}} />
      </div>
    </UiBox>

    <UiBox {...examples.corner}>
      <div className="flex gap-3 mt-4 flex-wrap">
        <Button content="둥근 모서리 버튼" corner="rounded" onClick={() => {}} />
        <Button content="사각 모서리 버튼" corner="square" onClick={() => {}} />
      </div>
    </UiBox>

    <UiBox {...examples.state}>
      <div className="space-y-3 mt-4">
        <div className="flex gap-3 flex-wrap">
          <Button content="일반 버튼" onClick={() => {}} />
          <Button content="비활성화 버튼" disabled onClick={() => {}} />
        </div>
        <Button content="전체 너비 버튼" full onClick={() => {}} />
      </div>
    </UiBox>

    <UiBox {...examples.example}>
      <div className="space-y-6 mt-4">
        <div>
          <p className="text-sm font-medium mb-2">액션 버튼 그룹</p>
          <div className="flex gap-3 flex-wrap">
            <Button
              content="저장"
              variant="solid"
              color="#3b82f6"
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
              onClick={() => {}}
            />
            <Button
              content="보통"
              size="md"
              variant="solid"
              color="#22c55e"
              onClick={() => {}}
            />
            <Button
              content="크게"
              size="lg"
              variant="solid"
              color="#22c55e"
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
              onClick={() => {}}
            />
            <Button
              content="비활성화"
              variant="solid"
              color="#6b7280"
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
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </UiBox>
  </div>
);

export default UiButton;
