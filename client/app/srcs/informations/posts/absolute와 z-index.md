# absolute와 z-index

`z-index`가 position된 element와 활용되려면 position을 같이 선언해줘야한다.

```html
<!--in tailwind css-->
<div>
  <div class="absolute"></div>
  <div class="relative z-10"> <!--relative선언 없으면 z-index 동작 안함-->
</div>
```

