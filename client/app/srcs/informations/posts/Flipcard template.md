# Flipcard template

```jsx
<div className="group h-96 w-96 [perspective:1000px]">
      <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front Face */}
        <div className="absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden]">
          <p className="md:my-6 text-2xl">FRONT</p>
        </div>
        {/* Back Face */}
        <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="md:my-6 text-2xl">BACK</p>
        </div>
      </div>
    </div>
```