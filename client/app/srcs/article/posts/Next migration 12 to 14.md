# Next migration 12 to 14

현재 프로젝트의 Next버전은 12로 특히 13에서 큰 변화가 있었음을 이미 알고 있는 상황이다. 따라서 해당 프로적트의 Next 버전을 업그레이드 하였고 그 과정에서 알게된 부분, 과정, 이슈, 비교, 과정을 이 글에 담는다.

### Diff 12 to 14

Next 12 -> 13을 거치면서 큰 변화가 있었다.

> 1. App Router 등장
> 2. next/image의 개선
> 3. Link의 개선
> 4. next/font의 등장
> 5. Turbopack 등장

Next 13 -> 14에서는 큰 변화는 없지만 주목할 변화가 몇가지 있었다.

> 1. Turbopack 안정화
> 2. Server Action
> 3. metadata 개선

이중 해당 프로젝트 업그레이드 작업에서 중점적으로 본 포인트는 App Router, Turbopack에 중점을 두었다.

### Next/Image

[next 공식 문서 - 13버전 next/image의 변경사항](https://nextjs.org/docs/messages/next-image-upgrade-to-13)

Next12 에서 Next13으로 넘어가는 과정에서 Next/Image에 대한 개선이 있었다. 일단 가장 크게 보이는 점은 기존 `<span>`으로 감싸지던 `<img>`가 단독으로 사용되는 점이다. 따라서 이전 이미지에 style 코드 적용시 발생하던 귀찮은 문제들이 해결되었다.

Next에선 아래와 같이 개선점을 소개하였다.

> 1. 저 적은 client js 사용(Ships less client-side JavaScript)
> 2. 스타일 및 구성의 간편화(Easier to style and configure)
> 3. alt default 화로 접근성 향상(More accessible requiring alt tags by default)
> 4. 웹 플랫폼에 부합(Aligns with the Web platform)
> 5. hydration 제거로 빠른 지연 로딩(Faster because native lazy loading doesn'trequire hydration)

내부적으로 보면 기존 span으로 기본 크기를 잡는 과정이 삭제되었고(1, 2번에 해당) 지연 로딩에 intersectionObserver를 활용하던 부분이 삭제되었다.(1, 5번에 해당)

이에따라 적용되던 몇몇 옵션이 빠지고 변경되었는데, 기존의 objectFit, layout등의 요소가 사라지고 style code로 적용가능하게 되었다.

```tsx
/** 번경 전 */
<Image layout="fill" src={photo} alt={title} objectFit="contain" />

/** 변경 후 */
<Image fill src={photo} alt={title} className="object-contain" />
```

### Turbopack

Webpack의 번들링이 무거운것은 이전부터 잘 알려져있다. 이에따라 vite나 rollup 같은 대체제가 주도되었고 nextjs또한 turbopack을 적용시켰다.

13버전 이후 Webpack이 아닌 turbopack을 통한 번들링을 next는 제공했다. 정확히는 dev 번들링에만 적용되어 있다. 자사 벤치에 따르면 기본 대비 4배이상 빠르다고는 한다.

![Image](https://github.com/user-attachments/assets/126ce84b-1a2c-452b-a93d-094207615197)

dev run에 대한 빌드 및 페이지 컴파일 처리는 아래와 같이 측정되었다.

|종류|code start|restart|/article|/article/[pid]|/information|/game|/steam|
|---|---|---|---|---|---|---|---|
|**12**|1449ms|713ms|428ms|411ms|198ms|84ms|1448ms|
|**14**|688ms|683ms|190ms|137ms|121ms|92ms|901ms|

전반적으로 turbopack의 성능 향상이 눈에 띈다. 명확히 측정되진 않지만 특히 캐싱된 페이지를 재 로드할때 체감적으로 속도의 향상이 느껴진다.

### AppRouter

App Router는 next13부터 적용된 새로운 라우팅 방식이다. 기존의 `pages/` 디렉토리를 기반으로 화면을 정의하던 방식을 `app`내의 디렉토리 네임으로 라우팅 방식으로 변경하였다. 이 과정에서 가장 중요한 부분이 React의 RSC(React Server Component)를 기본 컴포넌트 구성에 활용하였다는 점이다.

[Next Server Component 공식문서](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

따라서 기존의 component에서의 `getServerSideProps`는 모두 컴포넌트 내 `fetch`로 구현되었고 `'use client'` 선언을 통해 클라이언트 컴포넌트를 활용하게끔 변경되었다.

```tsx
/** Page Router의 컴포넌트 */
const Comp = ({data}) => {
  ...
};
export async function getServerSideProps() {
  const data = await fetch(...);
  return {props: {data}};
}
/** App Router의 컴포넌트 */
const Comp = async () => {
  const data = await fetch(...);
  ...
}
```

반면 onClick 등 interaction이 요구되는 comp는 클라이언트상에서 랜더되어야 하므로 `'use client'` 태깅이 포함되어야한다.

```tsx
'use client';
const Comp = () => {
  return <button onClick={...} />
}
```

테스트 빌드에서는 테스트가 용이하지 않아 프로덕션에서 LightHouse 기반으로 측정한 성능은 아래와 같다.(FCP, LCP)

|종류|/|/article|/article/[pid]|/information|/game|/steam|
|---|---|---|---|---|---|---|
|**page**|1.1s , 1.4s|0.4s, 0.7s|0.6s, 0.6s|0.3s, 0.6s|0.3s, 0.4s|0.3s, 0.5s|
|**app**|1.4s, 3.6s|0.5s, 0.9s|0.6s, 0.6s|0.3s, 0.5s|0.3s, 0.5s|0.4s, 0.6s|

**game(phaser) build**

프로덕션 기준 이미 생성된 페이지를 호출하는 시간엔 차이가 없으나 (1초 미만) 데브 런 기준 페이지 최초 빌드 시 **App Router 7.8초** **Page Router 2.4초**로 큰 차이를 보인다.

즉 최초 페이지 랜더 시 App Router 방식이 훨씬 오래 걸렸다. 다만 빌드된 결과물에 대한 페이지 진입은 큰 차이를 보이지 않았다.

전제적으로 성능의 하락이 심하게 체감된다. 대체로 최초 콜드 컴파일시 시간이 굉장히 오래 걸리는데 아마 기본적으로 RSC를 사용함으로 인해 서버에서 해당 컴포넌트를 구성하는 시간이 오래 걸리는 것으로 보인다. 결론적으로 심각한 성능저하 이슈를 확인, 이를 해결하지 못해 해당 변화는 프로젝트에 적용하지 않았다.

### 추가>Build 비교

**Nextjs 12**
```sh
Route (pages)                              Size     First Load JS
┌ λ /                                      1.34 kB          86 kB
├   /_app                                  0 B            84.7 kB
├ ○ /404                                   1.65 kB        96.9 kB
├ λ /api/steam/owned_steam_games           0 B            84.7 kB
├ λ /api/steam/player_summarries           0 B            84.7 kB
├ λ /article                               2.27 kB        92.7 kB
├ ● /article/[pid]                         1.42 kB        91.9 kB
├   ├ /article/0
├   ├ /article/1
├   ├ /article/2
├   └ [+4 more paths]
├ ○ /error                                 1.54 kB        96.8 kB
├ ○ /game                                  1.64 kB        92.1 kB
├ ○ /game/survival-skull                   1.95 kB        86.6 kB
├ λ /informations                          3.5 kB         93.9 kB
├ ● /informations/[pid] (4217 ms)          1.2 kB         91.6 kB
├   ├ /informations/0 (582 ms)
├   ├ /informations/6 (581 ms)
├   ├ /informations/5 (564 ms)
├   ├ /informations/8 (557 ms)
├   ├ /informations/1 (556 ms)
├   ├ /informations/7 (516 ms)
├   ├ /informations/2 (497 ms)
├   └ [+4 more paths]
├ λ /server-sitemap-index.xml              257 B          84.9 kB
└ λ /steam                                 112 kB          203 kB
+ First Load JS shared by all              94.7 kB
  ├ chunks/framework-5d047318119c742c.js   45.5 kB
  ├ chunks/main-28b08dfa84f0a6ff.js        36.4 kB
  ├ chunks/pages/_app-1233fe9ef1622708.js  775 B
  ├ chunks/webpack-a6c44fe760bbc11d.js     1.95 kB
  └ css/3eb171af44ebae54.css               9.99 kB
```

**Nextjs 14 Page Router**
```sh
Route (pages)                             Size     First Load JS
┌ ƒ /                                     1.32 kB        85.3 kB
├   /_app                                 0 B              84 kB
├ ○ /404                                  1.61 kB        96.2 kB
├ ƒ /api/steam/owned_steam_games          0 B              84 kB
├ ƒ /api/steam/player_summarries          0 B              84 kB
├ ƒ /article                              2.23 kB        92.3 kB
├ ● /article/[pid] (3120 ms)              1.51 kB        91.6 kB
├   ├ /article/5 (647 ms)
├   ├ /article/6 (621 ms)
├   ├ /article/0 (541 ms)
├   ├ /article/7 (494 ms)
├   ├ /article/3 (431 ms)
├   ├ /article/1
├   ├ /article/2
├   └ /article/4
├ ○ /error                                1.5 kB           96 kB
├ ○ /game                                 1.61 kB        91.6 kB
├ ○ /game/survival-skull                  1.79 kB        85.8 kB
├ ƒ /informations                         2.92 kB          93 kB
├ ● /informations/[pid] (1549 ms)         1.18 kB        91.2 kB
├   ├ /informations/0 (498 ms)
├   ├ /informations/4 (446 ms)
├   ├ /informations/5 (440 ms)
├   ├ /informations/1
├   ├ /informations/2
├   ├ /informations/3
├   ├ /informations/6
├   └ [+4 more paths]
├ ƒ /server-sitemap-index.xml             258 B          84.3 kB
└ ƒ /steam                                109 kB          200 kB
+ First Load JS shared by all             93.9 kB
  ├ chunks/framework-0b63440ad823df04.js  44.9 kB
  ├ chunks/main-194effdc47a97321.js       36.7 kB
  └ other shared chunks (total)           12.3 kB
```

**Nextjs 14 App Router**
```sh
Route (app)                              Size     First Load JS
┌ ○ /                                    1.13 kB        88.4 kB
├ ○ /_not-found                          870 B          88.2 kB
├ ƒ /api/steam/owned_steam_games         0 B                0 B
├ ƒ /api/steam/player_summarries         0 B                0 B
├ ○ /article                             2.82 kB         101 kB
├ ƒ /article/[pid]                       198 B          98.8 kB
├ ○ /game                                1.97 kB         101 kB
├ ○ /game/survival-skull                 322 kB          409 kB
├ ○ /information                         3.21 kB         102 kB
├ ○ /sitemap.xml                         0 B                0 B
└ ○ /steam                               109 kB          208 kB
+ First Load JS shared by all            87.3 kB
  ├ chunks/47b51aa9-4878c27714386d46.js  53.6 kB
  ├ chunks/804-3a6c851fbf74722b.js       31.6 kB
  └ other shared chunks (total)          2.1 kB
```

각 빌드에 대하여 눈에 띄는 부분이 보이지 않는다. 따라서 빌드는 판단 근거에서 제한다.

### 결론

12 -> 14로의 migration의 과정에 있어 특별한 이슈는 크게 발생하지 않고 스무스하게 진행되었다. 아래 각 과정에 대한 결론을 작성하였다.

1. webpack -> turbopack으로의 변경은 충분히 유의미한 빌드 시간 감소를 가져왔다.
2. App Router로의 변경은 심각한 성능저하로 적용하지 않았다.
3. 이외 성능 및 빌드 용량, image 개선등의 요소는 체감할 정도의 개선을 측정하지 못하였다.

차후 App Router의 RSC 성능 개선 방법 체크 및 관련하여 추가적인 개선을 이뤄보려한다.
