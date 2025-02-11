# next static page

nextjs에서 페이지 생성을 빌드 타임에 미리 생성할 수 있다(static html 생성)

### 정적 페이지 생성 선언

`getStaticProps` 를 통해 데이터를 받아오는 page는 빌드타임때 정적으로 생성된다.

1. 빌드 타임에 구성하므로 요청시 빠른 전달
2. 빌드 타임에 구성하므로 파일 시스템등을 통한 구성에 유리(fs 등)


### 동적으로 생성되는 페이지의 정적 생성 선언

`getStaticPaths` 를 통해 정적으로 생성될 패스를 미리 선언해야한다.

아래와 같이 리턴값을 주면 선언된 1, 2에 대한 정적 페이지를 미리 생성한다.

```javascript
const getStaticPaths = () => {
    return {
        paths: [
            { params: { id: 1 }},
            { params: { id: 2 }},
        ],
        fallback: false,
    }
}
```

그렇다면 선언되지 않은 패스에 대한 처리가 어떻게 될까? fallback 옵션은 이를 설정하는 옵션에 해당한다.

`false`: 선언되지 않은 페이지는 404 처리
`true`: fallback이 생성되고 `getStaticProps`를 통해 랜더링이 진행된다. 이는 생성되어 정적페이지로써 추가된다. 아래와 같이 fallback여부를 체킹한다.

```javascript
const Page: React.FC = () => {
    const router = useRouter // next/router    
    
    if (router.isFallback) return <div />;
    ...
};

```
`blockiong`: ssr의 형태로 요청 시 마다 생성된다.(캐싱되므로 빠르게 제공되긴 한다.)