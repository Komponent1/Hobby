# React head 작성

> <head>의 역할은 브라우저에게 문서의 정보를 전달하는 것입니다. <head>의 안에 작성되는 태그들은 웹 브라우저 화면에 표시될 콘텐츠를 나타내는 것은 아니지만, 웹페이지의 품질에 영향을 주는 중요한 정보들입니다(입문자를 위한 HTML5)
    
HTML에서 `<head>`는 문서 최상단에 위치하여 정보를 제공합니다. 브라우저(크롬, 엣지, 사파리...)나 검색엔진은 이 정보를 해석하여 브라우저 화면에 표시하고 검색 알고리즘에 활용합니다.
    
따라서 `<head>` 는 사용자의 접근성, SEO에 강한 영향력을 행사하는 요소입니다. 주요 요소는 `<title>`과 `<meta>` 입니다.
    
검색 엔진은 head의 title, meta, 본문의 일부 요소(100 ~ 150자)를 활용하여 알고리즘을 표현하곤 했습니다.(현재의 검색엔진 기준 데이터는 각 검색 사이트 기준을 직접 확인하는 편이 좋습니다)
 
## 직접 살펴보기    

### title

브라우저 상단의 표기되는 웹 페이지의 제목을 정의합니다. 사용자는 해당 태그로 콘텐츠를 짐작할 수 있고 검색 엔진은 제목을 통해 데이터를 분석하므로 title의 설정은 상당히 중요합니다.
    
### meta

