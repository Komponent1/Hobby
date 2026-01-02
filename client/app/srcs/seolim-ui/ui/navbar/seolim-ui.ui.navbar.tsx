import React, {useState} from 'react';
import { Navbar, Button } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../../component';
import { examples } from './seolim-ui.ui.navbar.example';

const UiNavbar: React.FC = () => {
  const [fixnavbar, setFixnavbar] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      <HeadBox>
        <Title text="Navbar" />
        <Description text="상단 네비게이션 바 컴포넌트입니다." />
      </HeadBox>

      <div className="space-y-4">
        <Title text="속성" />
        <PropsTable
          datas={[
            {
              name: 'icon', type: 'React.ReactNode', default: '-', description: '네비게이션 바의 아이콘입니다.',
            },
            {
              name: 'title', type: 'string', default: '-', description: '네비게이션 바의 제목입니다.',
            },
            {
              name: 'titleLink', type: 'string', default: '-', description: '제목 클릭 시 이동할 링크입니다.',
            },
            {
              name: 'links', type: '{ label: string; href: string }[]', default: '-', description: '네비게이션 링크 배열입니다.',
            },
            {
              name: 'type', type: 'default | fixed | sticky', default: 'default', description: '네비게이션 바의 위치 타입입니다.',
            },
            {
              name: 'variant', type: 'centered | right', default: 'centered', description: '링크 정렬 방식입니다.',
            },
            {
              name: 'backgroundColor', type: 'string', default: '-', description: '배경 색상입니다.',
            },
            {
              name: 'textColor', type: 'string', default: '-', description: '텍스트 색상입니다.',
            },
            {
              name: 'children', type: 'React.ReactNode', default: '-', description: '추가 콘텐츠입니다.',
            },
          ]}
        />
      </div>

      {/* 기본 예제 */}
      <UiBox {...examples.basic}>
        <div className="mt-4">
          <Navbar
            title="My Website"
            links={[
              { label: '홈', href: '/' },
              { label: '소개', href: '/about' },
              { label: '서비스', href: '/services' },
              { label: '연락처', href: '/contact' },
            ]}
          />
        </div>
      </UiBox>

      {/* 타입 예제 */}
      <UiBox {...examples.type}>
        <div className="space-y-8 mt-4">
          <div>
            <p className="text-sm font-medium mb-4">Default (기본)</p>
            <Navbar
              title="Default Navbar"
              type="default"
              links={[
                { label: '홈', href: '/' },
                { label: '소개', href: '/about' },
              ]}
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-4">Fixed (고정)</p>
            <div className="relative border border-gray-300 rounded">
              <div className="p-4">
                <Button content={`${fixnavbar ? 'navbar 숨기기' : 'navbar 보이기'}`} size="md" onClick={() => setFixnavbar(!fixnavbar)} />
              </div>
              {fixnavbar && (
                <Navbar
                  title="Fixed Navbar"
                  type="fixed"
                  links={[
                    { label: '홈', href: '/' },
                    { label: '소개', href: '/about' },
                  ]}
                />
              )}
              <div className="p-4">
                <p>스크롤해도 상단에 고정됩니다.</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-4">Sticky (스티키)</p>
            <div className="relative h-[200px] overflow-auto border border-gray-300 rounded">
              <div className="h-16 bg-gray-100 flex items-center px-4">
                상단 콘텐츠
              </div>
              <Navbar
                title="Sticky Navbar"
                type="sticky"
                links={[
                  { label: '홈', href: '/' },
                  { label: '소개', href: '/about' },
                ]}
              />
              <div className="p-4">
                <p>스크롤 시 상단에 붙습니다.</p>
                <div className="h-[400px]" />
              </div>
            </div>
          </div>
        </div>
      </UiBox>

      {/* variant 예제 */}
      <UiBox {...examples.variant}>
        <div className="space-y-8 mt-4">
          <div>
            <p className="text-sm font-medium mb-4">Centered (중앙 정렬)</p>
            <Navbar
              title="My Brand"
              variant="centered"
              links={[
                { label: '제품', href: '/products' },
                { label: '가격', href: '/pricing' },
                { label: '문서', href: '/docs' },
              ]}
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-4">Right (오른쪽 정렬)</p>
            <Navbar
              title="My Brand"
              variant="right"
              links={[
                { label: '제품', href: '/products' },
                { label: '가격', href: '/pricing' },
                { label: '문서', href: '/docs' },
              ]}
            />
          </div>
        </div>
      </UiBox>

      {/* 아이콘 예제 */}
      <UiBox {...examples.icon}>
        <div className="mt-4">
          <Navbar
            icon={<span className="text-2xl">🚀</span>}
            title="Rocket App"
            links={[
              { label: '대시보드', href: '/dashboard' },
              { label: '프로젝트', href: '/projects' },
              { label: '팀', href: '/team' },
            ]}
          />
        </div>
      </UiBox>

      {/* 색상 예제 */}
      <UiBox {...examples.color}>
        <div className="space-y-8 mt-4">
          <div>
            <p className="text-sm font-medium mb-4">파란색 테마</p>
            <Navbar
              title="Blue Theme"
              links={[
                { label: '홈', href: '/' },
                { label: '소개', href: '/about' },
              ]}
              backgroundColor="#3b82f6"
              textColor="#ffffff"
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-4">다크 테마</p>
            <Navbar
              title="Dark Theme"
              links={[
                { label: '홈', href: '/' },
                { label: '소개', href: '/about' },
              ]}
              backgroundColor="#1f2937"
              textColor="#ffffff"
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-4">그린 테마</p>
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
          </div>
        </div>
      </UiBox>

      {/* children 예제 */}
      <UiBox {...examples.children}>
        <div className="mt-4">
          <Navbar
            title="My App"
            links={[
              { label: '홈', href: '/' },
              { label: '기능', href: '/features' },
            ]}
          >
            <Button content="로그인" variant="solid" size="sm" onClick={() => {}} />
          </Navbar>
        </div>
      </UiBox>

      {/* 사용 예제 */}
      <UiBox {...examples.usage}>
        <div className="space-y-8 mt-4">
          <div>
            <p className="text-sm font-medium mb-4">블로그 네비게이션</p>
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
          </div>
          <div>
            <p className="text-sm font-medium mb-4">이커머스 네비게이션</p>
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
                <Button content="🔍" variant="text" size="sm" onClick={() => {}} />
                <Button content="🛒" variant="text" size="sm" onClick={() => {}} />
              </div>
            </Navbar>
          </div>
          <div>
            <p className="text-sm font-medium mb-4">SaaS 대시보드</p>
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
                <Button content="로그아웃" variant="outline" size="sm" onClick={() => {}} />
              </div>
            </Navbar>
          </div>
        </div>
      </UiBox>

      {/* 조합 예제 */}
      <UiBox {...examples.combination}>
        <div className="space-y-8 mt-4">
          <div>
            <p className="text-sm font-medium mb-4">Centered + Custom Color</p>
            <div className="relative h-[200px] overflow-auto border border-gray-300 rounded">
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
              <div className="p-4 mt-16">
                <p>고정된 중앙 정렬 네비게이션</p>
                <div className="h-[400px]" />
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-4">Sticky + Right + Icon + Children</p>
            <div className="relative h-[200px] overflow-auto border border-gray-300 rounded">
              <div className="h-16 bg-gray-100 flex items-center px-4">
                상단 배너
              </div>
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
                <Button content="새 캠페인" variant="solid" size="sm" color="#ffffff" onClick={() => {}} />
              </Navbar>
              <div className="p-4">
                <p>스티키 네비게이션</p>
                <div className="h-[400px]" />
              </div>
            </div>
          </div>
        </div>
      </UiBox>
    </div>
  );
};

export default UiNavbar;
