# 객체의 key 타입으로 객체의 key를 선언하기

```typescript
const obj: {[key in keyof other_obj]: value} = {
  ...
}
```
