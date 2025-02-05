# Next JS

## information

### local api

nextjs는 ssr인 만큼 내부 api콜을 직접 만들어 사용할 수 있다.

api call은 page 하위에 page/api/**.ts 로 작성하여 요철할 수 있다.

env를 사용하는 호출, DB연결 등 client에서 요청할 수 없는 요소가 포함된 경우 용이하게 사용할 수 있다.(아마 redis랑 붙여 캐싱하는 용도로 쓰면 되게 유용할 듯?)

### Cors

client side에서 외부 호출 시 당연히 cors 발생, 따라서 proxy 서버 설정 요구된다

nextjs 는 rewrite와 redirect를 제공, next.config.js에서 설정, 빌드레벨이므로 재시작 필요

여러 rewrite를 설정해야하면 source를 시작하는 path를 다르게 함으로써 처리

```javascript
module.exports = {
  async rewrites() {
    return [
      {
        source: '/IPlayerService/:path*',
        destination: "https://api.steampowered.com/IPlayerService/:path*",
      },
      {
        source: '/app/:path*',
        destination: 'https://store.steampowered.com/app/:path*',
      }
    ]
  }
}
```

## 기록

### 24.12.11

**tailwind css 적용**

-> global.css 선언 필요

-> tailwind.config.js에 경로 설정에 유의

-> create-next 에서 초기 선언 가능(template 개발에서 확인)

**steam 통신 개발**

-> steamid를 입력받을 예정이므로 client side call로 변경

-> 당연히 cors 발생

-> proxy우회를 위해 rewrite 설정

-> base_url이 2개(steam api, home page crawling) 이므로 rewrite 이중 설정

-> steam api는 key를 요청하므로 client side에서 호출 불가(보안)

-> next에서 제공하는 로컬 api로 steam api 활용


