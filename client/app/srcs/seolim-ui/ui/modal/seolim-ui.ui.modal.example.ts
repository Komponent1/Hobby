export const propsTable = [
  {
    name: 'isOpen', type: 'boolean', default: '-', description: '모달의 열림/닫힘 상태입니다.',
  },
  {
    name: 'onClose', type: '() => void', default: '-', description: '모달을 닫을 때 호출되는 함수입니다.',
  },
  {
    name: 'children', type: 'React.ReactNode', default: '-', description: '모달의 콘텐츠입니다.',
  },
  {
    name: 'variant', type: 'default | fullscreen', default: 'default', description: '모달의 스타일 변형입니다.',
  },
  {
    name: 'size', type: 'sm | md | lg | xl', default: 'md', description: '모달의 크기입니다.',
  },
  {
    name: 'position', type: 'center | top | bottom', default: 'center', description: '모달의 위치입니다.',
  },
  {
    name: 'animationType', type: 'fade | slide | zoom', default: 'fade', description: '애니메이션 타입입니다.',
  },
  {
    name: 'closeOnEsc', type: 'boolean', default: 'true', description: 'ESC 키로 닫을 수 있는지 여부입니다.',
  },
  {
    name: 'closeButtonPosition', type: 'top-right | top-left | bottom-right | bottom-left | none', default: 'top-right', description: '닫기 버튼의 위치입니다.',
  },
];

