export const examples = {
  size: {
    title: '사이즈',
    description: 'Typography는 xs부터 9xl까지 다양한 크기를 지원합니다.',
    codeContent: `import { Typography } from '@seolim/designsystem';

function Example() {
  const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {sizes.map((size) => (
        <Typography key={size} size={size}>
          {size} - 이것은 {size} 크기의 텍스트입니다.
        </Typography>
      ))}
    </div>
  );
}`,
  },
  weight: {
    title: '굵기',
    description: 'weight prop으로 텍스트 굵기를 설정할 수 있습니다.',
    codeContent: `import { Typography } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Typography weight="light" size="lg">
        Light - 가볍고 섬세한 텍스트입니다.
      </Typography>
      <Typography weight="regular" size="lg">
        Regular - 일반적인 텍스트입니다.
      </Typography>
      <Typography weight="bold" size="lg">
        Bold - 굵은 텍스트입니다.
      </Typography>
      <Typography weight="extraBold" size="lg">
        Extra Bold - 매우 굵은 텍스트입니다.
      </Typography>
    </div>
  );
}`,
  },
  type: {
    title: '타입',
    description: 'type prop으로 텍스트의 스타일 타입을 설정할 수 있습니다.',
    codeContent: `import { Typography } from '@seolim/designsystem';

function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Typography type="primary" size="md" element="p">
        이것은 primary 타입 타이포그래피입니다.
      </Typography>
      <Typography type="secondary" size="md" element="p">
        이것은 secondary 타입 타이포그래피입니다.
      </Typography>
      <Typography type="tertiary" size="md" element="p">
        이것은 tertiary 타입 타이포그래피입니다.
      </Typography>
      <Typography type="disabled" size="md" element="p">
        이것은 disabled 타입 타이포그래피입니다.
      </Typography>
      <Typography type="inverse" size="md" element="p">
        이것은 inverse 타입 타이포그래피입니다.
      </Typography>
    </div>
  );
}`,
  },
};
