/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { ContextMenu } from '@seolim/designsystem';
import {
  HeadBox,
  PropsTable,
  Title,
  Description,
  UiBox,
} from '../../component';
import { examples } from './seolim-ui.ui.context-menu.example';

const UiContextMenu: React.FC = () => {
  const [contextMenu1, setContextMenu1] = useState({ visible: false, x: 0, y: 0 });
  const [contextMenu2, setContextMenu2] = useState({ visible: false, x: 0, y: 0 });
  const [contextMenu3, setContextMenu3] = useState({ visible: false, x: 0, y: 0 });
  const [selectedAction, setSelectedAction] = useState<string>('');

  const handleContextMenu = (
    e: React.MouseEvent,
    setMenu: React.Dispatch<React.SetStateAction<{ visible: boolean; x: number; y: number }>>,
  ) => {
    e.preventDefault();
    setMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  const handleMenuClick = (
    action: string,
    setMenu: React.Dispatch<React.SetStateAction<{ visible: boolean; x: number; y: number }>>,
  ) => {
    setSelectedAction(action);
    setMenu({ visible: false, x: 0, y: 0 });
  };

  return (
    <div className="space-y-6">
      <HeadBox>
        <Title text="ContextMenu" />
        <Description text="우클릭 시 표시되는 컨텍스트 메뉴 컴포넌트입니다." />
      </HeadBox>

      <div className="space-y-4">
        <Title text="속성" />
        <PropsTable
          datas={[
            {
              name: 'children', type: 'React.ReactNode[]', default: '-', description: '메뉴에 표시될 항목들의 배열입니다.',
            },
            {
              name: 'position', type: '{ x: number; y: number }', default: '-', description: '메뉴가 표시될 위치의 좌표입니다.',
            },
            {
              name: 'visible', type: 'boolean', default: '-', description: '메뉴의 표시 여부입니다.',
            },
            {
              name: 'onClose', type: '() => void', default: '-', description: '메뉴가 닫힐 때 호출되는 함수입니다.',
            },
            {
              name: 'dividerIndex', type: 'number[]', default: '-', description: '구분선을 표시할 메뉴 항목의 인덱스 배열입니다.',
            },
          ]}
        />
      </div>

      <UiBox {...examples.basic}>
        <div
          className="mt-4 p-16 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50"
          onContextMenu={(e) => handleContextMenu(e, setContextMenu1)}
          onClick={() => setContextMenu1({ visible: false, x: 0, y: 0 })}
        >
          <p className="text-gray-600">이 영역을 우클릭하세요</p>
          {selectedAction && (
            <p className="mt-2 text-sm text-blue-600">
              선택된 동작:
              <br />
              {selectedAction}
            </p>
          )}
        </div>
        {contextMenu1.visible && (
          <ContextMenu
            position={{ x: contextMenu1.x, y: contextMenu1.y }}
            visible={contextMenu1.visible}
            onClose={() => setContextMenu1({ visible: false, x: 0, y: 0 })}
          >
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleMenuClick('복사', setContextMenu1)}
            >
              복사
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleMenuClick('붙여넣기', setContextMenu1)}
            >
              붙여넣기
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleMenuClick('삭제', setContextMenu1)}
            >
              삭제
            </div>
          </ContextMenu>
        )}
      </UiBox>

      <UiBox {...examples.divider}>
        <div
          className="mt-4 p-16 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50"
          onContextMenu={(e) => handleContextMenu(e, setContextMenu2)}
          onClick={() => setContextMenu2({ visible: false, x: 0, y: 0 })}
        >
          <p className="text-gray-600">우클릭하여 구분선이 있는 메뉴 보기</p>
        </div>
        {contextMenu2.visible && (
          <ContextMenu
            position={{ x: contextMenu2.x, y: contextMenu2.y }}
            visible={contextMenu2.visible}
            onClose={() => setContextMenu2({ visible: false, x: 0, y: 0 })}
            dividerIndex={[2, 4]}
          >
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleMenuClick('열기', setContextMenu2)}
            >
              열기
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleMenuClick('편집', setContextMenu2)}
            >
              편집
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleMenuClick('복사', setContextMenu2)}
            >
              복사
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleMenuClick('이름 변경', setContextMenu2)}
            >
              이름 변경
            </div>
            <div
              className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
              onClick={() => handleMenuClick('삭제', setContextMenu2)}
            >
              삭제
            </div>
          </ContextMenu>
        )}
      </UiBox>

      <UiBox {...examples.example}>
        <div className="mt-4 space-y-4">
          <div
            className="p-6 border rounded-lg cursor-pointer hover:bg-gray-50"
            onContextMenu={(e) => handleContextMenu(e, setContextMenu3)}
            onClick={() => setContextMenu3({ visible: false, x: 0, y: 0 })}
          >
            <div className="flex items-center space-x-3">
              <div className="text-4xl">📄</div>
              <div>
                <p className="font-medium">문서.pdf</p>
                <p className="text-sm text-gray-500">1.2 MB</p>
              </div>
            </div>
          </div>
          {selectedAction && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-800">
                <strong>실행된 동작:</strong>
                <br />
                {selectedAction}
              </p>
            </div>
          )}
        </div>
        {contextMenu3.visible && (
          <ContextMenu
            position={{ x: contextMenu3.x, y: contextMenu3.y }}
            visible={contextMenu3.visible}
            onClose={() => setContextMenu3({ visible: false, x: 0, y: 0 })}
            dividerIndex={[1, 4, 6]}
          >
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
              onClick={() => handleMenuClick('파일 열기', setContextMenu3)}
            >
              <span>📂</span>
              <span>열기</span>
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
              onClick={() => handleMenuClick('새 창에서 열기', setContextMenu3)}
            >
              <span>🗔</span>
              <span>새 창에서 열기</span>
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
              onClick={() => handleMenuClick('다운로드', setContextMenu3)}
            >
              <span>⬇️</span>
              <span>다운로드</span>
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
              onClick={() => handleMenuClick('공유', setContextMenu3)}
            >
              <span>🔗</span>
              <span>공유</span>
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
              onClick={() => handleMenuClick('이름 변경', setContextMenu3)}
            >
              <span>✏️</span>
              <span>이름 변경</span>
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
              onClick={() => handleMenuClick('즐겨찾기 추가', setContextMenu3)}
            >
              <span>⭐</span>
              <span>즐겨찾기 추가</span>
            </div>
            <div
              className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer flex items-center space-x-2"
              onClick={() => handleMenuClick('삭제', setContextMenu3)}
            >
              <span>🗑️</span>
              <span>삭제</span>
            </div>
          </ContextMenu>
        )}
      </UiBox>
    </div>
  );
};

export default UiContextMenu;
