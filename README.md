# Blog Project

해당 프로젝트는 간단한 블로깅 시스템을 구현하려한다.
Client - Server구조를 따를 예정이며 아키텍쳐 구현의 연습을 겸한다

## 아키텍쳐

[!img](https://www.figma.com/file/aPGnRTzz9HqEbwbaDo0DUQ/Untitled?node-id=1%3A459)

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
- 해당 기능에서 회원탈퇴(1 - 3)을 추가한다.

1 - 2. 로그인
- 유저의 이메일, password를 통해 로그인을 시도한다.
- 로그인 성공시 토큰을 발급하여 클라이언트에 저장한다.

1 - 3. 회원탈퇴
- 유저정보를 DB에서 삭제한다.
- 삭제시 토큰을 파기하는것을 잊지 않도록 한다.

2. 글 작성 기능(Author)
- Author는 글을 작성, 작성된 글은 file로 file서버에 저장할 수 있어야한다.
- Client는 글 내용을 markdown으로 변환해 FTP 서버로 전송한다.
- FTP서버는 파일을 저장하면 DB에 파일 Path를 저장한다
- FTP서버는 DB저장이 완료되면 클라이언트에 완료 메시지를 보낸다

3. 글 호출 기능
- 모든 사용자는 글을 요청, 해당 글을 화면에 띄울 수 있다.
- Client는 특정 글(파일)을 API 서버에 요청한다.
- API서버는 해당 파일의 Path를 이용해 FTP서버에 해당 파일을 클라이언트로 보내도록 요청한다.
- FTP서버는 Client로 해당 파일을 보낸다

## 안중서버의 구현

### Oauth 2.0의 4가지 프로토콜

Oauth 2.0의 인증방식은 4가지로 구분하여 제공하고 있으며 [해당 글](https://blog.naver.com/mds_datasecurity/222182943542)에 설명이 잘 되어 있다.
실제로 해당 서비스의 인증은 외부로 제공하지 않으므로 4번으로 충분하지만 refresh방식을 이용할 생각이므로 3번 방법을 사용한다.

### JWT

Json Web Token은 인증에 사용되는 웹표준으로 client에서 서버를 거치지 않고 기본적인 정보를 얻어 동작을 client상에서 혹은 server상에서 할 수 있는 선택지가 주어진다.
[해당 글](http://www.opennaru.com/opennaru-blog/jwt-json-web-token/)을 참고한다.

### 만료된 토큰

토큰의 만료시에는 HTTP 401롤 반환한다. 해당 만료된 토큰은 재요청될 수 있다.

### 비밀번호의 암호화
[해당 글](https://d2.naver.com/helloworld/318732)을 참고한다.
해당 과정에서 비밀번호를 클라이언트 사이드에서도 암호화해야하는가에 대해 나오는데 [해당 글](https://yoonhogo.github.io/blog/2020-09-08/HTTPS-plain-text-safety/)을 참고하자. 현재 사이트엔 https가 적용되지 않으므로 2중 해싱을 이용하도록 한다.


### 개발 순서

회원가입 -> 로그인 -> 토큰 검사 -> 재인증(refresh token)
