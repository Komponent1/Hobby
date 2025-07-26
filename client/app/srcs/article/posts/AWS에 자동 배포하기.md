# AWS에 자동 배포하기

현재 개인 서버는 테스트용으로 private subnet EC2에 올라가있다. 대략적인 구조는 아래와 같다. 원래 NAT Gateway을 통해 외부 통신을 하고 SSM을 통해 직접 관리했지만 비용/관리 용이를 위해 자동화된 배포시스템을 구축할 것이다.

해당 과정에서 Codedeploy, github actions, s3를 활용할 것이다.

### 구축 방법론

> 원안은 NAT Gateway와 같은 외부 통신 없이 구축하는것이 목표였다. 다만 마지막 작업에서 codedeploy agent자체가 외부 연결을 필요로 하여 해당 방식은 결국 사용할 수 없었다.
VPC endpoint를 사용하면 가능할 것으로 보이나 어자피 vpc endpoint도 과금영역이기에 차후 NAT Instance를 구성해 끄고 키는 방향으로 처리 예정이다.


현재 서비스 구조는 아래 도식과 같다. 현 WAS는 외부와 통신을 할 수 없다.(INbound 불가) 따라서 배포 후 빌드 과정에서 package를 다운로드 할 수 없다.

![img]()

따라서 spring을 배포할 때 와 같이 빌드 파일을 한번에 묶어서 S3에 올리고 Codedeploy를 통해 EC2로 옮겨 실행시킬 것이다.

S3로 올리는 과정은 github actions를 활용할 것이다.

### S3로 배포하기까지

github actions는 특정 branch에 올라간 소스코드를 ci/cd를 위해 컴퓨팅할 수 있는 서비스이다.

github actions는 `.github/workflows/` 에 설정된 `yml`(설정 파일)을 통해 실행된다.

과정은 환경 세팅 -> 빌드 -> 빌드 파일 압축 -> s3로 배포 이다. 아래 스크립트를 참조하자.

```yml
name: Deploy to EC2 via CodeDeploy

on:
  push:
    branches:
      - deploy-server

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    # 코드 내려받기
    - name: Checkout code
      uses: actions/checkout@v3

    # Node 환경 설치
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'

    # 의존성 설치
    - name: Install dependencies
      run: npm install
      working-directory: ./app

    # 빌드
    - name: Build project
      run: npm run build
      working-directory: ./app
    
    # 빌드 파일 압축
    - name: Zip deployment package
      run: |
        mkdir deploy
        cp -r app/ scripts/ appspec.yml deploy/
        cd deploy && zip -r ../deploy.zip .

    # aws 인증
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: ap-northeast-2

    # S3 배포
    - name: Upload s3
      run: |
        aws s3 cp deploy.zip s3://<-- 내 s3 버킷 이름 -->
```

### S3, IAM, AWS_ACCESS_KEY

S3에 배포를 위해선 github actions에서 aws클라이언트에 인증이 되어야 한다.

aws는 github actions에서 사용할 수 있는 많은 action을 오픈하고 있다. [해당 git](https://github.com/aws-actions)을 참고하자.

위 스크립트에서 사용한 `aws-actions/configure-aws-credentials`는 aws 인증을 하는 action이다. 이를 위해선 aws에서 발급받은 키가 요구된다.

해당 키를 발급 받기 위해서는 해당 ROLE을 가진 유저를 생성해야한다.

IAM은 AWS에서 제공하는 권한 관리 시스템으로 특정 역할을 가진 계정을 생성할 수 있다.

해당 프로젝트에서 사용할 것은 S3에 대한 권한, 그리고 차후 사용할 codedeploy에 대한 권한이다. 해당 두 권한(S3fullAccess, CodedeployFullAccess)을 가진 ROLE로 계정을 생성한다.

생성된 계정에서 키를 받아 해당 키를 git의 setting -> actions -> repository secret에 등록한다.

이후 설정한 브랜치로 소스를 올리면 s3로 압축파일이 배포된다.

### EC2 설정과 Codedeploy까지

Ec2에 codedeply agent를 설치해야한다. 임시로 Nat gateway를 열어 두고 aws codedeploy agent를 설치한다. [공식문서](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/codedeploy-agent-operations-install-cli.html)

codedeploy 어플리케이션을 생성한다.

먼저 해당 IAM ROLE(역할)을 생성한다. 서비스 또는 사용사례에서 codedeploy를 고르면 된다. 

codedeploy 어플리케이션은 ec2/온프레미스로 설정하고 배포 그룹의 서비스 역할에 아까 작성한 IAM ROLE을 등록한다. 에이전트 설치는 **한번만**으로 설정한다. 로드밸런싱은 일단 끄자.

이제 전에 작성한 deploy.yml에 agent를 이용하여 배포하자.

```yml
    - name: Deploy to EC2
      run: |
        aws deploy create-deployment \
          --application-name <--code deploy application 이름--> \
          --deployment-group-name <--code deploy group--> \
          --deployment-config-name CodeDeployDefault.OneAtATime \
          --s3-location bucket=<--s3 버킷 이름-->>,key=<--올릴 파일-->,bundleType=zip

```

마지막으로 배포 후 실행될 스크립트와 설정파일을 생성하자. appspec.yml은 설정파일이고 여기 설정된 bash script를 실행한다.

```yml
#appspec.yml
version: 0.0
os: linux
files:
  - source: /
    destination: /home/<--사용하는 ec2 user 이름(ex> ubuntu)-->/server
    overwrite: yes

hooks:
  AfterInstall:
    - location: scripts/start.sh #러닝 스크립트, 압축할 때 같이 압축한다.
      timeout: 60
      runas: <--사용하는 ec2 user 이름-->

```

### 그외

NAT Gateway를 사용하지 않으려하니 설치패키지를 함께 압축해서 보내는 과정이 포함되어있다. 여기에서 꽤 흥미로운 문제가 있었는데 pnpm으로 설치한 파일은 symbolic link를 활용하기 때문에 환경 변경시 해당 링크가 깨진다는 문제가 있었다.

따라서 pnpm을 다시 npm으로 변경하는 과정이 있었다.

아쉽게도 외부 인터넷 없이 과금없는 배포는 불가능해졌지만 과정에서 적절한 시스템을 구축하는데에는 성공하였다.