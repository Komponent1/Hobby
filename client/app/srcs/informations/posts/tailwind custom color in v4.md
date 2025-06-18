# tailwind custom color in v4

### global.css

```css
@import 'tailwindcss';

@theme {
  --color-background: #000000;
}
```

### component.tsx

```javascript
const Comp = () => (
  <div className="bg-background" />
)
```