/* eslint-disable react/no-array-index-key */
import React from 'react';
import Image from 'next/image';
import { Carousel } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../../component';
import { examples } from './seolim-ui.ui.carousel.example';

const UiCarousel: React.FC = () => {
  const sampleImages = [
    { id: 'slide-1', url: 'https://cdn.pixabay.com/photo/2019/07/30/18/26/surface-4373559_1280.jpg' },
    { id: 'slide-2', url: 'https://cdn.pixabay.com/photo/2018/03/20/12/15/structure-3243092_1280.jpg' },
    { id: 'slide-3', url: 'https://cdn.pixabay.com/photo/2017/08/15/13/29/gussing-2643912_1280.jpg' },
    { id: 'slide-4', url: 'https://cdn.pixabay.com/photo/2017/07/01/21/33/forest-2462797_1280.jpg' },
  ];

  return (
    <div className="space-y-6">
      <HeadBox>
        <Title text="Carousel" />
        <Description text="여러 콘텐츠를 슬라이드 형태로 표시하는 캐러셀 컴포넌트입니다." />
      </HeadBox>

      <div className="space-y-4">
        <Title text="속성" />
        <PropsTable
          datas={[
            {
              name: 'children', type: 'React.ReactNode[]', default: '-', description: '캐러셀에 표시될 콘텐츠 배열입니다.',
            },
            {
              name: 'currentIndex', type: 'number', default: '0', description: '현재 표시 중인 슬라이드의 인덱스입니다.',
            },
            {
              name: 'onIndexChange', type: '(index: number) => void', default: '-', description: '인덱스 변경 시 호출되는 콜백 함수입니다.',
            },
            {
              name: 'showButtons', type: 'boolean', default: 'true', description: '이전/다음 버튼을 표시할지 여부입니다.',
            },
            {
              name: 'autoPlay', type: 'boolean', default: 'false', description: '자동 재생을 활성화할지 여부입니다.',
            },
            {
              name: 'autoPlayInterval', type: 'number', default: '3000', description: '자동 재생 간격(밀리초)입니다.',
            },
            {
              name: 'variant', type: 'arrows | indicators', default: 'arrows', description: '캐러셀의 스타일 변형입니다.',
            },
          ]}
        />
      </div>

      <UiBox {...examples.basic}>
        <Carousel>
          {sampleImages.map((image, index) => (
            <div key={image.id} className="min-w-full h-[300px] relative">
              <Image src={image.url} alt={`Slide ${index + 1}`} fill className="object-cover rounded" />
            </div>
          ))}
        </Carousel>
      </UiBox>

      <UiBox {...examples.variant}>
        <div className="space-y-8 mt-4">
          <div>
            <Carousel variant="arrows">
              {sampleImages.map((image, index) => (
                <div key={image.id} className="min-w-full h-[300px] relative">
                  <Image src={image.url} alt={`Slide ${index + 1}`} fill className="object-cover rounded" />
                </div>
              ))}
            </Carousel>
          </div>
          <div>
            <Carousel variant="indicators">
              {sampleImages.map((image, index) => (
                <div key={image.id} className="min-w-full h-[300px] relative">
                  <Image src={image.url} alt={`Slide ${index + 1}`} fill className="object-cover rounded" />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </UiBox>

      <UiBox {...examples.showButtons}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div>
            <Carousel showButtons={false}>
              {sampleImages.slice(0, 3).map((image, index) => (
                <div key={image.id} className="min-w-full h-[250px] relative">
                  <Image src={image.url} alt={`Slide ${index + 1}`} fill className="object-cover rounded" />
                </div>
              ))}
            </Carousel>
          </div>
          <div>
            <Carousel showButtons>
              {sampleImages.slice(0, 3).map((image, index) => (
                <div key={image.id} className="min-w-full h-[250px] relative">
                  <Image src={image.url} alt={`Slide ${index + 1}`} fill className="object-cover rounded" />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </UiBox>

      <UiBox {...examples.autoPlay}>
        <div className="p-8 mt-4">
          <Carousel autoPlay autoPlayInterval={3000}>
            {sampleImages.map((image, index) => (
              <div key={image.id} className="min-w-full h-[300px] relative">
                <Image src={image.url} alt={`Slide ${index + 1}`} fill className="object-cover rounded" />
              </div>
            ))}
          </Carousel>
        </div>
      </UiBox>

      <UiBox {...examples.example}>
        <div className="space-y-8 mt-4">
          <div>
            <p className="text-sm font-medium mb-4">제품 갤러리</p>
            <Carousel variant="arrows" showButtons>
              {[
                { color: '#3b82f6', name: '블루 제품' },
                { color: '#22c55e', name: '그린 제품' },
                { color: '#ef4444', name: '레드 제품' },
              ].map((product, index) => (
                <div key={`${index}_${product.name}`} className="min-w-full h-[300px] flex items-center justify-center" style={{ backgroundColor: product.color }}>
                  <div className="text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                    <p className="text-lg">₩99,000</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          <div>
            <p className="text-sm font-medium mb-4">프로모션 배너</p>
            <Carousel variant="indicators" autoPlay autoPlayInterval={4000}>
              {[
                { title: '여름 세일', subtitle: '최대 50% 할인', bg: 'bg-blue-500' },
                { title: '신상품 출시', subtitle: '지금 바로 확인하세요', bg: 'bg-green-500' },
                { title: '무료 배송', subtitle: '5만원 이상 구매 시', bg: 'bg-purple-500' },
              ].map((banner, index) => (
                <div key={index} className={`min-w-full h-[250px] ${banner.bg} flex items-center justify-center`}>
                  <div className="text-white text-center">
                    <h2 className="text-3xl font-bold mb-2">{banner.title}</h2>
                    <p className="text-xl">{banner.subtitle}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          <div>
            <p className="text-sm font-medium mb-4">고객 후기</p>
            <Carousel variant="arrows">
              {[
                { name: '김철수', review: '정말 좋은 제품이에요! 강력 추천합니다.', rating: 5 },
                { name: '이영희', review: '가격 대비 품질이 훌륭합니다.', rating: 5 },
                { name: '박민수', review: '배송도 빠르고 포장도 깔끔했어요.', rating: 4 },
              ].map((testimonial, index) => (
                <div key={index} className="min-w-full h-[250px] bg-gray-100 rounded-lg flex items-center justify-center p-8">
                  <div className="text-center">
                    <p className="text-lg mb-4">
                      &ldquo;
                      {testimonial.review}
                      &ldquo;
                    </p>
                    <p className="font-bold mb-2">{testimonial.name}</p>
                    <p className="text-yellow-500">{'⭐'.repeat(testimonial.rating)}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </UiBox>
    </div>
  );
};

export default UiCarousel;
