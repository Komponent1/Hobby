# aws 인프라 복사하기

### 필요 스펙

aws-cli, terraform

### AWS 계정 연결

terraform은 aws계정 설정을 따라간다. 아래 명령어로 상태 확인 / 로그인 필요시 aws configure 설정을 한다.

```bash
# 로그인 상태 확인
aws sts get-caller-identity

# aws 계정 추가
aws configure
# 필요시에 IAM에서 adminstorAccess권한 사용자 생성 후 키 발급
```

### providers.tf 생성 및 terraform 초기화

서울 리전에서 작업함을 명시

```hcl
// providers.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-northeast-2"
}
```

```bash
terraform init
```

### 작업의 기본 흐름

1. 필요 정의파일 생성
2. terraform import
3. terraform plan(정의 파일과 실제 내용 비교 - diff)
4. diff내용 정의파일에서 수정
5. terraform plan으로 최종 체크

### VPC 설정

1. 정의 파일 생성

```hcl
// vpc.tf
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}
```

2. VPC 설정 import

```bash
terraform import aws_vpc.main {your vpc id}
```

3. diff 확인 및 수정

```bash
terraform plan
```

출력 결과에 따라 vpc.tf 파일 수정

주의> id나 tag_all 내용은 추가 필요없음

4. 작성내용 확인

다시 diff 비교해서 아래와 같이 뜨면 이상없음

```bash
No changes. Infrastructure is up-to-date.
```

### subnet 설정

기본적으로 위 과정과 동일, 다만 서브넷 별로 해당 작업을 모두 수행해줘야함

```hcl
# subnet.tf
resource "aws_subnet" "public_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "ap-northeast-2a"
}
```

```bash
terraform import aws_subnet.public_a {your subnet id}
```

```bash
terraform plan
```

### IGW, RouteTable

```hcl
// igw.tf
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "seolim-internet-gateway"
  }
}
```

```bash
terraform import aws_internet_gateway.main {your igw id}
```

```hcl
// route.tf
resource "aws_route_table" "main" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "seolim-route-public-igw"
  }
}

{이후 추가 route table}
```

```
terraform import aws_route_table.{name} {your table id}
```

route table의 main route table은 별도 설정이 없음에 유의한다.

route table에 연결된 subnet에 대한 정의(association)은 별도로 정의해주어야 한다. import 구문의 차이가 있으므로 유의

```hcl
resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public.id
}
```

```bash
terraform import aws_route_table_association.{name} {subnet-id}/{route-table-id}
```

### ALB

ALB는 설정하였던 대상그룹(target group), 리스너(listener)도 함께 설정해준다. 아래는 tg가 http / listener로 https를 설정한 경우의 파일이다.

```hcl
resource "aws_lb" "main" {
  name               = "seolim-alb"
  internal           = false
  load_balancer_type = "application"
  subnets            = [
    aws_subnet.public_a.id,
    aws_subnet.public_c.id
  ]
}

resource "aws_lb_target_group" "main" {
  name     = "ec2-alb"
  port     = {your port}
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id

  health_check {
    path                = "/ping"
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 5
    unhealthy_threshold = 2
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.main.arn
  port              = {your ssl port}
  protocol          = "HTTPS"

  certificate_arn = {your ssl arn}

  default_action {
    type = "forward"
    forward {
      target_group {
        arn = aws_lb_target_group.main.arn
        weight = 1
      }
    }
    target_group_arn = aws_lb_target_group.main.arn
  }
}
```

```bash
terraform import aws_lb.{name} {alb-arn}

terraform import aws_lb_target_group.{name} {tg-arn}

terraform import aws_lb_listener.{name} {listener-arn}
```

### 이후 작업

이후 EC2, RDS, SG는 계정단위의 내용이기에 복사(import)가 아닌 직접적인 작성이 요구된다.
