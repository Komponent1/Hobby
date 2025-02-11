# tailwindcss upgrade

next root 디렉토리에서 실행, 해당 작업 시 별도 migration 조치도 필요함

확인 문제
1. tailwind.config.js를 global.css에서 여전히 참조 -> 삭제
2. 설치 패키지 오류 있음(오류에 확인되는 패키지 설치 필요, os관련 패키지 체크에 오류 있는 듯)

```bash
npx @tailwindcss/upgrade@next
```