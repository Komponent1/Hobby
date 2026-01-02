/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React, { useState } from 'react';
import Image from 'next/image';
import { Modal, Button } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../../component';
import { examples, propsTable } from './seolim-ui.ui.modal.example';

const UiModal: React.FC = () => {
  const [isDefaultOpen, setIsDefaultOpen] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [isSmallOpen, setIsSmallOpen] = useState(false);
  const [isMediumOpen, setIsMediumOpen] = useState(false);
  const [isLargeOpen, setIsLargeOpen] = useState(false);
  const [isXLOpen, setIsXLOpen] = useState(false);
  const [isCenterOpen, setIsCenterOpen] = useState(false);
  const [isTopOpen, setIsTopOpen] = useState(false);
  const [isBottomOpen, setIsBottomOpen] = useState(false);
  const [isFadeOpen, setIsFadeOpen] = useState(false);
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isTopRightClose, setIsTopRightClose] = useState(false);
  const [isTopLeftClose, setIsTopLeftClose] = useState(false);
  const [isBottomRightClose, setIsBottomRightClose] = useState(false);
  const [isBottomLeftClose, setIsBottomLeftClose] = useState(false);
  const [isNoClose, setIsNoClose] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isMixOpen, setIsMixOpen] = useState(false);

  return (
    <div className="space-y-6">
      <HeadBox>
        <Title text="Modal" />
        <Description text="팝업 형태로 콘텐츠를 표시하는 모달 컴포넌트입니다." />
      </HeadBox>

      <div className="space-y-4">
        <Title text="속성" />
        <PropsTable datas={propsTable} />
      </div>

      {/* 기본 예제 */}
      <UiBox {...examples.default}>
        <div className="p-8 mt-4">
          <Button content="기본 모달 열기" onClick={() => setIsDefaultOpen(true)} />
          <Modal isOpen={isDefaultOpen} onClose={() => setIsDefaultOpen(false)}>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">기본 모달</h3>
              <p className="text-gray-600 mb-6">
                이것은 기본 모달입니다. 배경을 클릭하거나 ESC 키를 눌러 닫을 수 있습니다.
              </p>
              <Button content="닫기" onClick={() => setIsDefaultOpen(false)} />
            </div>
          </Modal>
        </div>
      </UiBox>

      {/* 전체화면 예제 */}
      <UiBox {...examples.fullscreen}>
        <div className="flex gap-4 mt-4">
          <Button content="Default" onClick={() => setIsDefaultOpen(true)} />
          <Button content="Fullscreen" onClick={() => setIsFullscreenOpen(true)} />
        </div>
        <Modal isOpen={isFullscreenOpen} onClose={() => setIsFullscreenOpen(false)} variant="fullscreen">
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-4">전체 화면 모달</h3>
            <p className="text-gray-600 mb-6">
              화면 전체를 차지하는 모달입니다. 많은 콘텐츠를 표시할 때 유용합니다.
            </p>
            <Button content="닫기" onClick={() => setIsFullscreenOpen(false)} />
          </div>
        </Modal>
      </UiBox>

      {/* 크기 예제 */}
      <UiBox {...examples.size}>
        <div className="flex gap-4 mt-4 flex-wrap">
          <Button content="Small" size="sm" onClick={() => setIsSmallOpen(true)} />
          <Button content="Medium" size="sm" onClick={() => setIsMediumOpen(true)} />
          <Button content="Large" size="sm" onClick={() => setIsLargeOpen(true)} />
          <Button content="XL" size="sm" onClick={() => setIsXLOpen(true)} />
        </div>
        <Modal isOpen={isSmallOpen} onClose={() => setIsSmallOpen(false)} size="sm">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">작은 모달</h3>
            <p className="text-sm text-gray-600 mb-4">Small 크기의 모달입니다.</p>
            <Button content="닫기" size="sm" onClick={() => setIsSmallOpen(false)} />
          </div>
        </Modal>
        <Modal isOpen={isMediumOpen} onClose={() => setIsMediumOpen(false)} size="md">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">중간 모달</h3>
            <p className="text-gray-600 mb-4">Medium 크기의 모달입니다.</p>
            <Button content="닫기" onClick={() => setIsMediumOpen(false)} />
          </div>
        </Modal>
        <Modal isOpen={isLargeOpen} onClose={() => setIsLargeOpen(false)} size="lg">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">큰 모달</h3>
            <p className="text-gray-600 mb-4">Large 크기의 모달입니다.</p>
            <Button content="닫기" onClick={() => setIsLargeOpen(false)} />
          </div>
        </Modal>
        <Modal isOpen={isXLOpen} onClose={() => setIsXLOpen(false)} size="xl">
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-4">아주 큰 모달</h3>
            <p className="text-gray-600 mb-4">XL 크기의 모달입니다.</p>
            <Button content="닫기" onClick={() => setIsXLOpen(false)} />
          </div>
        </Modal>
      </UiBox>

      {/* 위치 예제 */}
      <UiBox {...examples.position}>
        <div className="flex gap-4 mt-4">
          <Button content="Center" onClick={() => setIsCenterOpen(true)} />
          <Button content="Top" onClick={() => setIsTopOpen(true)} />
          <Button content="Bottom" onClick={() => setIsBottomOpen(true)} />
        </div>
        <Modal isOpen={isCenterOpen} onClose={() => setIsCenterOpen(false)} position="center">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">중앙 모달</h3>
            <p className="text-gray-600 mb-4">화면 중앙에 위치합니다.</p>
            <Button content="닫기" onClick={() => setIsCenterOpen(false)} />
          </div>
        </Modal>
        <Modal isOpen={isTopOpen} onClose={() => setIsTopOpen(false)} position="top">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">상단 모달</h3>
            <p className="text-gray-600 mb-4">화면 상단에 위치합니다.</p>
            <Button content="닫기" onClick={() => setIsTopOpen(false)} />
          </div>
        </Modal>
        <Modal isOpen={isBottomOpen} onClose={() => setIsBottomOpen(false)} position="bottom">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">하단 모달</h3>
            <p className="text-gray-600 mb-4">화면 하단에 위치합니다.</p>
            <Button content="닫기" onClick={() => setIsBottomOpen(false)} />
          </div>
        </Modal>
      </UiBox>

      {/* 애니메이션 예제 */}
      <UiBox {...examples.animation}>
        <div className="flex gap-4 mt-4">
          <Button content="Fade" onClick={() => setIsFadeOpen(true)} />
          <Button content="Slide" onClick={() => setIsSlideOpen(true)} />
          <Button content="Zoom" onClick={() => setIsZoomOpen(true)} />
        </div>
        <Modal isOpen={isFadeOpen} onClose={() => setIsFadeOpen(false)} animationType="fade">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">페이드 애니메이션</h3>
            <p className="text-gray-600 mb-4">서서히 나타나는 효과입니다.</p>
            <Button content="닫기" onClick={() => setIsFadeOpen(false)} />
          </div>
        </Modal>
        <Modal isOpen={isSlideOpen} onClose={() => setIsSlideOpen(false)} animationType="slide">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">슬라이드 애니메이션</h3>
            <p className="text-gray-600 mb-4">위에서 아래로 슬라이드됩니다.</p>
            <Button content="닫기" onClick={() => setIsSlideOpen(false)} />
          </div>
        </Modal>
        <Modal isOpen={isZoomOpen} onClose={() => setIsZoomOpen(false)} animationType="zoom">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">줌 애니메이션</h3>
            <p className="text-gray-600 mb-4">확대되면서 나타납니다.</p>
            <Button content="닫기" onClick={() => setIsZoomOpen(false)} />
          </div>
        </Modal>
      </UiBox>

      {/* 닫기 버튼 위치 예제 */}
      <UiBox {...examples.closeButton}>
        <div className="flex gap-4 mt-4 flex-wrap">
          <Button content="Top Right" size="sm" onClick={() => setIsTopRightClose(true)} />
          <Button content="Top Left" size="sm" onClick={() => setIsTopLeftClose(true)} />
          <Button content="Bottom Right" size="sm" onClick={() => setIsBottomRightClose(true)} />
          <Button content="Bottom Left" size="sm" onClick={() => setIsBottomLeftClose(true)} />
          <Button content="None" size="sm" onClick={() => setIsNoClose(true)} />
        </div>
        <Modal isOpen={isTopRightClose} onClose={() => setIsTopRightClose(false)} closeButtonPosition="top-right">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">우측 상단 닫기 버튼</h3>
            <p className="text-gray-600">닫기 버튼이 우측 상단에 있습니다.</p>
          </div>
        </Modal>
        <Modal isOpen={isTopLeftClose} onClose={() => setIsTopLeftClose(false)} closeButtonPosition="top-left">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">좌측 상단 닫기 버튼</h3>
            <p className="text-gray-600">닫기 버튼이 좌측 상단에 있습니다.</p>
          </div>
        </Modal>
        <Modal isOpen={isBottomRightClose} onClose={() => setIsBottomRightClose(false)} closeButtonPosition="bottom-right">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">우측 하단 닫기 버튼</h3>
            <p className="text-gray-600">닫기 버튼이 우측 하단에 있습니다.</p>
          </div>
        </Modal>
        <Modal isOpen={isBottomLeftClose} onClose={() => setIsBottomLeftClose(false)} closeButtonPosition="bottom-left">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">좌측 하단 닫기 버튼</h3>
            <p className="text-gray-600">닫기 버튼이 좌측 하단에 있습니다.</p>
          </div>
        </Modal>
        <Modal isOpen={isNoClose} onClose={() => setIsNoClose(false)} closeButtonPosition="none">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">닫기 버튼 없음</h3>
            <p className="text-gray-600 mb-4">닫기 버튼이 없습니다. 아래 버튼으로 닫아주세요.</p>
            <Button content="닫기" onClick={() => setIsNoClose(false)} />
          </div>
        </Modal>
      </UiBox>

      {/* 폼 예제 */}
      <UiBox {...examples.form}>
        <div className="space-y-8 mt-4">
          <p className="text-sm font-medium mb-4">회원가입 폼</p>
          <Button content="회원가입" onClick={() => setIsFormOpen(true)} />
          <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} size="md">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-6">회원가입</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">이메일</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">비밀번호</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">비밀번호 확인</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex gap-2 mt-6">
                  <Button content="가입하기" variant="solid" onClick={() => setIsFormOpen(false)} />
                  <Button content="취소" variant="outline" onClick={() => setIsFormOpen(false)} />
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </UiBox>

      {/* 확인 다이얼로그 예제 */}
      <UiBox {...examples.confirm}>
        <div className="space-y-8 mt-4">
          <p className="text-sm font-medium mb-4">확인 다이얼로그</p>
          <Button content="삭제" variant="solid" color="#ef4444" onClick={() => setIsConfirmOpen(true)} />
          <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} size="sm" animationType="zoom">
            <div className="p-6 text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="text-lg font-bold mb-2">정말 삭제하시겠습니까?</h3>
              <p className="text-sm text-gray-600 mb-6">이 작업은 되돌릴 수 없습니다.</p>
              <div className="flex gap-2 justify-center">
                <Button content="취소" variant="outline" onClick={() => setIsConfirmOpen(false)} />
                <Button content="삭제" variant="solid" color="#ef4444" onClick={() => setIsConfirmOpen(false)} />
              </div>
            </div>
          </Modal>
        </div>
      </UiBox>

      {/* 이미지 갤러리 예제 */}
      <UiBox {...examples.image}>
        <div className="space-y-8 mt-4">
          <p className="text-sm font-medium mb-4">이미지 갤러리</p>
          <Button content="이미지 보기" onClick={() => setIsImageOpen(true)} />
          <Modal isOpen={isImageOpen} onClose={() => setIsImageOpen(false)} size="lg" animationType="fade">
            <div className="p-6">
              <Image
                src="https://cdn.pixabay.com/photo/2019/07/30/18/26/surface-4373559_1280.jpg"
                alt="갤러리"
                width={1280}
                height={853}
                className="w-full rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">아름다운 풍경</h3>
              <p className="text-gray-600 mb-4">멋진 자연 풍경 사진입니다.</p>
              <Button content="닫기" onClick={() => setIsImageOpen(false)} />
            </div>
          </Modal>
        </div>
      </UiBox>

      {/* 조합 예제 */}
      <UiBox {...examples.mix}>
        <div className="space-y-4 mt-4">
          <Button
            content="Large + Top + Slide + Top-Left Close"
            onClick={() => setIsMixOpen(true)}
          />
          <Modal isOpen={isMixOpen} onClose={() => setIsMixOpen(false)} size="lg" position="top" animationType="slide" closeButtonPosition="top-left">
            <div className="p-6">
              <p className="text-sm text-gray-600">
                size="lg", position="top", animationType="slide", closeButtonPosition="top-left"를 조합한 모달입니다.
              </p>
            </div>
          </Modal>
        </div>
      </UiBox>
    </div>
  );
};

export default UiModal;
