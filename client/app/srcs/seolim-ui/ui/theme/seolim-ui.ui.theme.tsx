import React from 'react';
import {Description, HeadBox, Title} from '../../component';
import CodeBox from '../../component/seolim-ui.component.codeBox';

const UiTheme: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Theme" />
      <Description text="디자인의 테마를 결정할 수 있습니다." />
    </HeadBox>

    <Title text="기본 사용법" />
    <Description text="애플리리케이션을 THemeProvider로 감쌉니다.useTheme 훅을 사용하여 theme를 사용할 수 있습니다." />
    <div className="overflow-hidden rounded-2xl mt-8 mb-20">
      <CodeBox>
        {`import { ThemeProvider, useTheme } from '@seolim/designsystem';
const App = () => (
  <ThemeProvider>
    <YourComponent />
  </ThemeProvider>
);

const YourComponent = () => {
  const { theme, mode } = useTheme();
  return (
    <div>
      현재 모드: {mode}
      메인색상: {theme.color.primary.main}
    </div>
  );
}`}
      </CodeBox>
    </div>

    <Title text="테마 커스터마이징" />
    <Description text="ThemeProvider에 createTheme을 통해 속성을 전달하여 테마를 커스터마이징할 수 있습니다." />

    <div className="overflow-hidden rounded-2xl mt-8 mb-20">
      <CodeBox>
        {`import { ThemeProvider, useTheme } from '@seolim/designsystem';

type CustomTheme = {
  spacing: {
    small: string;
    medium: string;
    large: string;
  },
  color: {
    primary: {
      main: string;
      light: string;
      dark: string;
    },
  },
};
const customTheme = {
  spacing: {
    small: '4px',
    medium: '8px',
    large: '16px',
  },
};
const App = () => 
(
  <ThemeProvider<CustomTheme> theme={customTheme}>
    <YourComponent />
  </ThemeProvider>
);
`}
      </CodeBox>
    </div>

    <Description text="createTheme은 기존 테마를 변경하거나 추가할 수 있습니다. 되도록이면 기본 구조를 유지하는 것이 좋습니다." />
    <Description text="예를 들어 theme.color.primary 객체가 별도의 타입(ex> string)이 된다면 컴포넌트들에서 오류가 발생할 수 있습니다." />
    <Description text="각 타입은 Theme 타입을 참고해주세요." />
    <Description text="아래 예시는 theme.color.primary의 main 속성을 변경, other 속성을 추가하고 customColor를 추가하는 예시입니다." />
    <div className="overflow-hidden rounded-2xl mt-8 mb-20">
      <CodeBox>
        {`import { createTheme, ColorType } from '@seolim/designsystem';

type CustomTheme = {
    color: ColorType & {
        other: string;
    },
    customColor: {
        specialColor: string;
    }
};
const customTheme = createTheme<CustomTheme>({
    color: {
        primary: {
            // 기존 타입인 main 속성 변경
            main: '#ff0000',
            // 추가 색상인 blue 선언
            ohter: '#ff6666',
        },
    },
    // 추가 타입인 customColor 선언 useTHeme의 theme에서 theme.customColor.specialColor로 접근 가능
    customColor: {
        specialColor: '#00ff00',
    },
});

// 아래와 같은 선언은 사용하지 않는다.
type CustomTheme = {
    color: {
        primary: string
    },
};

// 해당 선언은 기본적인 theme 구조를 변경하여 오류를 발생시킬 수 있다.
`}
      </CodeBox>
    </div>
  </div>
);

export default UiTheme;
