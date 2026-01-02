import React from 'react';
import { Card, Button } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../../component';
import { examples } from './seolim-ui.ui.card.example';

const UiCard: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Card" />
      <Description text="콘텐츠를 카드 형태로 표시하는 컴포넌트입니다." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="속성" />
      <PropsTable
        datas={[
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
        ]}
      />
    </div>

    <UiBox {...examples.basic}>
      <div className="p-8 mt-4">
        <Card type="content">
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">카드 제목</h3>
            <p className="text-gray-600">카드의 기본 콘텐츠 영역입니다.</p>
          </div>
        </Card>
      </div>
    </UiBox>

    <UiBox {...examples.type}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        <div>
          <p className="text-sm font-medium mb-4">Content</p>
          <Card type="content">
            <div className="p-4">
              <h3 className="font-bold mb-2">콘텐츠 카드</h3>
              <p className="text-sm text-gray-600">기본 콘텐츠만 포함된 카드입니다.</p>
            </div>
          </Card>
        </div>
        <div>
          <p className="text-sm font-medium mb-4">Header-Content</p>
          <Card
            type="header-content"
            header={(
              <div className="p-4 font-bold">
                헤더 영역
              </div>
            )}
          >
            <div className="p-4">
              <p className="text-sm text-gray-600">헤더와 콘텐츠가 포함된 카드입니다.</p>
            </div>
          </Card>
        </div>
        <div>
          <p className="text-sm font-medium mb-4">Content-Footer</p>
          <Card
            type="content-footer"
            footer={(
              <div className="p-4 text-center">
                <Button content="액션" size="sm" onClick={() => {}} />
              </div>
            )}
          >
            <div className="p-4">
              <p className="text-sm text-gray-600">콘텐츠와 푸터가 포함된 카드입니다.</p>
            </div>
          </Card>
        </div>
        <div>
          <p className="text-sm font-medium mb-4">Image-Content</p>
          <Card
            type="image-content"
            src="https://cdn.pixabay.com/photo/2019/07/30/18/26/surface-4373559_1280.jpg"
            alt="카드 이미지"
          >
            <div className="p-4">
              <h3 className="font-bold mb-2">이미지 카드</h3>
              <p className="text-sm text-gray-600">상단에 이미지가 있는 카드입니다.</p>
            </div>
          </Card>
        </div>
        <div>
          <p className="text-sm font-medium mb-4">Content-Image</p>
          <Card
            type="content-image"
            src="https://cdn.pixabay.com/photo/2019/07/30/18/26/surface-4373559_1280.jpg"
            alt="카드 이미지"
          >
            <div className="p-4">
              <h3 className="font-bold mb-2">이미지 카드</h3>
              <p className="text-sm text-gray-600">하단에 이미지가 있는 카드입니다.</p>
            </div>
          </Card>
        </div>
        <div>
          <p className="text-sm font-medium mb-4">Image Overlay</p>
          <Card
            type="image_overlay"
            src="https://cdn.pixabay.com/photo/2019/07/30/18/26/surface-4373559_1280.jpg"
            alt="오버레이 이미지"
          >
            <div className="p-4 text-white">
              <h3 className="font-bold mb-2">오버레이 카드</h3>
              <p className="text-sm">이미지 위에 콘텐츠가 오버레이됩니다.</p>
            </div>
          </Card>
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.size}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div>
          <p className="text-sm font-medium mb-4">Small</p>
          <Card type="content" size="sm">
            <div className="p-4">
              <h3 className="font-bold mb-2">작은 카드</h3>
              <p className="text-sm text-gray-600">sm 크기의 카드입니다.</p>
            </div>
          </Card>
        </div>
        <div>
          <p className="text-sm font-medium mb-4">Medium (기본)</p>
          <Card type="content" size="md">
            <div className="p-4">
              <h3 className="font-bold mb-2">중간 카드</h3>
              <p className="text-sm text-gray-600">md 크기의 카드입니다.</p>
            </div>
          </Card>
        </div>
        <div>
          <p className="text-sm font-medium mb-4">Large</p>
          <Card type="content" size="lg">
            <div className="p-4">
              <h3 className="font-bold mb-2">큰 카드</h3>
              <p className="text-sm text-gray-600">lg 크기의 카드입니다.</p>
            </div>
          </Card>
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.hover}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div>
          <p className="text-sm font-medium mb-4">Shadow</p>
          <Card type="content" hoverType="shadow">
            <div className="p-4">
              <h3 className="font-bold mb-2">그림자 효과</h3>
              <p className="text-sm text-gray-600">마우스를 올려보세요.</p>
            </div>
          </Card>
        </div>
        <div>
          <p className="text-sm font-medium mb-4">Lift</p>
          <Card type="content" hoverType="lift">
            <div className="p-4">
              <h3 className="font-bold mb-2">상승 효과</h3>
              <p className="text-sm text-gray-600">마우스를 올려보세요.</p>
            </div>
          </Card>
        </div>
        <div>
          <p className="text-sm font-medium mb-4">None</p>
          <Card type="content" hoverType="none">
            <div className="p-4">
              <h3 className="font-bold mb-2">효과 없음</h3>
              <p className="text-sm text-gray-600">호버 효과가 없습니다.</p>
            </div>
          </Card>
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.autoPadding}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <p className="text-sm font-medium mb-4">
            autoPadding=
            {false}
            {' '}
            (기본)
          </p>
          <Card type="content" autoPadding={false}>
            <div className="bg-blue-100 p-4">
              <h3 className="font-bold mb-2">수동 패딩</h3>
              <p className="text-sm text-gray-600">children에 직접 패딩을 적용해야 합니다.</p>
            </div>
          </Card>
        </div>
        <div>
          <p className="text-sm font-medium mb-4">
            autoPadding=
            {true}
          </p>
          <Card type="content" autoPadding>
            <div className="bg-blue-100">
              <h3 className="font-bold mb-2">자동 패딩</h3>
              <p className="text-sm text-gray-600">카드가 자동으로 패딩을 적용합니다.</p>
            </div>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <p className="text-sm font-medium mb-4">
            이미지 카드 - autoPadding=
            {false}
          </p>
          <Card
            type="image-content"
            src="https://cdn.pixabay.com/photo/2019/07/30/18/26/surface-4373559_1280.jpg"
            alt="이미지 카드"
            autoPadding={false}
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
              <h3 className="font-bold mb-2">전체 배경</h3>
              <p className="text-sm">패딩 없이 전체 영역을 사용할 수 있습니다.</p>
            </div>
          </Card>
        </div>
        <div>
          <p className="text-sm font-medium mb-4">
            이미지 카드 - autoPadding=
            {true}
          </p>
          <Card
            type="image-content"
            src="https://cdn.pixabay.com/photo/2019/07/30/18/26/surface-4373559_1280.jpg"
            alt="이미지 카드"
            autoPadding
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <h3 className="font-bold mb-2">자동 여백</h3>
              <p className="text-sm">자동으로 적절한 패딩이 적용됩니다.</p>
            </div>
          </Card>
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.example}>
      <div className="space-y-8 mt-4">
        <div>
          <p className="text-sm font-medium mb-4">제품 카드</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <Card
              type="image-content"
              src="https://cdn.pixabay.com/photo/2018/11/02/05/36/headphones-3789632_1280.jpg"
              alt="제품 2"
              hoverType="lift"
              footer={(
                <div className="p-4 flex justify-between items-center">
                  <span className="font-bold text-lg">₩79,000</span>
                  <Button content="구매" size="sm" variant="solid" onClick={() => {}} />
                </div>
              )}
            >
              <div className="p-4">
                <h3 className="font-bold mb-2">무선 이어폰</h3>
                <p className="text-sm text-gray-600">뛰어난 음질과 노이즈 캔슬링 기능을 제공합니다.</p>
              </div>
            </Card>
            <Card
              type="image-content"
              src="https://cdn.pixabay.com/photo/2021/07/28/12/56/smartwatch-6500150_1280.jpg"
              alt="제품 3"
              hoverType="lift"
              footer={(
                <div className="p-4 flex justify-between items-center">
                  <span className="font-bold text-lg">₩149,000</span>
                  <Button content="구매" size="sm" variant="solid" onClick={() => {}} />
                </div>
              )}
            >
              <div className="p-4">
                <h3 className="font-bold mb-2">스마트 워치</h3>
                <p className="text-sm text-gray-600">건강 관리와 알림 기능을 한 번에 해결합니다.</p>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-4">블로그 포스트</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <Card
              type="header-content"
              header={(
                <div className="p-4 bg-green-50">
                  <span className="text-xs text-green-600 font-semibold">디자인</span>
                  <p className="text-xs text-gray-500 mt-1">2025년 12월 16일</p>
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
                <h3 className="font-bold text-lg mb-2">2025 UI/UX 트렌드</h3>
                <p className="text-sm text-gray-600">올해 주목해야 할 디자인 트렌드를 정리했습니다. 미니멀리즘, 다크모드, 그리고...</p>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-4">팀 멤버 프로필</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { name: '김철수', role: 'CEO', img: 'https://cdn.pixabay.com/photo/2017/06/14/20/03/smiley-2403201_1280.jpg' },
              { name: '이영희', role: 'CTO', img: 'https://cdn.pixabay.com/photo/2016/11/21/13/58/ball-1845546_1280.jpg' },
              { name: '박민수', role: '디자이너', img: 'https://cdn.pixabay.com/photo/2023/11/22/18/13/beach-8406104_1280.jpg' },
              { name: '정수진', role: '개발자', img: 'https://cdn.pixabay.com/photo/2016/07/16/01/35/smilies-1520867_1280.jpg' },
            ].map((member) => (
              <Card
                key={member.name}
                type="image-content"
                src={member.img}
                alt={member.name}
                size="sm"
                hoverType="lift"
              >
                <div className="p-4 text-center">
                  <h4 className="font-bold mb-1">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-4">특집 기사</p>
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
        </div>
      </div>
    </UiBox>

    <UiBox {...examples.combination}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <Card
          type="image-content"
          src="https://cdn.pixabay.com/photo/2019/07/30/18/26/surface-4373559_1280.jpg"
          alt="조합 카드 1"
          size="lg"
          hoverType="lift"
          header={(
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full">NEW</span>
            </div>
          )}
          footer={(
            <div className="p-4 flex gap-2">
              <Button content="좋아요" variant="outline" size="sm" onClick={() => {}} />
              <Button content="공유" variant="solid" size="sm" onClick={() => {}} />
            </div>
          )}
        >
          <div className="p-6">
            <h3 className="text-xl font-bold mb-3">완전한 카드</h3>
            <p className="text-gray-600 mb-4">
              모든 속성을 조합한 카드입니다. 큰 크기, 상승 효과, 헤더와 푸터를 모두 포함합니다.
            </p>
            <div className="flex gap-2 text-sm text-gray-500">
              <span>👁️ 1,234</span>
              <span>❤️ 89</span>
              <span>💬 12</span>
            </div>
          </div>
        </Card>
        <div>
          <Card
            type="content-footer"
            size="md"
            hoverType="shadow"
            autoPadding={false}
            footer={(
              <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 flex justify-center">
                <Button content="시작하기" variant="solid" color="#ffffff" onClick={() => {}} />
              </div>
            )}
          >
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">프리미엄 플랜</h3>
              <p className="text-3xl font-bold mb-4">
                ₩29,000
                <span className="text-base font-normal text-gray-600">/월</span>
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  무제한 프로젝트
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  우선 지원
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  고급 분석
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </UiBox>
  </div>
);

export default UiCard;
