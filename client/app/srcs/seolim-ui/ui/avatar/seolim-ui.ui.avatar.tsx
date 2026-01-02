import React from 'react';
import { Avatar } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../../component';
import { propsTable, examples } from './seolim-ui.ui.avatar.example';

const UiAvatar: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Avatar" />
      <Description text="사용자 프로필을 나타내는 아바타 컴포넌트입니다." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="속성" />
      <PropsTable datas={propsTable} />
    </div>

    <UiBox {...examples.basic}>
      <div className="flex gap-4 mt-4 items-center">
        <Avatar type="text" backgroundColor="#3b82f6" color="white" alt="AV" />
        <Avatar type="text" backgroundColor="#22c55e" color="white" alt="AV" />
      </div>
    </UiBox>

    <UiBox {...examples.size}>
      <div className="flex gap-4 mt-4 items-center">
        <Avatar size="sm" type="text" backgroundColor="#ef4444" color="white" alt="AV" />
        <Avatar size="md" type="text" backgroundColor="#22c55e" color="white" alt="AV" />
        <Avatar size="lg" type="text" backgroundColor="#8b5cf6" color="white" alt="AV" />
      </div>
    </UiBox>

    <UiBox {...examples.variant}>
      <div className="flex gap-4 mt-4 items-center">
        <Avatar variant="circle" type="text" backgroundColor="#f59e0b" color="white" alt="AV" />
        <Avatar variant="square" type="text" backgroundColor="#ec4899" color="white" alt="AV" />
      </div>
    </UiBox>

    <UiBox {...examples.outline}>
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

    <UiBox {...examples.dot}>
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

    <UiBox {...examples.image}>
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

    <UiBox {...examples.color}>
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

    <UiBox {...examples.example}>
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
