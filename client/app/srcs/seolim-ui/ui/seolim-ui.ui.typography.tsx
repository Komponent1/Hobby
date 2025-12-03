import React from 'react';
import { Typography } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../component';

const UiTypography: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Typography" />
      <Description text="디자인 시스템에서 사용할 수 있는 다양한 타이포그래피 스타일입니다." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="속성" />
      <PropsTable
        datas={[
          { name: 'size', type: 'xs | sm | md | lg | xl | 2xl | 3xl | 4xl | 5xl | 6xl | 7xl | 8xl | 9xl', description: '타이포그래피의 크기입니다.' },
          { name: 'weight', type: 'light | regular | bold | extraBold', description: '타이포그래피의 두께입니다.' },
          { name: 'color', type: 'string', description: '타이포그래피의 색상입니다.' },
          { name: 'type', type: 'p | span', description: '타이포그래피의 HTML 요소 타입입니다.' },
        ]}
      />
    </div>

    <UiBox>
      <Title text="크기" />
      <Description text="타이포그래피 크기는 xs부터 9xl까지 다양합니다." />
      <div className="space-y-2 mt-4">
        <Typography size="xs" weight="regular">이것은 XS 크기 타이포그래피입니다.</Typography>
        <Typography size="sm" weight="regular">이것은 SM 크기 타이포그래피입니다.</Typography>
        <Typography size="md" weight="regular">이것은 MD 크기 타이포그래피입니다.</Typography>
        <Typography size="lg" weight="regular">이것은 LG 크기 타이포그래피입니다.</Typography>
        <Typography size="xl" weight="regular">이것은 XL 크기 타이포그래피입니다.</Typography>
        <Typography size="2xl" weight="regular">이것은 2XL 크기 타이포그래피입니다.</Typography>
        <Typography size="3xl" weight="regular">이것은 3XL 크기 타이포그래피입니다.</Typography>
        <Typography size="4xl" weight="regular">이것은 4XL 크기 타이포그래피입니다.</Typography>
        <Typography size="5xl" weight="regular">이것은 5XL 크기 타이포그래피입니다.</Typography>
        <Typography size="6xl" weight="regular">이것은 6XL 크기 타이포그래피입니다.</Typography>
        <Typography size="7xl" weight="regular">이것은 7XL 크기 타이포그래피입니다.</Typography>
        <Typography size="8xl" weight="regular">이것은 8XL 크기 타이포그래피입니다.</Typography>
        <Typography size="9xl" weight="regular">이것은 9XL 크기 타이포그래피입니다.</Typography>
      </div>
    </UiBox>

    <UiBox>
      <Title text="두께" />
      <Description text="타이포그래피 두께에는 라이트, 일반, 볼드, 엑스트라볼드가 있습니다." />
      <div className="space-y-3 mt-4">
        <Typography size="md" weight="light">이것은 라이트 두께 타이포그래피입니다.</Typography>
        <Typography size="md" weight="regular">이것은 일반 두께 타이포그래피입니다.</Typography>
        <Typography size="md" weight="bold">이것은 볼드 두께 타이포그래피입니다.</Typography>
        <Typography size="md" weight="extraBold">이것은 엑스트라볼드 두께 타이포그래피입니다.</Typography>
      </div>
    </UiBox>
  </div>
);

export default UiTypography;
