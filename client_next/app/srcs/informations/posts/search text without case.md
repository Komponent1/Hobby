# search text without case

```typescript
const texts = ['one', 'two', 'three'];
const check = [
  'OnE', //true
  'Four Five', //false
  'Twoo four', //true
  'three' //true
];
const regex = new RegExp(texts.join("|"), 'i');
check.map((article) => regex.test(article.title));
```