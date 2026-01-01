import React from 'react';
import { Tooltip, Button } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../../component';
import { examples } from './seolim-ui.ui.tooltip.example';

const UiTooltip: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Tooltip" />
      <Description text="요소에 마우스를 올렸을 때 추가 정보를 표시하는 툴팁 컴포넌트입니다." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="속성" />
      <PropsTable
        datas={[
          {
            name: 'children', type: 'React.ReactNode', default: '-', description: '툴팁이 적용될 요소입니다.',
          },
          {
            name: 'content', type: 'React.ReactNode', default: '-', description: '툴팁에 표시될 내용입니다.',
          },
          {
            name: 'position', type: 'top | bottom | left | right', default: 'top', description: '툴팁이 표시될 위치입니다.',
          },
          {
            name: 'arrow', type: 'boolean', default: 'false', description: '툴팁에 화살표를 표시할지 여부입니다.',
          },
          {
            name: 'backgroundColor', type: 'string', default: '-', description: '툴팁의 배경 색상입니다.',
          },
          {
            name: 'textColor', type: 'string', default: '-', description: '툴팁의 텍스트 색상입니다.',
          },
          {
            name: 'width', type: 'number', default: '-', description: '툴팁의 너비를 픽셀 단위로 설정합니다.',
          },
        ]}
      />
    </div>

    <UiBox {...examples.basic}>
      <Title text="기본 사용법" />
      <Description text="요소에 마우스를 올려 툴팁을 확인하세요." />
      <div className="flex justify-center p-8 mt-4">
        <Tooltip content="기본 툴팁입니다">
          <Button content="마우스를 올려보세요" onClick={() => {}} />
        </Tooltip>
      </div>
    </UiBox>

    <UiBox {...examples.position}>
      <Title text="위치" />
      <Description text="툴팁이 표시될 위치를 설정할 수 있습니다." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 mt-4">
        <div className="flex justify-center">
          <Tooltip content="위쪽 툴팁" position="top">
            <Button content="위" onClick={() => {}} />
          </Tooltip>
        </div>
        <div className="flex justify-center">
          <Tooltip content="아래쪽 툴팁" position="bottom">
            <Button content="아래" onClick={() => {}} />
          </Tooltip>
        </div>
        <div className="flex justify-center">
          <Tooltip content="왼쪽 툴팁" position="left">
            <Button content="왼쪽" onClick={() => {}} />
          </Tooltip>
        </div>
        <div className="flex justify-center">
          <Tooltip content="오른쪽 툴팁" position="right">
            <Button content="오른쪽" onClick={() => {}} />
          </Tooltip>
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.arrow}>
      <Title text="화살표" />
      <Description text="arrow prop을 사용하여 툴팁에 화살표를 표시할 수 있습니다." />
      <div className="flex gap-8 justify-center p-8 mt-4 flex-wrap">
        <Tooltip content="화살표 없음" arrow={false}>
          <Button content="화살표 없음" onClick={() => {}} />
        </Tooltip>
        <Tooltip content="화살표 있음" arrow>
          <Button content="화살표 있음" onClick={() => {}} />
        </Tooltip>
      </div>
    </UiBox>

    <UiBox {...examples.color}>
      <Title text="색상" />
      <Description text="배경색과 텍스트 색상을 커스터마이징할 수 있습니다." />
      <div className="flex gap-6 justify-center p-8 mt-4 flex-wrap">
        <Tooltip
          content="파란색 툴팁"
          backgroundColor="#3b82f6"
          textColor="#ffffff"
          arrow
        >
          <Button content="파란색" variant="solid" color="#3b82f6" onClick={() => {}} />
        </Tooltip>
        <Tooltip
          content="초록색 툴팁"
          backgroundColor="#22c55e"
          textColor="#ffffff"
          arrow
        >
          <Button content="초록색" variant="solid" color="#22c55e" onClick={() => {}} />
        </Tooltip>
        <Tooltip
          content="빨간색 툴팁"
          backgroundColor="#ef4444"
          textColor="#ffffff"
          arrow
        >
          <Button content="빨간색" variant="solid" color="#ef4444" onClick={() => {}} />
        </Tooltip>
        <Tooltip
          content="보라색 툴팁"
          backgroundColor="#a855f7"
          textColor="#ffffff"
          arrow
        >
          <Button content="보라색" variant="solid" color="#a855f7" onClick={() => {}} />
        </Tooltip>
      </div>
    </UiBox>

    <UiBox {...examples.content}>
      <Title text="다양한 콘텐츠" />
      <Description text="툴팁 내용으로 텍스트뿐만 아니라 다양한 React 요소를 사용할 수 있습니다." />
      <div className="flex gap-6 justify-center p-8 mt-4 flex-wrap">
        <Tooltip
          content={<span className="font-bold">굵은 텍스트</span>}
          arrow
        >
          <Button content="굵은 텍스트" onClick={() => {}} />
        </Tooltip>
        <Tooltip
          content={(
            <div>
              <div className="font-bold">제목</div>
              <div className="text-xs">설명 텍스트</div>
            </div>
          )}
          arrow
        >
          <Button content="여러 줄" onClick={() => {}} />
        </Tooltip>
        <Tooltip
          content={<div className="max-w-xs">이것은 긴 텍스트 예제입니다. 툴팁에 긴 설명이 필요할 때 사용할 수 있습니다.</div>}
          arrow
        >
          <Button content="긴 텍스트" onClick={() => {}} />
        </Tooltip>
      </div>
    </UiBox>

    <UiBox {...examples.width}>
      <Title text="너비 설정" />
      <Description text="width 속성으로 툴팁의 너비를 조정할 수 있습니다." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 mt-4">
        <div className="flex justify-center">
          <Tooltip content="기본 너비" position="top" arrow>
            <Button content="기본" onClick={() => {}} />
          </Tooltip>
        </div>
        <div className="flex justify-center">
          <Tooltip content="150px 너비의 툴팁입니다" position="top" arrow width={150}>
            <Button content="150px" onClick={() => {}} />
          </Tooltip>
        </div>
        <div className="flex justify-center">
          <Tooltip content="250px 너비의 툴팁입니다. 더 긴 내용을 표시할 수 있습니다." position="top" arrow width={250}>
            <Button content="250px" onClick={() => {}} />
          </Tooltip>
        </div>
        <div className="flex justify-center">
          <Tooltip
            content={(
              <div>
                <div className="font-bold mb-2">커스텀 너비 (350px)</div>
                <div className="text-sm">너비를 조정하면 긴 텍스트나 복잡한 내용도 깔끔하게 표시할 수 있습니다.</div>
              </div>
            )}
            position="top"
            arrow
            width={350}
            backgroundColor="#3b82f6"
            textColor="#ffffff"
          >
            <Button content="350px" onClick={() => {}} />
          </Tooltip>
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.realworld}>
      <Title text="사용 예제" />
      <Description text="실제 사용 시나리오 예제입니다." />
      <div className="space-y-8 mt-4">
        <div>
          <p className="text-sm font-medium mb-4">아이콘 버튼 설명</p>
          <div className="flex gap-4 justify-center">
            <Tooltip content="저장" position="top" arrow>
              <button type="button" className="p-2 border rounded hover:bg-gray-100">
                💾
              </button>
            </Tooltip>
            <Tooltip content="삭제" position="top" arrow>
              <button type="button" className="p-2 border rounded hover:bg-gray-100">
                🗑️
              </button>
            </Tooltip>
            <Tooltip content="편집" position="top" arrow>
              <button type="button" className="p-2 border rounded hover:bg-gray-100">
                ✏️
              </button>
            </Tooltip>
            <Tooltip content="공유" position="top" arrow>
              <button type="button" className="p-2 border rounded hover:bg-gray-100">
                📤
              </button>
            </Tooltip>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-4">정보 제공</p>
          <div className="flex gap-4 items-center justify-center">
            <span className="text-sm text-gray-600">사용자 이름</span>
            <Tooltip
              content="사용자 이름은 3-20자 사이여야 하며, 영문, 숫자, 언더스코어만 사용 가능합니다."
              position="right"
              arrow
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 text-xs cursor-help">
                ?
              </span>
            </Tooltip>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-4">상태 표시</p>
          <div className="flex gap-4 justify-center">
            <Tooltip
              content="온라인"
              backgroundColor="#22c55e"
              textColor="#ffffff"
              position="top"
              arrow
            >
              <div className="flex items-center gap-2 px-4 py-2 border rounded cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>사용자 1</span>
              </div>
            </Tooltip>
            <Tooltip
              content="자리비움"
              backgroundColor="#f59e0b"
              textColor="#ffffff"
              position="top"
              arrow
            >
              <div className="flex items-center gap-2 px-4 py-2 border rounded cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span>사용자 2</span>
              </div>
            </Tooltip>
            <Tooltip
              content="오프라인"
              backgroundColor="#6b7280"
              textColor="#ffffff"
              position="top"
              arrow
            >
              <div className="flex items-center gap-2 px-4 py-2 border rounded cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-gray-500" />
                <span>사용자 3</span>
              </div>
            </Tooltip>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-4">축약된 텍스트</p>
          <div className="flex justify-center">
            <Tooltip
              content="이것은 매우 긴 파일 이름입니다_최종_수정본_진짜최종_20231212.pdf"
              position="top"
              arrow
            >
              <div className="max-w-xs truncate px-4 py-2 border rounded cursor-pointer">
                이것은 매우 긴 파일 이름입니다_최종_수정본_진짜최종_20231212.pdf
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.combination}>
      <Title text="조합" />
      <Description text="다양한 속성을 조합한 예제입니다." />
      <div className="grid grid-cols-2 gap-6 p-8 mt-4">
        <div className="flex justify-center">
          <Tooltip
            content="위쪽 파란색 화살표"
            position="top"
            arrow
            backgroundColor="#3b82f6"
            textColor="#ffffff"
          >
            <Button content="조합 1" onClick={() => {}} />
          </Tooltip>
        </div>
        <div className="flex justify-center">
          <Tooltip
            content="아래쪽 초록색 화살표"
            position="bottom"
            arrow
            backgroundColor="#22c55e"
            textColor="#ffffff"
          >
            <Button content="조합 2" onClick={() => {}} />
          </Tooltip>
        </div>
        <div className="flex justify-center">
          <Tooltip
            content="왼쪽 보라색 화살표 없음"
            position="left"
            arrow={false}
            backgroundColor="#a855f7"
            textColor="#ffffff"
          >
            <Button content="조합 3" onClick={() => {}} />
          </Tooltip>
        </div>
        <div className="flex justify-center">
          <Tooltip
            content={(
              <div className="text-center">
                <div className="font-bold">복잡한 내용</div>
                <div className="text-xs mt-1">여러 요소 조합</div>
              </div>
            )}
            position="right"
            arrow
            backgroundColor="#ef4444"
            textColor="#ffffff"
          >
            <Button content="조합 4" onClick={() => {}} />
          </Tooltip>
        </div>
      </div>
    </UiBox>
  </div>
);

export default UiTooltip;
