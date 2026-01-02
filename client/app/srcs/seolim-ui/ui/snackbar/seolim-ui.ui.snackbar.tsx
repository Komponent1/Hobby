import React, { useState } from 'react';
import { Snackbar, Button } from '@seolim/designsystem';
import {
  HeadBox,
  PropsTable,
  Title,
  Description,
  UiBox,
} from '../../component';
import { examples } from './seolim-ui.ui.snackbar.example';

const UiSnackbar: React.FC = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [isOpen8, setIsOpen8] = useState(false);
  const [isOpen9, setIsOpen9] = useState(false);
  const [isOpen10, setIsOpen10] = useState(false);
  return (
    <div className="space-y-6">
      <HeadBox>
        <Title text="Snackbar" />
        <Description text="간단한 메시지를 일시적으로 표시하는 스낵바 컴포넌트입니다." />
      </HeadBox>

      <div className="space-y-4">
        <Title text="속성" />
        <PropsTable
          datas={[
            {
              name: 'message', type: 'string', default: '-', description: '스낵바에 표시될 메시지입니다.',
            },
            {
              name: 'duration', type: 'number', default: '3000', description: '스낵바가 자동으로 닫히기까지의 시간(밀리초)입니다.',
            },
            {
              name: 'onClose', type: '() => void', default: '-', description: '스낵바가 닫힐 때 호출되는 콜백 함수입니다.',
            },
            {
              name: 'snackbarPosition', type: 'top | bottom | top-left | top-right | bottom-left | bottom-right', default: 'bottom', description: '스낵바의 위치입니다.',
            },
            {
              name: 'snackbarAnimation', type: 'fade | slide | grow', default: 'slide', description: '스낵바의 애니메이션 타입입니다.',
            },
            {
              name: 'dragable', type: 'boolean', default: 'false', description: '스낵바를 드래그할 수 있는지 여부입니다.',
            },
          ]}
        />
      </div>

      <UiBox {...examples.basic}>
        <Title text="기본 사용법" />
        <Description text="기본적인 스낵바 형태입니다." />
        <div className="mt-4">
          <Button content="스낵바 열기" onClick={() => setIsOpen1(true)} />
          {isOpen1 && (
            <Snackbar
              message="기본 스낵바 메시지입니다."
              onClose={() => setIsOpen1(false)}
            />
          )}
        </div>
      </UiBox>

      <UiBox {...examples.position}>
        <Title text="위치" />
        <Description text="snackbarPosition 속성으로 스낵바의 위치를 변경할 수 있습니다." />
        <div className="space-y-4 mt-4">
          <div>
            <p className="text-sm font-medium mb-2">Top</p>
            <Button content="상단 스낵바" onClick={() => setIsOpen2(true)} />
            {isOpen2 && (
              <Snackbar
                message="상단에 표시되는 스낵바입니다."
                snackbarPosition="top"
                onClose={() => setIsOpen2(false)}
              />
            )}
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Top-Right</p>
            <Button content="우측 상단 스낵바" onClick={() => setIsOpen3(true)} />
            {isOpen3 && (
              <Snackbar
                message="우측 상단에 표시되는 스낵바입니다."
                snackbarPosition="top-right"
                onClose={() => setIsOpen3(false)}
              />
            )}
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Bottom-Left</p>
            <Button content="좌측 하단 스낵바" onClick={() => setIsOpen4(true)} />
            {isOpen4 && (
              <Snackbar
                message="좌측 하단에 표시되는 스낵바입니다."
                snackbarPosition="bottom-left"
                onClose={() => setIsOpen4(false)}
              />
            )}
          </div>
        </div>
      </UiBox>

      <UiBox {...examples.animation}>
        <Title text="애니메이션" />
        <Description text="snackbarAnimation 속성으로 스낵바의 애니메이션을 변경할 수 있습니다." />
        <div className="space-y-4 mt-4">
          <div>
            <p className="text-sm font-medium mb-2">Fade</p>
            <Button content="Fade 애니메이션" onClick={() => setIsOpen5(true)} />
            {isOpen5 && (
              <Snackbar
                message="Fade 애니메이션이 적용된 스낵바입니다."
                snackbarAnimation="fade"
                onClose={() => setIsOpen5(false)}
              />
            )}
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Grow</p>
            <Button content="Grow 애니메이션" onClick={() => setIsOpen6(true)} />
            {isOpen6 && (
              <Snackbar
                message="Grow 애니메이션이 적용된 스낵바입니다."
                snackbarAnimation="grow"
                onClose={() => setIsOpen6(false)}
              />
            )}
          </div>
        </div>
      </UiBox>

      <UiBox {...examples.dragable}>
        <Title text="드래그 가능" />
        <Description text="dragable 속성으로 스낵바를 드래그할 수 있습니다." />
        <div className="mt-4">
          <Button content="드래그 가능 스낵바" onClick={() => setIsOpen7(true)} />
          {isOpen7 && (
            <Snackbar
              message="이 스낵바는 드래그할 수 있습니다."
              dragable
              onClose={() => setIsOpen7(false)}
            />
          )}
        </div>
      </UiBox>

      <UiBox {...examples.realworld}>
        <Title text="실제 사용 예제" />
        <Description text="실제 시나리오에서 스낵바를 활용한 사용자 피드백 예제입니다." />
        <div className="space-y-4 mt-4">
          <div className="p-4 border rounded-lg">
            <p className="text-sm font-medium mb-3">폼 제출 시나리오</p>
            <div className="space-x-2">
              <Button
                content="저장 성공"
                variant="solid"
                onClick={() => setIsOpen8(true)}
              />
            </div>
            {isOpen8 && (
              <Snackbar
                message="✅ 데이터가 성공적으로 저장되었습니다!"
                duration={4000}
                snackbarPosition="bottom"
                snackbarAnimation="slide"
                onClose={() => setIsOpen8(false)}
              />
            )}
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-sm font-medium mb-3">삭제 작업 시나리오</p>
            <div className="space-x-2">
              <Button
                content="항목 삭제"
                variant="outline"
                onClick={() => setIsOpen9(true)}
              />
            </div>
            {isOpen9 && (
              <Snackbar
                message="🗑️ 항목이 삭제되었습니다."
                duration={3000}
                snackbarPosition="bottom"
                snackbarAnimation="fade"
                onClose={() => setIsOpen9(false)}
              />
            )}
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-sm font-medium mb-3">알림 메시지 시나리오</p>
            <div className="space-x-2">
              <Button
                content="새 메시지 도착"
                variant="text"
                onClick={() => setIsOpen10(true)}
              />
            </div>
            {isOpen10 && (
              <Snackbar
                message="📬 새로운 메시지가 3개 도착했습니다."
                duration={5000}
                snackbarPosition="top-left"
                snackbarAnimation="grow"
                dragable
                onClose={() => setIsOpen10(false)}
              />
            )}
          </div>
        </div>
      </UiBox>
    </div>
  );
};

export default UiSnackbar;
