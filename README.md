# Blog Project

https://komponent1.github.io/blog/loading

해당 프로젝트는 간단한 블로깅 시스템을 구현하려한다.
Client - Server구조를 따를 예정이며 아키텍쳐 구현의 연습을 겸한다

## 활용

```bash
https://github.com/Komponent1/blog.git
```

### 서버 실행
```bash
cd server
docker-compose -f docker-compose.yml up -d #(개발 환경, https 미적용)
## docker-compose up -d (배포 환경 -> https 적용)
```

### 클라이언트 실행
env file 변경 (client/app/src/env.tsx)
```typescript
export const BASENAME = '블로그 로고에 보여질 내용';
export const EMAIL = '가입 이메일';
export const BLOGNAME = '블로그 이름'
export const BLOGEXPLAIN = '블로그 설명';
export const LOGO = '본인 로고 이미지 파일 패스'
// export const BASEURL = '본인 서버 url'; 배포시 변경해주는것이 좋음. 가끔식 에러 발생함
export const BASEURL = (process.env.NODE_ENV === 'development'||'test') ? '' : '본인 서버 url'; //개발 환경기준
```

```bash
cd client
bash run_dev.sh
```

### 개발 환경 유의점

1. client - server network 연결
- docker-compose와 client의 연결

### 배포시 유의점

1. 클라이언트 배포 후 subtree배포할 것(`bash client_deploy.sh`)
2. https적용에 유의하며 동작시킬것
3. client만 배포 -> seo2im의 서버(`gitblogserver.cf`) 활용 시 **seo2im6492@gmail.com로 요청하여 진행할것**

## 아키텍쳐

![image](https://user-images.githubusercontent.com/73334068/170615072-f0e3294b-16c5-45e8-adda-3c2d637484ff.png)

## 기본적인 기능

1. 개인 인증 및 인증에 따른 API 권한 분류
- Guest(방문자)와 Author(관리자)를 분리하여 작업할 수 있게 한다.
- JWT를 통해 인증하고 기본적인 인증방식은 Auth2.0을 최대한 따르도록 개발한다.
  - AccessToken, RefreshToken의 형태로 개발한다.
  - 각 인증의 상태는 Client에서 구성토록 처리한다.(따라서 refresh토큰을 요청하는 API가 요구된다)
- jwt의 발급은 auth 서버가 관리하고 jwt의 인증은 gateway에서 진행한다.
- 해당 기능을 위해 회원가입(1 - 1)과 로그인(1 - 2)기능을 추가한다.

1 - 1. 회원가입
- 유저의 이메일, password로 회원가입을 수행한다.
- 비밀번호는 sha-256을 통해 일방향 암호화로 DB에 저장한다.

1 - 2. 로그인
- 유저의 이메일, password를 통해 로그인을 시도한다.
- 로그인 성공시 토큰을 발급하여 클라이언트에 저장한다.


2. 글 작성/수정/삭제 기능(Author)
- Author는 글을 작성, 작성된 글은 file로 file서버에 저장할 수 있어야한다.
- Client는 글 내용을 markdown으로 변환해 FTP 서버로 전송한다.
- FTP서버는 파일을 저장하면 DB에 파일 Path를 저장한다
- FTP서버는 DB저장이 완료되면 클라이언트에 완료 메시지를 보낸다

3. 글 호출 기능
- 모든 사용자는 글을 요청, 해당 글을 화면에 띄울 수 있다.
- Client는 특정 글(파일)을 API 서버에 요청한다.
- API서버는 해당 파일의 Path를 이용해 FTP서버에 해당 파일을 클라이언트로 보내도록 요청한다.
- FTP서버는 Client로 해당 파일을 보낸다

