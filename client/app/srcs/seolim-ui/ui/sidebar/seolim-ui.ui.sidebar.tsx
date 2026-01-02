import React from 'react';
import { Sidebar } from '@seolim/designsystem';
import Title from '../../component/seolim-ui.component.title';
import Description from '../../component/seolim-ui.component.description';
import PropsTable from '../../component/seolim-ui.component.propsTable';
import HeadBox from '../../component/seolim-ui.component.headBox';
import UiBox from '../../component/seolim-ui.component.uibox';
import { examples } from './seolim-ui.ui.sidebar.example';

const UiSidebar: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Sidebar" />
      <Description text="페이지 내 주요 내비게이션을 제공하는 사이드바 컴포넌트입니다." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="속성" />
      <PropsTable
        datas={[
          {
            name: 'width', type: 'string | number', default: '-', description: '사이드바의 너비를 지정합니다.',
          },
          {
            name: 'variant', type: "'alwaysOpen' | 'collapsible'", default: 'alwaysOpen', description: '사이드바의 동작 방식을 지정합니다.',
          },
          {
            name: 'position', type: "'left' | 'right'", default: 'left', description: '사이드바의 위치를 지정합니다.',
          },
          {
            name: 'buttonTop', type: 'number', default: '-', description: '접기/펼치기 버튼의 상단 위치(px).',
          },
          {
            name: 'buttonSize', type: "'sm' | 'md' | 'lg'", default: 'md', description: '접기/펼치기 버튼의 크기.',
          },
          {
            name: 'children', type: 'React.ReactNode', default: '-', description: '사이드바 내부에 렌더링할 내용.',
          },
          {
            name: 'style', type: 'React.CSSProperties', default: '-', description: '사이드바의 커스텀 스타일.',
          },
          {
            name: 'buttonStyle', type: 'React.CSSProperties', default: '-', description: '접기/펼치기 버튼의 커스텀 스타일.',
          },
        ]}
      />
    </div>

    <UiBox {...examples.variant}>
      <div className="relative h-96 flex gap-8 mt-4 flex-wrap">
        <div className="relative flex-1 bg-gray-200 rounded-r-2xl">
          <Sidebar variant="alwaysOpen" width={200} position="left" style={{ border: '1px solid #eee' }}>
            <div style={{ padding: 16 }}>alwaysOpen (왼쪽)</div>
          </Sidebar>
        </div>
        <div className="relative flex-1 bg-gray-200 rounded-r-2xl">
          <Sidebar variant="collapsible" width={200} position="left" style={{ border: '1px solid #eee' }}>
            <div style={{ padding: 16 }}>collapsible (왼쪽)</div>
          </Sidebar>
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.position}>
      <div className="relative h-96 flex gap-8 mt-4 flex-wrap">
        <div className="relative flex-1 bg-gray-200 rounded-r-2xl">
          <Sidebar variant="alwaysOpen" width={180} position="left" style={{ border: '1px solid #eee' }}>
            <div style={{ padding: 16 }}>왼쪽 사이드바</div>
          </Sidebar>
        </div>
        <div className="relative flex-1 bg-gray-200 rounded-l-2xl">
          <Sidebar variant="alwaysOpen" width={180} position="right" style={{ border: '1px solid #eee' }}>
            <div style={{ padding: 16 }}>오른쪽 사이드바</div>
          </Sidebar>
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.button}>
      <div className="relative h-96 flex gap-8 mt-4 flex-wrap">
        <div className="relative flex-1 bg-gray-200">
          <Sidebar variant="collapsible" buttonTop={40} buttonSize="lg" buttonStyle={{ background: '#3b82f6', color: '#fff' }} style={{ border: '1px solid #eee' }}>
            <div style={{ padding: 16 }}>{`buttonSize="lg" 커스텀 버튼 스타일`}</div>
          </Sidebar>
        </div>
        <div className="relative flex-1 bg-gray-200">
          <Sidebar variant="collapsible" buttonTop={10} buttonSize="sm" buttonStyle={{ background: '#22c55e', color: '#fff' }} style={{ border: '1px solid #eee' }}>
            <div style={{ padding: 16 }}>{`buttonSize="sm" 커스텀 버튼 스타일`}</div>
          </Sidebar>
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.realworld}>
      <div className="relative h-96 flex bg-gray-100 rounded-lg overflow-hidden border-2 ">
        <div className="relative" style={{ width: 220, minWidth: 180 }}>
          <Sidebar variant="alwaysOpen" width={220} position="left" style={{ height: '100%', borderRight: '1px solid #eee' }}>
            <div style={{ padding: 20 }}>
              <div style={{ fontWeight: 600, marginBottom: 12 }}>메뉴</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: 8 }}><span style={{ color: '#2563eb', textDecoration: 'none' }}>대시보드</span></li>
                <li style={{ marginBottom: 8 }}><span style={{ color: '#374151', textDecoration: 'none' }}>문서 관리</span></li>
                <li style={{ marginBottom: 8 }}><span style={{ color: '#374151', textDecoration: 'none' }}>설정</span></li>
              </ul>
            </div>
          </Sidebar>
        </div>
        <div className="flex-1 bg-white p-8">
          <div className="text-xl font-bold mb-2">메인 컨텐츠 영역</div>
          <div className="text-gray-600">이곳에 페이지의 주요 컨텐츠가 들어갑니다. 사이드바를 통해 메뉴를 이동할 수 있습니다.</div>
        </div>
      </div>
    </UiBox>
  </div>
);

export default UiSidebar;
