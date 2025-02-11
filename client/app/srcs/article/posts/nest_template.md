# 학습 내용 정리

## 서버 기본 템플릿 구축 환경 관련정리

### 필요 기본 구성

DB + APP(service) + [REDIS + localstack]

### APP - DB 구축

1. APP 구동용 dockerfile + resource

2. db image

3. orm mapping

**특이사항**

docker 간 연결을 구동할 때 host는 container_name을 기록한다

```typescript
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'mysql-db',
    port: 3306,
    username: 'root',
    password: 'my-secret-pw',
    database: 'nest',
    entities: [],
    synchronize: true,
  }),
```

**lint 설정 관련**

객체 내 한줄 처리 에러 시 (prettier/prettier 과정에서 에러) 아래 속성 eslint rule에 추가

```javascript
  'prettier/prettier': ['error', {
    "singleAttributePerLine": true,
    "printWidth": 120,
  }, { usePrettierrc: true }],
```

**node cli process**

`readline` 을 통해 command line argument 받을 수 있다

```javascript
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('some question\n', answer => {
  rl.close();
})

```

**node 내 path 관련**

`process.cwd()` 현재 디렉토리
`__dirname` 작성된 파일의 위치

CLI에서 module내 파일을 읽어야할 때 유리
