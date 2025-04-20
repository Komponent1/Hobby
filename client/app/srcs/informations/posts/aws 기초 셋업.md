# aws 기초 셋업

### 필요 스펙

ROUTE 53(도메인 별도 구매), Application Load Balancer(alb), VPC,  EC2, Certification Manager

### 구조
```
                ----------------------- VPC ----------------------
            |        - public subnet -       - private subnet -    |
Client - ROUTE53 - |        ALB        | - |     EC2 -- RDS     |  |
            |        -----------------       ------------------    |
              ----------------------------------------------------
```

### 셋업 순서

1. VPC 생성
2. private, public subnet 설정(별도 가용존에 2개씩 생성)
3. IGW 생성 및 라우팅 테이블 생성
4. EC2 및 RDS 생성
5. 도메인 구매 및 ROUTE 53 등록
6. ALB 생성 및 연결

### 기타

1. SSM 및 NAT GATEWAY 설정

### 이후 추가 셋업

1. Redis 생성 및 연결
2. 고가용성 설정
3. AutoScailing 처리
