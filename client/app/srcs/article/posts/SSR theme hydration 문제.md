# SSR theme hydration 문제

## 문제 분석

### 발생 원인

`@seolim/designsystem` 패키지의 `ThemeProvider`와 `Navbar` 컴포넌트에서 hydration mismatch가 발생합니다.

**근본 원인:**

1. **ThemeProvider**: SSR 시 항상 `light` 모드로 렌더링됨 (`getInitialMode()`가 서버에서는 `window`를 사용할 수 없어 기본값 반환)
2. **themeInitScript**: 클라이언트에서 실행되어 `data-theme="dark"` 설정
3. **Navbar**: `useTheme()`의 theme 값을 기반으로 인라인 스타일을 생성하는데, 서버와 클라이언트에서 다른 theme 값 사용
4. **결과**: 서버에서 생성된 light 테마 스타일 ≠ 클라이언트 hydration 시 dark 테마 스타일

### 에러 메시지

```
Warning: Prop `style` did not match.
Server: "...background-color:#FFFFFF;color:#111827..."
Client: "...background-color:#020617;color:#F9FAFB..."
```

## 임시 해결책 (적용 완료)

다음 파일에서 Navbar를 클라이언트 마운트 후에만 렌더링하도록 수정:

### 1. `/home/seolim/Hobby/client/app/srcs/seolim-ui/layout/seolim-ui.layout.tsx`

```tsx
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

return (
  <ThemeProvider>
    {isMounted && (
      <Navbar
        type="fixed"
        icon={<span>🚀</span>}
        title="SEOLIM UI"
        titleLink="/seolim-ui"
      />
    )}
    {/* ... */}
  </ThemeProvider>
);
```

### 2. `/home/seolim/Hobby/client/app/srcs/common/common.components/common.components.navbar.tsx`

```tsx
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

if (!isMounted) {
  return null;
}

return (
  <SeolimNavbar
    icon={<Image src="/logo.png" ... />}
    title="SEOLIM"
    titleLink="/"
    links={pageList}
  />
);
```

**장점:**

- 즉시 적용 가능
- hydration 에러 완전 해결

**단점:**

- 초기 렌더링 시 Navbar가 짧게 깜빡임 (FOUC - Flash of Unstyled Content)
- SSR 이점 일부 상실

## 근본적 해결 방안 (designsystem 패키지 수정 필요)

`@seolim/designsystem` 패키지를 다음과 같이 수정해야 합니다:

### 1. Navbar 컴포넌트: 인라인 스타일 대신 CSS 변수 사용

**현재 구조 (문제):**

```javascript
const navStyle = useMemo(() => {
  return {
    backgroundColor: backgroundColor || theme.color.background.default,
    color: textColor || theme.color.text.primary,
    // ... 인라인 스타일
  };
}, [type, backgroundColor, textColor, theme]);
```

**개선 방안:**

```javascript
const navStyle = useMemo(() => {
  return {
    backgroundColor: backgroundColor || "var(--theme-bg)",
    color: textColor || "var(--theme-text)",
    borderBottom: `1px solid var(--theme-border)`,
    // CSS 변수 사용
  };
}, [type, backgroundColor, textColor]);
```

### 2. ThemeProvider: CSS 변수 동기화

`themeInitScript`에서 설정한 CSS 변수를 ThemeProvider가 초기화 시 인식하도록 수정:

```javascript
const getInitialMode = () => {
  if (typeof window === "undefined") {
    // SSR에서는 CSS 변수 기본값 반환
    return "light";
  }

  // 클라이언트에서는 data-theme attribute 우선 확인
  const htmlTheme = document.documentElement.getAttribute("data-theme");
  if (htmlTheme === "dark" || htmlTheme === "light") {
    return htmlTheme;
  }

  // localStorage 확인
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;

  // 시스템 설정 확인
  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)"
  ).matches;
  return prefersDark ? "dark" : "light";
};
```

### 3. 모든 컴포넌트에 적용

`useTheme()`을 사용하는 모든 컴포넌트에서 직접적인 theme 값 사용 대신 CSS 변수를 참조하도록 수정:

- `backgroundColor`: `theme.color.background.default` → `var(--theme-bg, fallback)`
- `color`: `theme.color.text.primary` → `var(--theme-text, fallback)`
- `borderColor`: `theme.color.border.default` → `var(--theme-border, fallback)`

### 4. themeInitScript 개선

CSS 변수를 더 포괄적으로 설정:

```javascript
const themeInitScript = `
(function() {
  var mode = 'light';
  
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    mode = 'dark';
  }
  
  document.documentElement.setAttribute('data-theme', mode);
  
  var isDark = mode === 'dark';
  
  // 주요 색상 변수 설정
  document.documentElement.style.setProperty('--theme-bg', isDark ? '#020617' : '#FFFFFF');
  document.documentElement.style.setProperty('--theme-text', isDark ? '#F9FAFB' : '#111827');
  document.documentElement.style.setProperty('--theme-border', isDark ? '#1F2937' : '#E5E7EB');
  // ... 기타 필요한 색상 변수
  
  document.documentElement.style.backgroundColor = isDark ? '#020617' : '#FFFFFF';
  document.documentElement.style.color = isDark ? '#F9FAFB' : '#111827';
  document.documentElement.style.colorScheme = mode;
})();
`;
```

## 권장 사항

1. **단기:** 현재 적용한 임시 해결책 사용 (클라이언트 마운트 후 렌더링)
2. **중기:** designsystem 패키지의 Navbar와 주요 컴포넌트를 CSS 변수 기반으로 리팩토링
3. **장기:** 모든 컴포넌트를 CSS 변수 기반 스타일링으로 전환하여 SSR 환경에서 hydration 문제 완전 해결

## 추가 고려사항

- **suppressHydrationWarning**: 근본 원인을 해결하지 않으므로 권장하지 않음
- **Dynamic Import**: `next/dynamic`을 사용한 CSR 전용 렌더링도 가능하나, SEO에 불리
- **CSS-in-JS 대신 CSS Modules**: 정적 스타일은 CSS Modules로 분리하여 hydration 이슈 최소화

## 참고 문서

- [Next.js Hydration Errors](https://nextjs.org/docs/messages/react-hydration-error)
- [CSS Variables for Dynamic Theming](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [React Hydration](https://react.dev/reference/react-dom/client/hydrateRoot)