HTML 문서의 다양한 정보를 포함시키는 태그입니다. 검색엔진은 주로 이 메타 데이터의 정보를 통해 검색 노출에 대한 제어를 합니다.


    
![](https://i.imgur.com/g7TaBf4.png)

**Notion**의 head 태그 일부분 입니다.

meta를 통해 인코딩(charset), 화면 기준(viewport), 페이지 설명(description), 트위터와 구글에서 만든 미리보기 데이터(twitter:, og:)등을 표시하고 title로 페이지 제목을 표시합니다.

`<script>`는 리소스 스크립트 파일을 로드하여 페이지 화면 표기에 사용하는 표준입니다.

## React SPA의 meta 태그
    
헤드는 HTML 일반적으로 최상단에 작성합니다. HTML문서의 경우 상단에 입력하면 되고 React 프레임 워크 사용시엔 빌드 최상단의 `index.html`에 표기할 수 있습니다.(CRA 기준으로 public 디렉토리의 index.html입니다) `index.html`에 표기된 head 데이터는 모든 페이지에 적용됩니다. 


```html
<html lang="ko">
  <head>
    <title>웹 페이지 타이틀</title>
    <meta charset="utf-8" />
  </head>
  <body>
    <!-- page content -->    
  </body>
</html>
```

그렇다면 개별 페이지(routing된 페이지)에 대한 적용은 어떻게 동작할 수 있을까요? meta또한 document 객체에 포함되어 있으므로 document에 직접 적용시킬 수 있습니다. 예를들면 description 메타 태그를 아래처럼 추가할 수 있습니다. 만약 기존의 meta 태그를 변경하고자 한다면 해당 엘리먼트를 탐색 후 변경해야합니다.(meta는 겹치면 안됩니다)

```typescript
const makeDescriptionMeta = (description: string): void => {
  const meta = document.createElement('meta');
  /** const meta = document.getElementsByTagName('meta')[~~~] */
  meta.setAttribute('name', 'description');
  meta.setAttribute('content', description);
  document.getElementsByTagName('head')[0].appendChild(meta);    
}

const Page: React.FC = () => {
  useEffect(() => {
    makeDescriptionMeta();
  }, []);

  ...
} 
```

또는 유명 라이브러리인 `react-helmet`을 활용하여 작성할 수 있습니다. `react-helmet`은 자식에서 선언한 head로 부모 컴포넌트의 head를 덮어씌우므로 좀 더 편하게 사용할 수 있습니다. react자세한 설명은 [공식 npm 문서](https://www.npmjs.com/package/react-helmet)를 참고하시기 바랍니다.

```typescript
import { Helmet } from 'react-helmet'
    
const Parent: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="parent" />
        ...
      </Helmet>
      <Chidren/>
    </>
  );
}
    
const Children: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="child" />
        ...
      </Helmet>
    </>
  )
}

/**
 * result html = (
 *   <head>
 *     <meta name="description" content="child"/>
 *   </head>
 * ) 
 */ 
```

그런데 이 방법은 우리가 원하는 적절한 head의 역할을 포함할 수 있을까요? 이를 위해 먼저 React SPA에 대한 동작을 이해해야합니다.

React SPA는 기본적으로 CSR(client side rendering)으로 동작합니다. 서버로부터 최초의 index.html과 script리소스를 모두 받아 클라이언트단에서 index.html을 그립니다.

즉 서버로부터는 기본적으로 빈 index.html을 받아옵니다(정확히는 빌드된 html이고 이는 index.html에 기인합니다)

대부분의 검색 봇들은 이 빈 index.html을 이용해 검색 노출을 제어하기 때문에 빈 페이지로 체킹이 됩니다. 즉 React내부에서 랜더링된 meta데이터는 대부분의 검색 봇에서 처리될 수 없음을 의미합니다.

그나마 구글 검색은 js 코드를 해석하지만 이 부분도 react-helmet이 적용되는지에 대한 여부는 확실치 않습니다(워낙 관련 이슈가 많아 정확히 파악하지 못하였습니다)

CSR에선 이 부분을 사전 랜더링(pre-rendering)을 통해 해결하곤 합니다.

### pre-rendering 

사전 랜더링은 각 페이지를 미리 랜더링 해 두는 것 입니다. 각 라우트에 맞는 index.html을 미리 생성하는 방법입니다. 미리 생성된 index.html은 js코드를 최소화하고 필요한 경우에만 js를 통해 리랜더링을 진행합니다. 즉 최대한 많은 정보를 index.html에 포함하려 합니다. 따라서 작성된 meta태그는 최초에 변경사항이 없으므로 최초의 index.html에 포함됩니다.

또한 사전 랜더링은 페이지별로 다른 head를 넣을 수 있습니다. 예를 들면 사전 랜더링된 웹 어플리케이션은 아래와 같은 디렉토리 구조를 가집니다. 해당 웹페이지 path(디렉토리 이름)로 접속하면 해당하는 index.html을 보내줍니다.

```
├── index.html
├── page1
│   └── index.html
├── page2
│   └── index.html
└── page3
    └── index.html
```

CSR로 구현된 React에선 react-snap`이나 `react-snapshot`을 사용하여 구현할 수 있습니다.


## NEXT.JS에서 head

SSR은 서버에서 미리 index.html을 랜더링한 후 보내는 방식입니다. 따라서 사전 랜더링보다 더 많은 정보를 포함한 index.html을 제공할 수 있습니다. 예를 들면 미리 서버로부터 데이터를 받아 index.html을 만들 수 있습니다.

NEXT.JS에서 head는 `next/head`에 의해 정의합니다. `next/head`는 `react-helmet`과 마찬가지로 자식 페이지에서 선언한 head로 덮어씌워집니다.

```typescript
import Head from 'next/head';

const App = () => {
  return (
    <>
      <Head>
        <title>페이지 타이틀</title>
        <meta name="description" content="설명" />
      </Head>
      ...
    </>
  )
}
```

### _app.js, _document.js, each page

NEXT.js는 모든 페이지에 _app.js, _doucment.js를 포함하여 index.html을 생성합니다. 따라서 모든 페이지에 포함되는 헤더를 위 두 문서에 포함시킬 수 있습니다.

그렇다면 어디에 어떤 head를 포함시키는 것이 이상적일까요?
    
사전적으로 _document.js의 HEAD는 'next/head'가 아닌 'next/document'임을 알고 있어야 합니다. `next/document`의 HEAD는  `next/head`와 별개이므로 덮어씌워지지 않습니다.

```typesctipt
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```
    
페이지마다 변할 수 있는 `title`, `og:~` 와 같은 요소는 각 페이지에서 설정하거나 _app.js에 전역적으로 선언후 각 페이지에서 변경됩니다.

따라서 완전히 전역적으로 단일로 쓰일 요소만 포함시켜야합니다. 예를 들면 favicon이나 style시트가 있습니다. 다만 next에서 정의한 예외경우가 있을 수 있는데 대표적으로 viewport의 선언이 있습니다. view port 선언은 중복제거(dedupped)문제를 야기할 수 있으므로 document에서의 선언이 금지되어 있습니다.

https://nextjs.org/docs/messages/no-document-viewport-meta

## 마무리

B2C 실무 첫 투입 후 가장 주요한 고민사항은 SEO에 대한 부분이었습니다. 단순히 웹 어플리케이션을 개발하는데에서 멈추지 않고 어플리케이션이 웹 표준에 맞추어 좀 더 검색하기 쉽고, 사용자들에게 쉽게 접근할 수 있도록 하는 가장 기본적인 단계인 head의 설정을 항상 고민할 수 있어야 합니다.

