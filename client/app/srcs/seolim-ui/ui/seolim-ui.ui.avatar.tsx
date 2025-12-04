import React from 'react';
import { Avatar } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../component';

const UiAvatar: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Avatar" />
      <Description text="사용자 프로필을 나타내는 아바타 컴포넌트입니다." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="속성" />
      <PropsTable
        datas={[
          { name: 'type', type: 'image | text', description: '아바타의 타입입니다. 이미지 또는 텍스트를 표시합니다.' },
          { name: 'size', type: 'sm | md | lg', description: '아바타의 크기입니다.' },
          { name: 'variant', type: 'circle | square', description: '아바타의 모양입니다.' },
          { name: 'outline', type: 'boolean', description: '아바타에 외곽선을 표시할지 여부입니다.' },
          { name: 'color', type: 'string', description: '아바타의 텍스트 색상입니다.' },
          { name: 'backgroundColor', type: 'string', description: '아바타의 배경 색상입니다.' },
          { name: 'outlineColor', type: 'string', description: '외곽선의 색상입니다.' },
          { name: 'dot', type: 'none | top | bottom', description: '상태 표시 점의 위치입니다.' },
          { name: 'dotColor', type: 'string', description: '상태 표시 점의 색상입니다.' },
          { name: 'src', type: 'string', description: '이미지 타입일 때 표시할 이미지 URL입니다.' },
          { name: 'alt', type: 'string', description: '이미지의 대체 텍스트입니다.' },
        ]}
      />
    </div>

    <UiBox>
      <Title text="기본" />
      <Description text="기본 아바타 컴포넌트입니다." />
      <div className="flex gap-4 mt-4 items-center">
        <Avatar type="text" backgroundColor="#3b82f6" color="white" alt="AV" />
        <Avatar type="text" backgroundColor="#22c55e" color="white" alt="AV" />
      </div>
    </UiBox>

    <UiBox>
      <Title text="크기" />
      <Description text="아바타는 작은 것부터 큰 것까지 다양한 크기를 지원합니다." />
      <div className="flex gap-4 mt-4 items-center">
        <Avatar size="sm" type="text" backgroundColor="#ef4444" color="white" alt="AV" />
        <Avatar size="md" type="text" backgroundColor="#22c55e" color="white" alt="AV" />
        <Avatar size="lg" type="text" backgroundColor="#8b5cf6" color="white" alt="AV" />
      </div>
    </UiBox>

    <UiBox>
      <Title text="모양" />
      <Description text="아바타는 원형과 사각형 모양을 지원합니다." />
      <div className="flex gap-4 mt-4 items-center">
        <Avatar variant="circle" type="text" backgroundColor="#f59e0b" color="white" alt="AV" />
        <Avatar variant="square" type="text" backgroundColor="#ec4899" color="white" alt="AV" />
      </div>
    </UiBox>

    <UiBox>
      <Title text="외곽선" />
      <Description text="아바타에 외곽선을 추가할 수 있습니다." />
      <div className="flex gap-4 mt-4 items-center">
        <Avatar type="text" backgroundColor="#3b82f6" color="white" alt="AV" />
        <Avatar
          outline
          type="text"
          backgroundColor="#3b82f6"
          color="white"
          outlineColor="#1f2937"
          alt="AV"
        />
      </div>
    </UiBox>

    <UiBox>
      <Title text="상태 표시" />
      <Description text="아바타에 상태를 나타내는 점을 표시할 수 있습니다." />
      <div className="flex gap-6 mt-4 items-center">
        <Avatar
          type="text"
          backgroundColor="#6b7280"
          color="white"
          dot="none"
          alt="AV"
        />
        <Avatar
          type="text"
          backgroundColor="#6b7280"
          color="white"
          dot="top"
          dotColor="#22c55e"
          alt="AV"
        />
        <Avatar
          type="text"
          backgroundColor="#6b7280"
          color="white"
          dot="bottom"
          dotColor="#ef4444"
          alt="AV"
        />
      </div>
    </UiBox>

    <UiBox>
      <Title text="이미지 아바타" />
      <Description text="이미지를 사용한 아바타 예제입니다." />
      <div className="flex gap-4 mt-4 items-center">
        <Avatar
          type="image"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="AV"
        />
        <Avatar
          type="image"
          src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1143&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="AV"
          dot="top"
          dotColor="#22c55e"
        />
        <Avatar
          type="image"
          variant="square"
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          alt="AV"
          outline
        />
      </div>
    </UiBox>

    <UiBox>
      <Title text="다양한 색상" />
      <Description text="다양한 배경색과 텍스트 색상을 사용한 아바타입니다." />
      <div className="flex gap-4 mt-4 items-center flex-wrap">
        <Avatar type="text" backgroundColor="#ef4444" color="white" alt="AV" />
        <Avatar type="text" backgroundColor="#f97316" color="white" alt="AV" />
        <Avatar type="text" backgroundColor="#eab308" color="white" alt="AV" />
        <Avatar type="text" backgroundColor="#22c55e" color="white" alt="AV" />
        <Avatar type="text" backgroundColor="#06b6d4" color="white" alt="AV" />
        <Avatar type="text" backgroundColor="#3b82f6" color="white" alt="AV" />
        <Avatar type="text" backgroundColor="#8b5cf6" color="white" alt="AV" />
        <Avatar type="text" backgroundColor="#ec4899" color="white" alt="AV" />
      </div>
    </UiBox>

    <UiBox>
      <Title text="예제" />
      <Description text="실제 사용 상황에서의 아바타 예제입니다." />
      <div className="space-y-4 mt-4">
        <div className="flex items-center gap-3 p-3 border rounded-lg">
          <Avatar
            type="text"
            backgroundColor="#3b82f6"
            color="white"
            size="md"
            alt="AV"
          />
          <div>
            <p className="font-medium text-gray-900">김철수</p>
            <p className="text-sm text-gray-600">Frontend Developer</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 border rounded-lg">
          <Avatar
            type="text"
            backgroundColor="#22c55e"
            color="white"
            size="md"
            dot="bottom"
            dotColor="#22c55e"
            alt="AV"
          />
          <div>
            <p className="font-medium text-gray-900">이영희</p>
            <p className="text-sm text-gray-600">온라인 • 방금 전</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 border rounded-lg">
          <Avatar
            type="image"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
            alt="AV"
            size="md"
            dot="top"
            dotColor="#ef4444"
          />
          <div>
            <p className="font-medium text-gray-900">박민수</p>
            <p className="text-sm text-gray-600">바쁨 • 1시간 전</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 border rounded-lg">
          <Avatar
            type="text"
            backgroundColor="#8b5cf6"
            color="white"
            size="md"
            variant="square"
            outline
            outlineColor="#6b7280"
            alt="AV"
          />
          <div>
            <p className="font-medium text-gray-900">정수연</p>
            <p className="text-sm text-gray-600">Designer</p>
          </div>
        </div>
      </div>
    </UiBox>
  </div>
);

export default UiAvatar;
