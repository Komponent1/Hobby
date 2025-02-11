# Mobx

### react contextAPI with mobx

1. Root Store 선언
  - 해당 store는 각 store를 멤버로 소유하는 클래스

2. Context 생성

3. ContextHook 호출 훅 선언

```javascript
class RootStore { ... }

const rootStore = new RootStore();
export const StoreContext = createContext(rootStores)
export const useStores = () => useContext(StoreContext)
```

4. Provider로 DOM wrapping
```javascript
<StoreContext.Provider value={rootStore}>
  {...}
</StoreContext.Provider>
```

5. 필요 mobx store 클래스 선언 및 rootStore에 등록

   

