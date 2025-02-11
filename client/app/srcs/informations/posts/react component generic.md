# react component generic

```typescript
type Props<T> = {
  data: T
}
const Comp = <T extneds any>({data}: Props<T>) => { ... }
```
