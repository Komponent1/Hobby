export const examples = {
  basic: {
    title: '기본 사용법',
    description: '기본적인 캐러셀 형태입니다.',
    codeContent: `
const sampleImages = [
  { id: 'slide-1', url: 'https://cdn.pixabay.com/photo/2019/07/30/18/26/surface-4373559_1280.jpg' },
  { id: 'slide-2', url: 'https://cdn.pixabay.com/photo/2018/03/20/12/15/structure-3243092_1280.jpg' },
  { id: 'slide-3', url: 'https://cdn.pixabay.com/photo/2017/08/15/13/29/gussing-2643912_1280.jpg' },
  { id: 'slide-4', url: 'https://cdn.pixabay.com/photo/2017/07/01/21/33/forest-2462797_1280.jpg' },
];

<Carousel>
  {sampleImages.map((image, index) => (
    <div key={image.id} className="min-w-full h-[300px] relative">
      <Image src={image.url} alt={\`Slide \${index + 1}\`} fill className="object-cover rounded" />
    </div>
  ))}
</Carousel>
`,
  },
  variant: {
    title: '변형',
    description: 'variant 속성으로 캐러셀의 스타일을 변경할 수 있습니다.',
    codeContent: `
<Carousel variant="arrows">...</Carousel>
<Carousel variant="indicators">...</Carousel>
`,
  },
  showButtons: {
    title: '버튼 표시',
    description: 'showButtons 속성으로 이전/다음 버튼을 제어할 수 있습니다.',
    codeContent: `
<Carousel showButtons={false}>...</Carousel>
<Carousel showButtons>...</Carousel>
`,
  },
  autoPlay: {
    title: '자동 재생',
    description: 'autoPlay와 autoPlayInterval 속성으로 자동 재생을 설정할 수 있습니다.',
    codeContent: `
<Carousel autoPlay autoPlayInterval={3000}>...</Carousel>
`,
  },
  example: {
    title: '사용 예제',
    description: '실제 사용 시나리오 예제입니다.',
    codeContent: `
// 제품 갤러리
<Carousel variant="arrows" showButtons>
  {/* ...제품 카드 ... */}
</Carousel>

// 프로모션 배너
<Carousel variant="indicators" autoPlay autoPlayInterval={4000}>
  {/* ...배너 카드 ... */}
</Carousel>

// 고객 후기
<Carousel variant="arrows">
  {/* ...후기 카드 ... */}
</Carousel>
`,
  },
};
