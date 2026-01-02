/* eslint-disable no-useless-escape */
export const propsTable = [
  {
    name: 'type', type: 'content | header-content | content-footer | image-content | content-image | image_overlay', default: 'content', description: '카드의 레이아웃 타입입니다.',
  },
  {
    name: 'size', type: 'sm | md | lg', default: 'md', description: '카드의 크기입니다.',
  },
  {
    name: 'src', type: 'string', default: '-', description: '이미지 소스 URL입니다.',
  },
  {
    name: 'alt', type: 'string', default: '-', description: '이미지 대체 텍스트입니다.',
  },
  {
    name: 'hoverType', type: 'shadow | lift | none', default: 'none', description: '호버 시 효과 타입입니다.',
  },
  {
    name: 'children', type: 'React.ReactNode', default: '-', description: '카드의 주요 콘텐츠입니다.',
  },
  {
    name: 'header', type: 'React.ReactNode', default: '-', description: '카드의 헤더 콘텐츠입니다.',
  },
  {
    name: 'footer', type: 'React.ReactNode', default: '-', description: '카드의 푸터 콘텐츠입니다.',
  },
  {
    name: 'autoPadding', type: 'boolean', default: 'false', description: '자동으로 패딩을 적용할지 여부입니다.',
  },
];

export const examples = {
  basic: {
    title: '기본 사용법',
    description: '기본적인 콘텐츠 카드입니다.',
    codeContent: `
<Card type="content">
  <div className="p-4">
    <h3 className="text-lg font-bold mb-2">카드 제목</h3>
    <p className="text-gray-600">카드의 기본 콘텐츠 영역입니다.</p>
  </div>
</Card>
`,
  },
  type: {
    title: '타입',
    description: 'type 속성으로 카드의 레이아웃을 변경할 수 있습니다.',
    codeContent: `
<Card type="content">
  <div className="p-4">
    <h3 className="font-bold mb-2">콘텐츠 카드</h3>
    <p className="text-sm text-gray-600">기본 콘텐츠만 포함된 카드입니다.</p>
  </div>
</Card>
<Card type="header-content" header={<div className=\"p-4 bg-gray-100 font-bold\">헤더 영역</div>}>
  <div className="p-4">
    <p className="text-sm text-gray-600">헤더와 콘텐츠가 포함된 카드입니다.</p>
  </div>
</Card>
<Card type="content-footer" footer={<div className=\"p-4 bg-gray-100 text-center\"><Button content=\"액션\" size=\"sm\" onClick={() => {}} /></div>}>
  <div className="p-4">
    <p className="text-sm text-gray-600">콘텐츠와 푸터가 포함된 카드입니다.</p>
  </div>
</Card>
<Card type="image-content" src="https://cdn.pixabay.com/photo/2019/07/30/18/26/surface-4373559_1280.jpg" alt="카드 이미지">
  <div className="p-4">
    <h3 className="font-bold mb-2">이미지 카드</h3>
    <p className="text-sm text-gray-600">상단에 이미지가 있는 카드입니다.</p>
  </div>
</Card>
<Card type="content-image" src="https://cdn.pixabay.com/photo/2019/07/30/18/26/surface-4373559_1280.jpg" alt="카드 이미지">
  <div className="p-4">
    <h3 className="font-bold mb-2">이미지 카드</h3>
    <p className="text-sm text-gray-600">하단에 이미지가 있는 카드입니다.</p>
  </div>
</Card>
<Card type="image_overlay" src="https://cdn.pixabay.com/photo/2019/07/30/18/26/surface-4373559_1280.jpg" alt="오버레이 이미지">
  <div className="p-4 text-white">
    <h3 className="font-bold mb-2">오버레이 카드</h3>
    <p className="text-sm">이미지 위에 콘텐츠가 오버레이됩니다.</p>
  </div>
</Card>
`,
  },
  size: {
    title: '크기',
    description: 'size 속성으로 카드의 크기를 조절할 수 있습니다.',
    codeContent: `
<Card type="content" size="sm">
  <div className="p-4">
    <h3 className="font-bold mb-2">작은 카드</h3>
    <p className="text-sm text-gray-600">sm 크기의 카드입니다.</p>
  </div>
</Card>
<Card type="content" size="md">
  <div className="p-4">
    <h3 className="font-bold mb-2">중간 카드</h3>
    <p className="text-sm text-gray-600">md 크기의 카드입니다.</p>
  </div>
</Card>
<Card type="content" size="lg">
  <div className="p-4">
    <h3 className="font-bold mb-2">큰 카드</h3>
    <p className="text-sm text-gray-600">lg 크기의 카드입니다.</p>
  </div>
</Card>
`,
  },
  hover: {
    title: '호버 효과',
    description: 'hoverType 속성으로 마우스 호버 시 효과를 설정할 수 있습니다.',
    codeContent: `
<Card type="content" hoverType="shadow">
  <div className="p-4">
    <h3 className="font-bold mb-2">그림자 효과</h3>
    <p className="text-sm text-gray-600">마우스를 올려보세요.</p>
  </div>
</Card>
<Card type="content" hoverType="lift">
  <div className="p-4">
    <h3 className="font-bold mb-2">상승 효과</h3>
    <p className="text-sm text-gray-600">마우스를 올려보세요.</p>
  </div>
</Card>
<Card type="content" hoverType="none">
  <div className="p-4">
    <h3 className="font-bold mb-2">효과 없음</h3>
    <p className="text-sm text-gray-600">호버 효과가 없습니다.</p>
  </div>
</Card>
`,
  },
  autoPadding: {
    title: '자동 패딩',
    description: 'autoPadding 속성으로 콘텐츠 영역에 자동으로 패딩을 적용할 수 있습니다.',
    codeContent: `
<Card type="content" autoPadding={false}>
  <div className="bg-blue-100 p-4">
    <h3 className="font-bold mb-2">수동 패딩</h3>
    <p className="text-sm text-gray-600">children에 직접 패딩을 적용해야 합니다.</p>
  </div>
</Card>
<Card type="content" autoPadding>
  <div className="bg-blue-100">
    <h3 className="font-bold mb-2">자동 패딩</h3>
    <p className="text-sm text-gray-600">카드가 자동으로 패딩을 적용합니다.</p>
  </div>
</Card>
<Card type="image-content" src="https://cdn.pixabay.com/photo/2019/07/30/18/26/surface-4373559_1280.jpg" alt="이미지 카드" autoPadding={false}>
  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
    <h3 className="font-bold mb-2">전체 배경</h3>
    <p className="text-sm">패딩 없이 전체 영역을 사용할 수 있습니다.</p>
  </div>
</Card>
<Card type="image-content" src="https://cdn.pixabay.com/photo/2019/07/30/18/26/surface-4373559_1280.jpg" alt="이미지 카드" autoPadding>
  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
    <h3 className="font-bold mb-2">자동 여백</h3>
    <p className="text-sm">자동으로 적절한 패딩이 적용됩니다.</p>
  </div>
</Card>
`,
  },
  example: {
    title: '사용 예제',
    description: '실제 사용 시나리오 예제입니다.',
    codeContent: `
// 제품 카드
<Card
  type="image-content"
  src="https://cdn.pixabay.com/photo/2015/05/15/01/48/computer-767776_1280.jpg"
  alt="제품 1"
  hoverType="lift"
  footer={(
    <div className="p-4 flex justify-between items-center">
      <span className="font-bold text-lg">₩99,000</span>
      <Button content="구매" size="sm" variant="solid" onClick={() => {}} />
    </div>
  )}
>
  <div className="p-4">
    <h3 className="font-bold mb-2">프리미엄 노트북</h3>
    <p className="text-sm text-gray-600">고성능 프로세서와 긴 배터리 수명을 자랑합니다.</p>
  </div>
</Card>

// 블로그 포스트
<Card
  type="header-content"
  header={(
    <div className="p-4 bg-blue-50">
      <span className="text-xs text-blue-600 font-semibold">기술</span>
      <p className="text-xs text-gray-500 mt-1">2025년 12월 17일</p>
    </div>
  )}
  hoverType="shadow"
  footer={(
    <div className="p-4 border-t">
      <Button content="더 읽기 →" variant="text" size="sm" onClick={() => {}} />
    </div>
  )}
>
  <div className="p-4">
    <h3 className="font-bold text-lg mb-2">React 19의 새로운 기능</h3>
    <p className="text-sm text-gray-600">React 19에서 추가된 주요 기능들을 살펴봅니다. 서버 컴포넌트, 액션, 그리고 더 많은...</p>
  </div>
</Card>

// 팀 멤버 프로필
<Card
  type="image-content"
  src="https://cdn.pixabay.com/photo/2017/06/14/20/03/smiley-2403201_1280.jpg"
  alt="김철수"
  size="sm"
  hoverType="lift"
>
  <div className="p-4 text-center">
    <h4 className="font-bold mb-1">김철수</h4>
    <p className="text-sm text-gray-600">CEO</p>
  </div>
</Card>

// 특집 기사
<Card
  type="image_overlay"
  src="https://cdn.pixabay.com/photo/2019/07/30/18/26/surface-4373559_1280.jpg"
  alt="특집 기사"
  size="lg"
  hoverType="shadow"
>
  <div className="p-8 text-white">
    <span className="inline-block bg-red-500 text-xs px-3 py-1 rounded-full mb-4">특집</span>
    <h2 className="text-3xl font-bold mb-4">AI의 미래: 2025년 전망</h2>
    <p className="text-lg mb-6">인공지능 기술의 발전이 우리의 삶을 어떻게 변화시킬지 전문가들의 의견을 들어봅니다.</p>
    <Button content="자세히 보기" variant="solid" onClick={() => {}} />
  </div>
</Card>
`,
  },
  combination: {
    title: '조합',
    description: '다양한 속성을 조합한 예제입니다.',
    codeContent: `
<Card type="image-content" src="https://cdn.pixabay.com/photo/2019/07/30/18/26/surface-4373559_1280.jpg" alt="조합 카드 1" size="lg" hoverType="lift" header={<div className=\"absolute top-4 right-4 z-10\"><span className=\"bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full\">NEW</span></div>} footer={<div className=\"p-4 flex gap-2\"><Button content=\"좋아요\" variant=\"outline\" size=\"sm\" onClick={() => {}} /><Button content=\"공유\" variant=\"solid\" size=\"sm\" onClick={() => {}} /></div>}>
  <div className="p-6">
    <h3 className="text-xl font-bold mb-3">완전한 카드</h3>
    <p className="text-gray-600 mb-4">모든 속성을 조합한 카드입니다. 큰 크기, 상승 효과, 헤더와 푸터를 모두 포함합니다.</p>
    <div className="flex gap-2 text-sm text-gray-500">
      <span>👁️ 1,234</span>
      <span>❤️ 89</span>
      <span>💬 12</span>
    </div>
  </div>
</Card>
<Card type="content-footer" size="md" hoverType="shadow" autoPadding={false} footer={<div className=\"p-4 bg-gradient-to-r from-purple-500 to-pink-500 flex justify-center\"><Button content=\"시작하기\" variant=\"solid\" color=\"#ffffff\" textColor=\"#a855f7\" onClick={() => {}} /></div>}>
  <div className="p-6">
    <h3 className="text-xl font-bold mb-3">프리미엄 플랜</h3>
    <p className="text-3xl font-bold mb-4">₩29,000<span className="text-base font-normal text-gray-600">/월</span></p>
    <ul className="space-y-2 mb-4">
      <li className="flex items-center text-sm"><span className="text-green-500 mr-2">✓</span>무제한 프로젝트</li>
      <li className="flex items-center text-sm"><span className="text-green-500 mr-2">✓</span>우선 지원</li>
      <li className="flex items-center text-sm"><span className="text-green-500 mr-2">✓</span>고급 분석</li>
    </ul>
  </div>
</Card>
`,
  },
};