export const examples = {
  default: {
    title: '기본',
    description: '기본적인 모달 형태입니다.',
    codeContent: `
const [isDefaultOpen, setIsDefaultOpen] = useState(false);

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
`,
  },
  fullscreen: {
    title: '전체화면',
    description: 'variant="fullscreen"으로 전체화면 모달을 표시합니다.',
    codeContent: `
const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

<Button content="Fullscreen" onClick={() => setIsFullscreenOpen(true)} />
<Modal isOpen={isFullscreenOpen} onClose={() => setIsFullscreenOpen(false)} variant="fullscreen">
  <div className="p-8">
    <h3 className="text-2xl font-bold mb-4">전체 화면 모달</h3>
    <p className="text-gray-600 mb-6">
      화면 전체를 차지하는 모달입니다. 많은 콘텐츠를 표시할 때 유용합니다.
    </p>
    <Button content="닫기" onClick={() => setIsFullscreenOpen(false)} />
  </div>
</Modal>
`,
  },
  size: {
    title: '크기',
    description: 'size 속성으로 모달의 크기를 조절할 수 있습니다.',
    codeContent: `
const [isSmallOpen, setIsSmallOpen] = useState(false);
const [isLargeOpen, setIsLargeOpen] = useState(false);

<Button content="Small" size="sm" onClick={() => setIsSmallOpen(true)} />
<Button content="Large" size="sm" onClick={() => setIsLargeOpen(true)} />
<Modal isOpen={isSmallOpen} onClose={() => setIsSmallOpen(false)} size="sm">
  <div className="p-6">
    <h3 className="text-lg font-bold mb-4">작은 모달</h3>
    <p className="text-sm text-gray-600 mb-4">Small 크기의 모달입니다.</p>
    <Button content="닫기" size="sm" onClick={() => setIsSmallOpen(false)} />
  </div>
</Modal>
<Modal isOpen={isLargeOpen} onClose={() => setIsLargeOpen(false)} size="lg">
  <div className="p-6">
    <h3 className="text-xl font-bold mb-4">큰 모달</h3>
    <p className="text-gray-600 mb-4">Large 크기의 모달입니다.</p>
    <Button content="닫기" onClick={() => setIsLargeOpen(false)} />
  </div>
</Modal>
`,
  },
  position: {
    title: '위치',
    description: 'position 속성으로 모달의 위치를 변경할 수 있습니다.',
    codeContent: `
const [isCenterOpen, setIsCenterOpen] = useState(false);
const [isTopOpen, setIsTopOpen] = useState(false);

<Button content="Center" onClick={() => setIsCenterOpen(true)} />
<Button content="Top" onClick={() => setIsTopOpen(true)} />
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
`,
  },
  animation: {
    title: '애니메이션',
    description: 'animationType 속성으로 애니메이션 효과를 변경할 수 있습니다.',
    codeContent: `
const [isFadeOpen, setIsFadeOpen] = useState(false);
const [isSlideOpen, setIsSlideOpen] = useState(false);

<Button content="Fade" onClick={() => setIsFadeOpen(true)} />
<Button content="Slide" onClick={() => setIsSlideOpen(true)} />
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
`,
  },
  closeButton: {
    title: '닫기 버튼 위치',
    description: 'closeButtonPosition 속성으로 닫기 버튼의 위치를 변경할 수 있습니다.',
    codeContent: `
const [isTopRightClose, setIsTopRightClose] = useState(false);
const [isNoClose, setIsNoClose] = useState(false);

<Button content="Top Right" size="sm" onClick={() => setIsTopRightClose(true)} />
<Button content="None" size="sm" onClick={() => setIsNoClose(true)} />
<Modal isOpen={isTopRightClose} onClose={() => setIsTopRightClose(false)} closeButtonPosition="top-right">
  <div className="p-6">
    <h3 className="text-lg font-bold mb-4">우측 상단 닫기 버튼</h3>
    <p className="text-gray-600">닫기 버튼이 우측 상단에 있습니다.</p>
  </div>
</Modal>
<Modal isOpen={isNoClose} onClose={() => setIsNoClose(false)} closeButtonPosition="none">
  <div className="p-6">
    <h3 className="text-lg font-bold mb-4">닫기 버튼 없음</h3>
    <p className="text-gray-600 mb-4">닫기 버튼이 없습니다. 아래 버튼으로 닫아주세요.</p>
    <Button content="닫기" onClick={() => setIsNoClose(false)} />
  </div>
</Modal>
`,
  },
  form: {
    title: '폼',
    description: '회원가입 등 폼을 모달로 표시할 수 있습니다.',
    codeContent: `
const [isFormOpen, setIsFormOpen] = useState(false);

<Button content="회원가입" onClick={() => setIsFormOpen(true)} />
<Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} size="md">
  <div className="p-6">
    <h3 className="text-xl font-bold mb-6">회원가입</h3>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">이메일</label>
        <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="example@email.com" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">비밀번호</label>
        <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="••••••••" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">비밀번호 확인</label>
        <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="••••••••" />
      </div>
      <div className="flex gap-2 mt-6">
        <Button content="가입하기" variant="solid" onClick={() => setIsFormOpen(false)} />
        <Button content="취소" variant="outline" onClick={() => setIsFormOpen(false)} />
      </div>
    </div>
  </div>
</Modal>
`,
  },
  confirm: {
    title: '확인 다이얼로그',
    description: '확인/취소 버튼이 있는 다이얼로그 예제입니다.',
    codeContent: `
const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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
`,
  },
  image: {
    title: '이미지 갤러리',
    description: '이미지와 설명을 모달로 표시할 수 있습니다.',
    codeContent: `
import Image from 'next/image';

const [isImageOpen, setIsImageOpen] = useState(false);

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
`,
  },
  mix: {
    title: '조합',
    description: '다양한 속성을 조합한 예제입니다.',
    codeContent: `
const [isMixOpen, setIsMixOpen] = useState(false);

<Button content="Large + Top + Slide + Top-Left Close" onClick={() => setIsMixOpen(true)} />
<Modal isOpen={isMixOpen} onClose={() => setIsMixOpen(false)} size="lg" position="top" animationType="slide" closeButtonPosition="top-left">
  <div className="p-6">
    <p className="text-sm text-gray-600">
      size="lg", position="top", animationType="slide", closeButtonPosition="top-left"를 조합한 모달입니다.
    </p>
  </div>
</Modal>
`,
  },
};
