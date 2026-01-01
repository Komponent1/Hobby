export const examples = {
  basic: {
    title: '기본',
    description: '기본적인 네비게이션 바 형태입니다.',
    codeContent: `
<Navbar
  title="My Website"
  links={[
    { label: '홈', href: '/' },
    { label: '소개', href: '/about' },
    { label: '서비스', href: '/services' },
    { label: '연락처', href: '/contact' },
  ]}
/>
`,
  },
  type: {
    title: '타입',
    description: 'type 속성으로 네비게이션 바의 위치를 설정할 수 있습니다.',
    codeContent: `
<Navbar
  title="Default Navbar"
  type="default"
  links={[
    { label: '홈', href: '/' },
    { label: '소개', href: '/about' },
  ]}
/>
<Navbar
  title="Fixed Navbar"
  type="fixed"
  links={[
    { label: '홈', href: '/' },
    { label: '소개', href: '/about' },
  ]}
/>
<Navbar
  title="Sticky Navbar"
  type="sticky"
  links={[
    { label: '홈', href: '/' },
    { label: '소개', href: '/about' },
  ]}
/>
`,
  },
  variant: {
    title: '변형',
    description: 'variant 속성으로 링크 정렬 방식을 변경할 수 있습니다.',
    codeContent: `
<Navbar
  title="My Brand"
  variant="centered"
  links={[
    { label: '제품', href: '/products' },
    { label: '가격', href: '/pricing' },
    { label: '문서', href: '/docs' },
  ]}
/>
<Navbar
  title="My Brand"
  variant="right"
  links={[
    { label: '제품', href: '/products' },
    { label: '가격', href: '/pricing' },
    { label: '문서', href: '/docs' },
  ]}
/>
`,
  },
  icon: {
    title: '아이콘',
    description: 'icon 속성으로 브랜드 아이콘을 추가할 수 있습니다.',
    codeContent: `
<Navbar
  icon={<span className="text-2xl">🚀</span>}
  title="Rocket App"
  links={[
    { label: '대시보드', href: '/dashboard' },
    { label: '프로젝트', href: '/projects' },
    { label: '팀', href: '/team' },
  ]}
/>
`,
  },
  color: {
    title: '색상',
    description: 'backgroundColor와 textColor 속성으로 색상을 커스터마이징할 수 있습니다.',
    codeContent: `
<Navbar
  title="Blue Theme"
  links={[
    { label: '홈', href: '/' },
    { label: '소개', href: '/about' },
  ]}
  backgroundColor="#3b82f6"
  textColor="#ffffff"
/>
<Navbar
  title="Dark Theme"
  links={[
    { label: '홈', href: '/' },
    { label: '소개', href: '/about' },
  ]}
  backgroundColor="#1f2937"
  textColor="#ffffff"
/>
<Navbar
  icon={<span className="text-2xl">🌿</span>}
  title="Green Theme"
  links={[
    { label: '홈', href: '/' },
    { label: '소개', href: '/about' },
  ]}
  backgroundColor="#22c55e"
  textColor="#ffffff"
/>
`,
  },
  children: {
    title: '추가 콘텐츠',
    description: 'children 속성으로 버튼 등의 추가 콘텐츠를 삽입할 수 있습니다.',
    codeContent: `
<Navbar
  title="My App"
  links={[
    { label: '홈', href: '/' },
    { label: '기능', href: '/features' },
  ]}
>
  <Button type="button" content="로그인" variant="solid" size="sm" onClick={() => {}} />
</Navbar>
`,
  },
  usage: {
    title: '사용 예제',
    description: '실제 사용 시나리오 예제입니다.',
    codeContent: `
<Navbar
  icon={<span className="text-2xl">📝</span>}
  title="My Blog"
  titleLink="/"
  links={[
    { label: '글 목록', href: '/posts' },
    { label: '카테고리', href: '/categories' },
    { label: '태그', href: '/tags' },
    { label: '소개', href: '/about' },
  ]}
  variant="right"
/>
<Navbar
  icon={<span className="text-2xl">🛍️</span>}
  title="Shop"
  links={[
    { label: '신상품', href: '/new' },
    { label: '베스트', href: '/best' },
    { label: '세일', href: '/sale' },
  ]}
  backgroundColor="#a855f7"
  textColor="#ffffff"
>
  <div className="flex gap-2">
    <Button type="button" content="🔍" variant="text" size="sm" onClick={() => {}} />
    <Button type="button" content="🛒" variant="text" size="sm" onClick={() => {}} />
  </div>
</Navbar>
<Navbar
  icon={<span className="text-2xl">⚡</span>}
  title="Dashboard"
  links={[
    { label: '홈', href: '/' },
    { label: '분석', href: '/analytics' },
    { label: '설정', href: '/settings' },
  ]}
  backgroundColor="#1f2937"
  textColor="#ffffff"
  variant="right"
>
  <div className="flex gap-2 items-center">
    <span className="text-sm text-gray-300">admin@example.com</span>
    <Button type="button" content="로그아웃" variant="outline" size="sm" onClick={() => {}} />
  </div>
</Navbar>
`,
  },
  combination: {
    title: '조합',
    description: '다양한 속성을 조합한 예제입니다.',
    codeContent: `
<Navbar
  icon={<span className="text-2xl">🎨</span>}
  title="Creative Studio"
  variant="centered"
  links={[
    { label: '포트폴리오', href: '/portfolio' },
    { label: '서비스', href: '/services' },
    { label: '연락', href: '/contact' },
  ]}
  backgroundColor="#ef4444"
  textColor="#ffffff"
/>
<Navbar
  icon={<span className="text-2xl">🎯</span>}
  title="Target"
  type="sticky"
  variant="right"
  links={[
    { label: '캠페인', href: '/campaigns' },
    { label: '결과', href: '/results' },
  ]}
  backgroundColor="#3b82f6"
  textColor="#ffffff"
>
  <Button type="button" content="새 캠페인" variant="solid" size="sm" color="#ffffff" textColor="#3b82f6" onClick={() => {}} />
</Navbar>
`,
  },
};
