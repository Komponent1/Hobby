# Next migration 12 to 14

해당 게시글은 12에서 14로 next를 migration 하는 과정에서 발생한 이슈와 이를 해결하는 과정을 담았다

### Diff 12 to 14

### Next/Image

[next 공식 문서 - 13버전 next/image의 변경사항](https://nextjs.org/docs/messages/next-image-upgrade-to-13)

Next12 에서 Next13으로 넘어가는 과정에서 Next/Image에 대한 많은 변경점이 발생했다. 일단 가장 크게 보이는 점은 기존 `<span>`으로 감싸지던 `<img>`가 단독으로 사용되는 점이다.

### Turbopack

### AppRouter

1. next/router -> next/navigation

2. onclick -> 'use client'

3. favicon.ico -> public에서 app root에 위치


### Build

```
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

```
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
